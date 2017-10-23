
// -------------------------------------------
// Class - PersonList
//		Add 'Person' class and 'Event' class to add all the related methods to them.
//		* Should have created each person object instance.
//			- Seperate by instance storage and presentation of each
//		But for now, we keep the event info in each html row

function DataSetValues( TabularDEObj )
{
	var me = this;

	me.TabularDEObj = TabularDEObj;

	me.dataSetFormTag =  $( '#dataSetForm' );
	
	
	me.catOptionCombo_default = "HllvX50cXC0";
	me.attr_dataSetLinkId = "LAN7Ddg3u7w";
	
	
	me.PARAM_DATASET_ID = "@PARAM_DATASET_ID";
	me.PARAM_PERIOD = "@PARAM_PERIOD";
	me.PARAM_ORGUNIT_ID = "@PARAM_ORGUNIT_ID";
	
	me._query_dataSet = _queryURL_api + "dataSets/" + me.PARAM_DATASET_ID + ".json?fields=displayName,dataSetElements[dataElement[id,displayFormName,valueType,categoryCombo[id,categoryOptionCombos[id,displayName]]]]";
	me._query_dataValues = _queryURL_api + "dataValueSets.json?period=" + me.PARAM_PERIOD + "&orgUnit=" + me.PARAM_ORGUNIT_ID + "&dataSet=" + me.PARAM_DATASET_ID;
	me._queryUrl_dataValueSave = _queryURL_api + 'dataValues';

	// Initial Setup Call
	me.initialSetup = function()
	{
		
	};

	me.resetDataSetForm = function()
	{
		me.dataSetFormTag.html("");
	};
	
	me.generateAndPopulateDataSetForm = function()
	{
		me.dataSetFormTag.hide();
		me.resetDataSetForm();
		
		var orgUnitId = me.TabularDEObj.getOrgUnitId();
		var periodId = me.checkAndGenerateMonthyPeriod();
		if( periodId != "" )
		{
			me.loadDataSetOfStage( function( dataSetId, jsonDataSet ){
				me.getHiddenDataElementsInSettings( function( hiddenDEList ){
					
					// STEP 0. Generate data set header
					var headerTag = $("<thead></thead>");
					var headerRowTag = $("<tr></tr>");
					headerRowTag.append("<th colspan='2'>" + jsonDataSet.displayName + "</th>");
					headerTag.append( headerRowTag );
					
					me.dataSetFormTag.append( headerTag );
					
					// STEP 1. Generate header if any. Headers are categoryCombos
					me.generateTablesByCategoryCombos( jsonDataSet.dataSetElements, hiddenDEList );
					
					
					// STEP 2. Generate data element cells
					for( var i in jsonDataSet.dataSetElements )
					{
						var de = jsonDataSet.dataSetElements[i].dataElement;
						if( hiddenDEList.indexOf( de.id ) < 0 )
						{
							var tbody = me.dataSetFormTag.find("[categoryComboId='" + de.categoryCombo.id + "']");
							var optionCombos = de.categoryCombo.categoryOptionCombos;
							
							var rowTag = $("<tr></tr>");
							rowTag.append("<td>" + de.displayFormName + "</td>");
							
							var cols = tbody.find("th");
							for( var j=0; j<cols.length; j++ )
							{
								var optionComboId = $( cols[j] ).attr("optComboId");
								rowTag.append("<td deId='" + de.id + "-" + optionCombos[j].id + "-val'></td>");
							}
							
							tbody.append( rowTag );
						}
					}
					
					
					// STEP 3. Generate data element INPUT fields
					for( var i in jsonDataSet.dataSetElements )
					{
						var de = jsonDataSet.dataSetElements[i].dataElement;
						var optionCombos = de.categoryCombo.categoryOptionCombos;
						
						for( var j in optionCombos )
						{
							var key = de.id + "-" + optionCombos[j].id + "-val";
							var inputTag = $("<input valType='" + de.valueType + "' type='text' deId='" + key + "' >");
							/* if( de.valueType == "DATE" )
							{
								Util.setupDatePicker( inputTag, function(){
								//	me.saveDataValue( orgUnitId, periodId, inputTag );
								} );
							} */
							
							me.dataSetFormTag.find("td[deId='" + key + "']").append(inputTag);
						}
						
					}
					
					
					// STEP 4. Populate data values
					me.loadDataValues( periodId, orgUnitId, dataSetId, function( dataValueSet ){
						var dataValues = dataValueSet.dataValues;
						if( dataValues !== undefined )
						{
							for( var i in dataValueSet.dataValues )
							{
								var dataValue = dataValues[i];
								var value = dataValue.value;
								var key = dataValue.dataElement + "-" + dataValue.categoryOptionCombo + "-val";
								
								var inputTag = me.dataSetFormTag.find("input[deId='" + key + "']");
								if( inputTag.attr("valType") == "DATE" )
								{
									value = Util.formatDateBack( value );
								}
								
								inputTag.val( value );
							}
						}
						
						me.dataSetFormTag.show();
					});
					
					// STEP 5. Add event for data element fields
					me.setup_Events_DataElementFields( orgUnitId, periodId );	
				});
				
			});
		}
	};
	
	me.generateTablesByCategoryCombos = function( dataSetElements, hiddenDEList )
	{
		var tbody = $("<tbody style='display:block;border-top:8px solid #fff;'></tbody>");
		var headerTag = $("<tr></tr>");
		var categoryComboId = false;
		for( var i in dataSetElements )
		{
			if( hiddenDEList.indexOf( dataSetElements[i].dataElement.id ) < 0 )
			{
				categoryCombo = dataSetElements[i].dataElement.categoryCombo;
				categoryComboId = categoryCombo.id;
				if( me.dataSetFormTag.find("[categoryComboId='" + categoryCombo.id + "']").length == 0 )
				{
					headerTag = $("<tr></tr>");
					tbody = $("<tbody  style='display:block;border-top:8px solid #fff;' categoryComboId='" + categoryCombo.id + "'></tbody>");
					tbody.append( headerTag );
					me.dataSetFormTag.append( tbody );
				
					var optionCombos = categoryCombo.categoryOptionCombos;
					headerTag.append("<td style='width:150px;'></td>");
					for( var j in optionCombos )
					{
						if( headerTag.find("th[optComboId='" + optionCombos[j].id + "']").length == 0 )
						{
							if( optionCombos[j].id == me.catOptionCombo_default )
							{
								headerTag.append("<th optComboId='" + optionCombos[j].id + "' style='padding:10px;'></th>");
							}
							else
							{
								headerTag.append("<th optComboId='" + optionCombos[j].id + "'>" + optionCombos[j].displayName + "</th>");
							}
							
						}
						
					}
				}
			}
		}
		
	};
	
	me.getHiddenDataElementsInSettings = function( returnFunc )
	{
		var deList = [];
		_settingForm.getSettingData( function( settingData ){
			if( settingData.aggOrgUnitGroups != undefined )
			{
				for( var i in settingData.aggOrgUnitGroups )
				{
					var ouGroupSetting = settingData.aggOrgUnitGroups[i];
					var hasOrgUnitGroup = me.TabularDEObj.searchPanel.hasOrgUnitGroup( ouGroupSetting.ouGroupId );
					if( hasOrgUnitGroup )
					{
						deList = deList.concat( ouGroupSetting.deList );
					}
					
				}
			}
			
			returnFunc( deList );
		});
	};

	
	me.loadDataValues = function( periodId, orgUnitId, dataSetId, exeFunc )
	{
		var url = me._query_dataValues;
		url = url.replace( me.PARAM_PERIOD, periodId );
		url = url.replace( me.PARAM_ORGUNIT_ID, orgUnitId );
		url = url.replace( me.PARAM_DATASET_ID, dataSetId );
			
		RESTUtil.getAsynchData( url, function ( jsonData )
		{
			exeFunc( jsonData );
		});
	};
	
	me.loadDataSetOfStage = function( exeFunc )
	{
		var programId = me.TabularDEObj.getSelectedProgramId();
		var programStageList = me.TabularDEObj.getProgramStageList( programId );
		
		// Only load data set for program with only one stage
		if( programStageList.length == 1 )
		{
			var dataSetId = me.getDataSetId( programStageList[0]);
			if( dataSetId !== undefined )
			{
				var url = me._query_dataSet;
				url = url.replace( me.PARAM_DATASET_ID, dataSetId );
			
				RESTUtil.getAsynchData( url, function ( jsonData )
				{
					exeFunc( dataSetId, jsonData );
				});
			}
			
		}
	};
	
	me.getDataSetId = function( stage )
	{
		var datasetId;
		for( var i in stage.attributeValues )
		{
			var attributeValue = stage.attributeValues[i]
			if( attributeValue.attribute.id == me.attr_dataSetLinkId )
			{
				return attributeValue.value;
			}
		}
		
		return datasetId;
	};
	
	me.checkAndGenerateMonthyPeriod = function()
	{
		var startDate = me.TabularDEObj.getDefaultStartDate();
		var endDate = me.TabularDEObj.getDefaultEndDate();
		var startDateStr = $.format.date( startDate, "yyyyMMdd" );
		var endDateStr = $.format.date( endDate, "yyyyMMdd" );
		
		var month = startDate.getMonth();
		var year = startDate.getFullYear();
		var compareStartDate = new Date( year, month, 1 );
		var compareEndDate = new Date( year, month + 1, 0 );
		var compareStartDateStr = $.format.date( compareStartDate, "yyyyMMdd" );
		var compareEndDateStr = $.format.date( compareEndDate, "yyyyMMdd" );
		
		month++;
		if( startDateStr == compareStartDateStr && endDateStr == compareEndDateStr )
		{
			month = ( month < 10 ) ? "0" + month : "" + month;
			return year + month;
		}
		
		return "";
	};
	
	me.setup_Events_DataElementFields = function( ouId, peId )
	{
		me.dataSetFormTag.find("input,select").each( function(){
			var inputTag = $(this);
			if( inputTag.attr("valType") !== "DATE" )
			{
				inputTag.change( function(){
					me.saveDataValue( ouId, peId, inputTag );
				});
			}
			else
			{
				Util.setupDatePicker( inputTag, function(){
					me.saveDataValue( ouId, peId, inputTag );
				} );
			}
		});
	};
	
	me.saveDataValue = function( ouId, peId, inputTag )
	{
		var keys = inputTag.attr("deId").split("-");
		var deId = keys[0];
		var optComboId = keys[1];
		var valueType = inputTag.attr("valType");
		
		if( valueType !== undefined && valueType == "DATE" )
		{
			value = Util.getDateStr_FromYYYYMMDD( inputTag.val() );
		}
		else
		{
			value = inputTag.val();
		}
		
		var data =  "de=" + deId + "&co=" + optComboId + "&ou=" + ouId + "&pe=" + peId + "&value=" + value;
		
		RESTUtil.submitAggData_Text( me._queryUrl_dataValueSave, data, function(){
			Util.paintLightGreen( inputTag );
		}, function( msg ){
			Util.paintWarning( inputTag );
			alert( msg.responseJSON.message );
		} );
		
	};
	
	// --------------------------
	// Run methods

	me.initialSetup();
}
