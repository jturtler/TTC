
// -------------------------------------------
// Class - ProgramManager
//			- Populates programs, so that it always holds the list.
//			- which can be used by program over and over again without retrieveing again.
//			- Retrieve/save/get program Rules

function ProgramManager( TabularDEObj, defaultProgramTag )
{
	var me = this;
	me.TabularDEObj = TabularDEObj;
		
	me.programList;  // [ { id:"", name:"", programStageList:[ { id:"", name:"" } ] } ]  <-- also add rules and ruleVariables

	me.selectedProgram;
	me.selectedProgramId;

	me.defaultProgramTag = defaultProgramTag;

	// ----------------------------------
	// Functions

	/*
	me.getSelectedProgramId = function()
	{
		return me.defaultProgramId;
	}
	*/

	me.getDefaultProgramFromListed = function( programId )
	{
		var program;

		if ( Util.checkValue( programId ) && Util.checkValue( me.programList ) )
		{
			for( i = 0; i < me.programList.length; i++ )
			{
				if ( me.programList[i].id == programId )
				{
					program = me.programList[i];
					break;
				}
			}
		}

		return program;
	}

	me.resetSelectedProgram = function()
	{
		delete me.selectedProgramId;
		delete me.selectedProgram;
	}


	// Main program select (after orgUnit selection)
	me.setSelectedProgram = function( programId )
	{
		if ( programId == '' )
		{
			me.resetSelectedProgram();
		}
		else
		{
			me.selectedProgramId = programId;

			me.selectedProgram = me.getDefaultProgramFromListed( programId );

			// program Rules and Variables 
			me.TabularDEObj.programRule.RetrieveAndSet_ProgramRulesAndVariables( me.selectedProgram );
		}
	};


	me.getSelectedProgramType = function()
	{
		var programType;

		if ( me.selectedProgram !== undefined )
		{
			programType = me.selectedProgram.programType;
		}

		return programType;
	}

	me.isCase_MEwR = function()
	{
		var programType = me.getSelectedProgramType();

		if ( Util.checkDefined( programType ) )
		{
			if ( programType == "WITH_REGISTRATION" )
			{
				return true;
			}
		}

		return false;
	}

	me.isCase_SEwoR = function()
	{
		var programType = me.getSelectedProgramType();

		if ( Util.checkDefined( programType ) )
		{
			if ( programType == "WITHOUT_REGISTRATION" )
			{
				return true;
			}
		}

		return false;
	}


	me.populatePrograms = function( selectTag )
	{
		//Util.populateSelect( selectTag, "Program", me.programList );
		////selectTag.val( me.defaultProgramId );
		
		selectTag.empty();

		selectTag.append( '<option value="">Select Program</option>' );

		if ( me.programList !== undefined )
		{
			$.each( me.programList, function( i, item ) {
				selectTag.append("<option value='" + item.id + "' peType='" + item.expiryPeriodType + "' expiryDays='" + item.expiryDays + "' completeEventsExpiryDays='" + item.completeEventsExpiryDays + "'>" + item.name + "</option>");
			});
		}
	}

	me.populateProgramStages = function( selectTag, programId )
	{
		Util.populateSelect( selectTag, "ProgramStage", me.getProgramStageList( programId ) );
		//selectTag.val( me.defaultProgramId );
	}
	
	me.getProgramStageList = function( programId )
	{
		var programStages;

		var programList = me.TabularDEObj.dataInMemory.getProgramList_Full();

		// if these is no list for thie programId, generate one and add to the list.
		for( i = 0; i < programList.length; i++ )
		{
			if( programList[i].id == programId )
			{
				programStages = programList[i].programStages;
				break;
			}
		}

		return programStages;
	}

	me.getProgramStageList_FromSource = function( programId, programList )
	{
		var programStages;

		// if these is no list for thie programId, generate one and add to the list.
		for( i = 0; i < programList.length; i++ )
		{
			if( programList[i].id == programId )
			{
				programStages = programList[i].programStages;
				break;
			}
		}

		return programStages;
	}


	me.getProgramList_Full = function()
	{
		// This should be done only after fully loaded or use call back method..
		return me.TabularDEObj.dataInMemory.getProgramList_Full();
	}

	me.getProgramStageList_Full = function()
	{
		return me.TabularDEObj.dataInMemory.getProgramStageList_Full();
	}

	me.getProgramStageData_ById = function( programStageId )
	{
		var programStage;

		var programStages = me.TabularDEObj.dataInMemory.getProgramStageList_Full();

		if ( Util.checkDefined( programStages ) )
		{
			$.each( programStages.programStages, function( i_ps, item_ps )
			{
				if ( item_ps.id == programStageId )
				{
					programStage = item_ps;
					return false;
				}
			});
		}

		return programStage;				
	}


	// -------------------------------------------
	// -- Retrieve Methods -----------------

	me.retrieveProgram_ProgramList = function( orgUnitId, populateFunc )
	{
		//var queryUrl = _queryURL_ProgramList + '?paging=false&fields=id,name,programType&';

		var queryUrl = _queryURL_OrgUnit + "/" + orgUnitId + ".json?fields=id,programs[id,name,programType,expiryPeriodType,expiryDays,completeEventsExpiryDays]";


		RESTUtil.getAsynchData( queryUrl, function ( json_ProgramList )
		{
			QuickLoading.dialogShowAdd( 'programLoading' );

			var programList_Temp = [];

			if ( Util.checkDataExists( json_ProgramList.programs )  )
			{							
				me.TabularDEObj.dataInMemory.retrieveProgramListWithStage_Full( 
					function( json_programListWithStage_Full ) 
					{
						//console.log( 'got Stage and sets' );

						$.each( json_ProgramList.programs, function( i_program, item_program ) 
						{
							programList_Temp.push( { "id": item_program.id, "name":  item_program.name
								, "programType": item_program.programType
								, "expiryPeriodType" : item_program.expiryPeriodType 
								, "expiryDays" : item_program.expiryDays
								, "programStages":  me.getProgramStageList_FromSource( item_program.id, json_programListWithStage_Full ) } );

							//console.log( 'adding programStage to program' );

						});

						QuickLoading.dialogShowRemove( 'programLoading' );

						populateFunc( Util.sortByKey( programList_Temp, "name" ) );
					} 
				);							
			}
			else
			{
				QuickLoading.dialogShowRemove( 'programLoading' );

				populateFunc( programList_Temp );
			}
		}
		, function() {}
		, function() { QuickLoading.dialogShowAdd( 'programLoading' ); }
		, function() { QuickLoading.dialogShowRemove( 'programLoading' ); }	
		);
	}


	// -- Retrieve Methods -----------------
	// -------------------------------------------


	me.loadProgramList = function( orgUnitId, exeFunc )
	{				

		// Reset the programId
		me.resetSelectedProgram();

		// Retrieve the orgUnit filtered program list and programStage list
		me.retrieveProgram_ProgramList( orgUnitId, function( returnData )
		{
			me.programList = returnData;
				
			me.populatePrograms( me.defaultProgramTag );

			Util.paintAttention( me.defaultProgramTag );
			
			if( exeFunc != undefined ) exeFunc();
		});				
	}


	// --------------------------
	// Run methods

	me.initialSetup = function( )
	{	
		me.TabularDEObj.dataInMemory.retrieveProgramListWithStage_Full( function() {} );
	}

	// Initial Setup Call
	me.initialSetup( );
}

