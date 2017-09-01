//			- Data In Memory holding class
function DataInMemory()
{
	var me = this;

	me.orgUnitNameList = new Array();

	me.programStageDataElements = new Array();
	me.dataElementList = new Array();
	me.dataElementOptionSets = new Array();

	me.programList_Full = new Array();
	me.programStageList_Full = new Array();
	me.programListWithStage_Full;


	// --------------------------
	// Run methods


	// ---------------------------------------
	// --- Each data retrieval method

	
	me.retrieveOptionSets = function( optionSetId, runFunc )
	{
		me.retrieveFromMemory( me.dataElementOptionSets, 'id', optionSetId, _queryURL_OptionSets + optionSetId + '.json?fields=id,name,options[id,displayName,name]', function( dataObj )
		{
			runFunc( dataObj );
		});
	}


	me.retrieveDataElement = function( dataElementId, runFunc )
	{
		me.retrieveFromMemory( me.dataElementList, 'id', dataElementId, _queryURL_DataElementDetail + dataElementId + '.json', function( dataObj )
		{
			runFunc( dataObj );
		});
	}


	me.retrieveProgramStageData = function( programStageId, runFunc )
	{
		me.retrieveFromMemory( me.programStageDataElements, 'id', programStageId, _queryURL_ProgramStages + '/' + programStageId + '.json?fields=id,name,displayName,description,repeatable,captureCoordinates,program[id,name],programStageDataElements[compulsory,sortOrder,allowFutureDate,dataElement[id,name,formName]]', function( dataObj )
		{
			if ( runFunc !== undefined )
			{
				runFunc( dataObj );
			}
		});
	}


	me.retrieveProgramStageData_WithDataElementsAndOptionSets = function( programStageId, runFunc )
	{
		me.retrieveFromMemory( me.programStageDataElements, 'id', programStageId, _queryURL_ProgramStages + '/' + programStageId + '.json?fields=id,name,displayName,description,repeatable,captureCoordinates,program[id,name],programStageDataElements[compulsory,sortOrder,allowFutureDate,dataElement[id,name,formName,valueType,optionSetValue,optionSet[id,name,displayName,options[id,name,code]]]]', function( dataObj )
			//dataElement[id,name,formName,type,textType
		{
			// Get dataElements and optionSets data and put into memory.
			me.processDataElementsAndOptionSets( dataObj );

			if ( runFunc !== undefined )
			{
				runFunc( dataObj );
			}
		});
	}

	me.processDataElementsAndOptionSets = function( json_programStage )
	{
		var progStageDEs = json_programStage.programStageDataElements;

		if ( Util.checkValue( progStageDEs ) )
		{
			$.each( progStageDEs, function( i_psde, item_psde )
			{
				var dataElementData = item_psde.dataElement;

				me.insertDirectToMemory( me.dataElementList, 'id', dataElementData.id, dataElementData );

				var optionSetData = dataElementData.optionSet;

				if ( optionSetData !== undefined )
				{
					me.insertDirectToMemory( me.dataElementOptionSets, 'id', optionSetData.id, optionSetData );
				}
			});
		}
	}


	me.retrieveOrgUnitName = function( orgUnitId, runFunc )
	{
		me.retrieveFromMemory( me.orgUnitNameList, 'id', orgUnitId, _queryURL_OrgUnit + '/' + orgUnitId + '.json?fields=id,name', function( dataObj )
		{
			runFunc( dataObj );
		});
	}


	me.retrieveProgramStageList = function( runFunc )
	{
		me.retrieveFromMemory( me.programStageList_Full, 'id', 'programStageFull', _queryURL_ProgramStages + '.json?paging=false&fields=id,name,displayName,description,repeatable,captureCoordinates,program[id,name],programStageDataElements[compulsory,sortOrder,allowFutureDate,dataElement[id,name,formName]],attributeValues[attribute[id],value]'
			, function( json_programStageList )
			{
				if ( runFunc !== undefined )
				{
					runFunc( json_programStageList );
				}
			}
		);
	}


	me.retrieveProgramListWithStage_Full = function( runFunc )
	{
		if ( me.programListWithStage_Full !== undefined )
		{
			runFunc( me.programListWithStage_Full );
		}
		else
		{
			me.retrieveFromMemory( me.programList_Full, 'id', 'programFull', _queryURL_ProgramList + '?paging=false&fields=id,name,programType,onlyEnrollOnce,trackedEntity[id,name]'
				, function( json_programList )
				{	
					me.retrieveProgramStageList( function( json_programStageList )
						{
							me.programListWithStage_Full = me.setProgramWithStage( json_programList.programs, json_programStageList.programStages );

							runFunc( me.programListWithStage_Full );
						}
					);

				}
			);
		}
	}
	
	// --- Each data retrieval method
	// ---------------------------------------

	// Retrieve from API or from memory if already retrieved.
	// This use queueing in case the data is already being in process of retrieving, but not yet finished.  We could use event call for each..
	me.retrieveFromMemory = function( dataList, idName, idValue, requestUrl, runFunc )
	{

		var json_Data = Util.getFromList( dataList, idValue, idName );

		if ( json_Data === undefined )
		{
			// For the first time requesting, create a queue and run Async..

			var dataNew = {};
			
			dataNew[ idName ] = idValue;
			dataNew.data = null;
			dataNew.requestQueue = new Array();
			dataNew.requestQueue.push( runFunc );

			dataList.push( dataNew );


			// Retrieve it
			RESTUtil.getAsynchData( requestUrl, function( dataObj ) 
			{
				// Once it gets data, run all the return functions..
				json_Data = Util.getFromList( dataList, idValue, idName );

				if ( Util.checkDefined( json_Data ) )
				{

					// TODO: run custom function if exists?


					json_Data.data = dataObj;

					$.each( json_Data.requestQueue, function( i_func, item_func )
					{
						item_func( dataObj );
					});

					// reset the queue.
					json_Data.requestQueue = new Array();
				}
				else
				{
					Util.write( 'RESTUtil.getAsynchData FOR MEMORY get undefined value back! - idName:' + idName + ', idValue:' + idValue + ', dataList:' + JSON.stringify( dataList ) );
				}

			});
		}
		else
		{
			if ( Util.checkDefined( json_Data.data ) )
			{
				runFunc( json_Data.data );

				// ?? run any queue function if still here?
			}
			else
			{
				// Add return fucntions to the queue.
				json_Data.requestQueue.push( runFunc );
			}
		}
	}


	me.insertDirectToMemory = function( dataList, idName, idValue, data )
	{
		var dataNew = {};
		
		dataNew[ idName ] = idValue;
		dataNew.data = data;
		dataNew.requestQueue = new Array();

		dataList.push( dataNew );
	}

	// -------------------
	// -- Helper methods

	me.setProgramWithStage = function( programs, programStages )
	{
		for( j = 0; j < programStages.length; j++ )
		{
			var item_stage = programStages[j];

			if ( item_stage.program !== undefined )
			{

				for( i = 0; i < programs.length; i++ )
				{
					if ( programs[i].id == item_stage.program.id )
					{
						var programMatch = programs[i];

						if ( programMatch.programStages === undefined )
						{
							programMatch.programStages = [];
						}

						programMatch.programStages.push( item_stage );

						break;
					}
				}
			}
		}

		return programs;
	}

	// -- Helper methods
	// -------------------

	// Run methods
	// --------------------------


	// --------------------------
	// Get methods

	me.getProgramList_Full = function()
	{
		return me.programListWithStage_Full; // pme.programList_Full[0].data;
	}

	me.getProgramStageList_Full = function()
	{
		return me.programStageList_Full[0].data;
	}

	// Get methods
	// --------------------------
}

