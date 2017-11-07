
function MatrixOrgunitPeriod( _orgUnitSelectionTreePopup, _TabularDEObj )
{
	var me = this;
	
	me.PARAMS_ORGUNITID = "@PARAMS_ORGUNITID";
	me.PARAMS_PROGRAMID = "@PARAMS_PROGRAMID";
	me.PARAMS_PERIOD_TYPE_CODE = "@PARAMS_PERIOD_TYPE_CODE";
	
	me._queryURL_matrixOrgUnitAndPeriod = _queryURL_api + "sqlViews/OGFjqZDohJF/data.json?var=periodType:" + me.PARAMS_PERIOD_TYPE_CODE + "&var=programId:" + me.PARAMS_PROGRAMID + "&var=ouParentId:" + me.PARAMS_ORGUNITID;
	me._queryURL_orgUnitChildren = _queryURL_api + "organisationUnits/" + me.PARAMS_ORGUNITID + ".json?fields=children[id,name,programs[id,name]]";
	
	me.orgUnitSelectionTreePopup = _orgUnitSelectionTreePopup;
	me.TabularDEObj = _TabularDEObj;
	me.relativePeriod;
	me.searchMatrixOrgUnit;
	me.searchPanel = me.TabularDEObj.searchPanel;
	
	me.ouChildrenLoaded = false;
	me.ouChildrenList;
	me.matrixDataLoaded = false;
	me.matrixData;
	
	me.settingConsoleTag = $("#settingConsole");
	me.backToMatrixTag = $("#backToMatrix");
	
	me.specificPeriodChkTag = $("#specificPeriodChk");
	me.specificPeriodSectionTag = $("#specificPeriodSection");
	me.ouMatrixSectionTag = $("#ouMatrixSection");
		
	me.orgUnitNameTag = $( '#matrixOrgUnitName' );	
	me.programListTag = $("#programList");
	me.matrixExecuteRetrievalTag = $("#matrixExecuteRetrieval");
	me.matrixPeriodTag = $("#matrixPeriod");
	me.matrixOuDataTag = $("#matrixOuData");
	me.matrixPrevPeriodTag = $("#matrixPrevPeriod");
	me.matrixNextPeriodTag = $("#matrixNextPeriod");
	me.matrixOuDataDivTag = $("#matrixOuDataDiv");
	me.programStatusListTag = $("#programStatusList");
	
	// Footer
	me.completeEventExpireDaysTag = $("#completeEventExpireDays");
	me.expiryPeriodTypeTag = $("#expiryPeriodType");
	me.expiryDaysTag = $("#expiryDays");

	
	// -------------------------------------------------------------------------------------------------------
	// On Init Setup Method	

	me.initialSetup = function()
	{	
		me.searchMatrixOrgUnit = new SearchMatrixOrgUnit( me );
			
		Util.disableTag( me.matrixExecuteRetrievalTag, true );
		me.setUp_Events();
	};
	
	
	me.setUp_Events = function()
	{
		// Period type change
		me.matrixPeriodTag.change( function(){
			
			// Hide the data result table
			me.matrixOuDataDivTag.hide("fast");
			
			if( me.searchMatrixOrgUnit.programListTag.val() != "" && me.searchMatrixOrgUnit.getOrgUnitId() != "" )
			{
				Util.disableTag( me.matrixExecuteRetrievalTag, false );
			}
			else
			{
				Util.disableTag( me.matrixExecuteRetrievalTag, true );
			}
		});
		
		// Run button
		me.matrixExecuteRetrievalTag.click( function(){
			
			_settingForm.getSettingData( function( settingData ){
				me.relativePeriod = new RelativePeriod( settingData );
				var parentOuId = me.searchMatrixOrgUnit.getOrgUnitId(); 
				var programId = me.programListTag.val();
				if( parentOuId !== undefined && parentOuId != "" && programId !== "" )
				{
					Util.disableTag( me.matrixExecuteRetrievalTag, true );
					me.matrixOuDataTag.html("");
					
					me.ouChildrenLoaded = false;
					me.matrixDataLoaded = false;
					
					me.loadOrgUnitChildren();
					me.loadMatrixData();
					
					var selectedProgram = me.programListTag.find("option:selected");
					
					var completeExpiryDays = selectedProgram.attr("completeExpiryDays");
					completeExpiryDays = ( completeExpiryDays === "undefined" || completeExpiryDays == "" ) ? "--" : completeExpiryDays;
					var expiryPeriodType = selectedProgram.attr("peType");
					expiryPeriodType = ( expiryPeriodType === "undefined" || expiryPeriodType == "" ) ?  "--" : expiryPeriodType;
					
					me.completeEventExpireDaysTag.html( completeExpiryDays );
					me.expiryPeriodTypeTag.html( expiryPeriodType );
					me.expiryDaysTag.html( selectedProgram.attr("expiryDays") );
				}
				else if( parentOuId == undefined || parentOuId == "" )
				{
					alert("Please select an orgUnit.");
				}
				else if( programId == "" )
				{
					alert("Please select a program.");
				}
			});
		});
		
		me.matrixPrevPeriodTag.click( function(){
			me.hideColumns();
			me.relativePeriod.setPrevCurDateByIdx();
			var periodList = me.relativePeriod.generatePeriodList();
			var colExist = me.showColumns( periodList );
			if( !colExist )
			{
				me.addPeriodColumns( 0, periodList );
			}
		});
		
		me.matrixNextPeriodTag.click( function(){
			me.hideColumns();
			me.relativePeriod.setNextCurDateByIdx();
			var periodList = me.relativePeriod.generatePeriodList();
			var colExist = me.showColumns( periodList );
			if( !colExist )
			{
				var periodList = me.relativePeriod.generatePeriodList();
				var colExist = me.showColumns( periodList );
				if( !colExist )
				{
					var colLen = me.matrixOuDataTag.find("th:first").closest("tr").length;
					me.addPeriodColumns( colLen-1, periodList );
				}
			}			
		});
	
		me.backToMatrixTag.click( function(){
			me.specificPeriodSectionTag.hide();
			me.ouMatrixSectionTag.show("fast");
			me.matrixExecuteRetrievalTag.click();
		});
		
	};
	
	
	// -------------------------------------------------------------------------------------------------------
	// Retrieve matrix data
	
	// Load Orgunit Chilren
	me.loadOrgUnitChildren = function()
	{
		me.relativePeriod.resetDate();
		var parentOuId = me.searchMatrixOrgUnit.getOrgUnitId();
		var programId = me.programListTag.val();
		
		var url = me._queryURL_orgUnitChildren;
		url = url.replace( me.PARAMS_ORGUNITID, parentOuId );
		
		RESTUtil.getAsynchData( url
			, function( jsonData )
			{
				var programId = me.programListTag.val();
				me.ouChildrenList = [];
				for( var i in jsonData.children )
				{
					var orgUnit = jsonData.children[i];
					var programs = orgUnit.programs;
					var searched = Util.findItemFromList( programs, "id", programId );
					if( searched !== undefined  )
					{
						me.ouChildrenList.push( orgUnit );
					}
				}
				
				me.ouChildrenList = Util.sortByKey( me.ouChildrenList, "name" );
				me.ouChildrenLoaded = true;
				me.afterLoadMatrix();
				
			}
		);
	};
	
	// Load matrix data from parametters
	me.loadMatrixData = function()
	{
		me.relativePeriod.resetDate();
		var parentOuId = me.searchMatrixOrgUnit.getOrgUnitId();
		var programId = me.programListTag.val();
		var periodTypeCode = me.matrixPeriodTag.val().split("_")[1];
		
		var url = me._queryURL_matrixOrgUnitAndPeriod;
		url = url.replace( me.PARAMS_ORGUNITID, parentOuId );
		url = url.replace( me.PARAMS_PROGRAMID, programId );
		url = url.replace( me.PARAMS_PERIOD_TYPE_CODE, periodTypeCode );
		
		RESTUtil.getAsynchData( url
			, function( jsonData )
			{
				me.matrixDataLoaded = true;
				me.matrixData = jsonData.rows;
				
				me.afterLoadMatrix();
			}
		);
	};
	
	me.afterLoadMatrix = function()
	{
		if( me.ouChildrenLoaded && me.matrixDataLoaded )
		{
			me.initMatrixTable();
			var periodList = me.relativePeriod.generatePeriodList();
			me.addPeriodColumns( 0, periodList );
			me.matrixOuDataDivTag.show("fast");
		}
	};
	
	
	// -------------------------------------------------------------------------------------------------------
	// Create matrix data table
	
	me.initMatrixTable = function()
	{
		// Init header
		var theadTag = $("<thead></thead>");
		var headerTag = $("<tr></tr>");
		headerTag.append("<th></th>"); // Orgunit name
		theadTag.append( headerTag );
		me.matrixOuDataTag.append( theadTag );
		
		
		// Init Rows ( OrgUnit children )
		var tbodyTag = $("<tbody></tbody>");
		for( var i in me.ouChildrenList )
		{
			var ouId = me.ouChildrenList[i].id;
			var ouName = me.ouChildrenList[i].name;
			
			var rowTag = $("<tr ouId='" + ouId + "'></tr>");
			rowTag.append("<td>" + ouName + "</td>");
			tbodyTag.append( rowTag );
		}
		
		me.matrixOuDataTag.append( tbodyTag );		
	};
	
	me.addPeriodColumns = function( idxCol, periodList )
	{
		me.generateHeader( idxCol, periodList );
		me.generateEmptyBodyTable( idxCol, periodList );
		me.makeFormLockStatus( periodList );
		me.populateMatrixData();
	};
	
	me.generateHeader = function( idxCol, periodList )
	{
		var headerTag = me.matrixOuDataTag.find("th:first").closest("tr");
		
		for( var i=0; i<periodList.length; i ++ )
		{
			var code = periodList[i].code;
			var name = periodList[i].name;
			var title = "";
			
			if( me.matrixPeriodTag.val() == me.relativePeriod.PERIOD_TYPE_LAST_12_WEEKS )
			{
				var dateRange = me.relativePeriod.getDateRangeOfPeriod( code );
				var startDateStr = $.format.date( dateRange.startDate, _dateFormat_YYYYMMDD );
				var endDateStr = $.format.date( dateRange.endDate, _dateFormat_YYYYMMDD );
				title = startDateStr + " -> " + endDateStr;
			}
			
			headerTag.find('th').eq( idxCol + i ).after("<th key='" + code + "' title='" + title + "'>" + name + "</th>");
		}
	};
	
	me.generateEmptyBodyTable = function( idxCol, periodList  )
	{
		var selectedProgram = me.matrixPeriodTag.find("option:selected");
		me.matrixOuDataTag.find("tbody tr").each( function(){		
			var ouId = $(this).attr("ouId");
			
			for( var i=0; i<periodList.length; i++ )
			{
				var key = ouId + '_' + periodList[i].code;
				var dataCellTag = $("<td style='cursor:pointer;' key='" + key + "'><span class='status' style='font-weight:bold;'></span> <span class='value'></span></td>");
				me.setUp_Event_matrixDataCell( dataCellTag );
				
				$(this).find('td').eq( idxCol + i ).after( dataCellTag );
			}
		});
	};
	
	me.setUp_Event_matrixDataCell = function( cellTag )
	{
		cellTag.click( function(){
			
			var status = cellTag.find("span.status").attr("status");
			var value = cellTag.find("span.value").html();
			if( status != me.relativePeriod.SIGN_FULL_LOCK_FORM 
				|| ( status == me.relativePeriod.SIGN_FULL_LOCK_FORM && value != "" ) )
			{
				// Disable for control form
				Util.disableTag( me.settingConsoleTag.find("input,select"), true );
				
				// Show Back button and enable [Back To Matrix] button
				me.backToMatrixTag.show();
				Util.disableTag( me.backToMatrixTag, false );
				
				// Load TEI/Event list
				var keys = cellTag.attr("key").split("_");
				var ouName = cellTag.closest("tr").find("td:first").html();
				var ouId = keys[0];
				var periodCode = keys[1];
				
				
				var jsonOuData = {"name": ouName, "id": ouId};
				me.searchPanel.setUp_OrgUnitMap( ouId );
				me.searchPanel.setOrgUnitTags( jsonOuData, function(){
					me.searchPanel.programManager.loadProgramList( ouId, function(){
						me.searchPanel.programManager.defaultProgramTag.val( me.programListTag.val() );
						me.searchPanel.programTagOnChange( function(){
							
							me.searchPanel.defaultProgramRowTag.show();
							
							$( "input[type='radio'][name='period'][value='custom']" ).prop("checked", true);
							$( "input[type='radio'][name='period'][value='custom']" ).click();
							var dateRange = me.relativePeriod.getDateRangeOfPeriod( periodCode );
							me.searchPanel.defaultDateFromTag.val( $.format.date( dateRange.startDate, _dateFormat_YYYYMMDD ) );
							me.searchPanel.defaultDateToTag.val( $.format.date( dateRange.endDate, _dateFormat_YYYYMMDD ) );
							me.searchPanel.defaultDateRowTag.show();
							$( '#defaultDatePeriod' ).show();
							
							me.programStatusListTag.val( _status_ALL );
							me.searchPanel.defaultRetrievalRowTag.show();
							me.searchPanel.programManager.defaultProgramTag.val( me.programListTag.val() );
							me.searchPanel.performDataRetrieval( function(){
								
								me.ouMatrixSectionTag.hide();
								me.specificPeriodSectionTag.show("fast");

								// Scroll left end
								AppUtil.pageHScroll( "Left" );
								
							});
						});
					
					});
				} );
				
				
			}
		});
	};
	
	me.makeFormLockStatus = function( periodList )
	{
		var selectedProgram = me.programListTag.find("option:selected");
		for( var i=0; i<periodList.length; i++ )
		{
			var lockFormSign = me.relativePeriod.lockDataFormByPeriod( periodList[i].code, selectedProgram.attr("peType"), selectedProgram.attr("expiryDays") );
			
			var dataCellTags = me.matrixOuDataTag.find("[key$='" + periodList[i].code + "']");
			dataCellTags.find("span.status").append( me.relativePeriod.convertLockSignFormToTag( lockFormSign ) );
			dataCellTags.find("span.status").attr("status", lockFormSign );
		}
	};
	
	me.populateMatrixData = function()
	{
		for( var i = 0; i < me.matrixData.length; i++ )
		{
			var ouId = me.matrixData[i][0];
			var periodIdx = me.matrixData[i][1];
			var year = me.matrixData[i][2];
			var value = me.matrixData[i][3];
			
			var key = ouId + "_" + me.relativePeriod.generatePeriodCode( periodIdx, year );
			me.matrixOuDataTag.find( "td[key='" + key + "']" ).find("span.value").html( value );
		}
	};
	
	// -------------------------------------------------------------------------------------------------------
	// Show/Hide columns when Prev/Next period buttons are clicked
	
	me.hideColumns = function()
	{
		me.matrixOuDataTag.find("th[key]").hide();
		me.matrixOuDataTag.find("td[key]").hide();
	};
			
	me.showColumns = function( periodList )
	{
		var colExist = false;
		for( var i=0; i<periodList.length; i ++ )
		{
			var code = periodList[i].code;
			me.matrixOuDataTag.find("[key$='" + code + "']").show();
			if( me.matrixOuDataTag.find("[key$='" + code + "']").length > 0)
			{
				colExist = true;
			}
		}
				
		return colExist;
	};
	
	
	// -------------------------------------------------------------------------------------------------------
	// RUN init

	me.initialSetup();
	
}