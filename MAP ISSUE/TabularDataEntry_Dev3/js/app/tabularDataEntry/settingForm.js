
//		- Used for popup Setting Form

function SettingForm( _TabularDEObj, _matrixObj )
{
	var me = this;
	me.TabularDEObj = _TabularDEObj;
	me.matrixObj = _matrixObj;

	me.searchMatrixOrgUnit = me.matrixObj.searchMatrixOrgUnit;
	me.orgUnitSelectionTreePopup = me.matrixObj.orgUnitSelectionTreePopup;
	
	me.dialogFormTag = $( "#settingDialogForm" );
	
	me.specificPeriodChkTag = $("#specificPeriodChk");
	me.specificPeriodSectionTag = $("#specificPeriodSection");
	me.ouMatrixSectionTag = $("#ouMatrixSection");
	me.settingConsoleTag = $("#settingConsole");
	me.backToMatrixTag = $("#backToMatrix");
	me.matrixExecuteRetrievalTag = $("#matrixExecuteRetrieval");
	
	
	me.settingLinkTag = $("#settingLink");
	
	me.countryLevelTag = $( '#countryLevels' );
	me.specificPeriodModeTag = $( '#specificPeriodMode' );
	me.matrixPeriodTbTag = $("#matrixPeriodTb");
	
	me.thisYearMonthsPeriodTag = $( '#thisYearMonthsPeriod' );
	me.last12MonthsPeriodTag = $( '#last12MonthsPeriod' );
	me.last12WeeksPeriodTag = $( '#last12WeeksPeriod' );
	me.last12QuartersPeriodTag = $( '#last12QuartersPeriod' );
	me.matrixPeriodSettingMsgTag = $( '#matrixPeriodSettingMsg' );
	me.matrixPeriodTag = $("#matrixPeriod");

	me.currentVersionTag = $( '#currentVersion' );
	me.trLatestVersionTag = $( '#trLatestVersion' );
	me.latestVersionTag = $( '#latestVersion' );

	me.trIncompleteActionUserRoleTag = $( '#trIncompleteActionUserRole' );
	me.incompleteActionUserRoleTag = $( '#incompleteActionUserRole' );
	
	
	me.mainPersonSectionTag =  $( '#mainSection_Person' );
	me.mainSectionEventTag =  $( '#mainSection_Event' );
	me.matrixOuDataDivTag = $( '#matrixOuDataDiv' );
	
	me.searchResultMsgRowTag = $( '#searchResultMsgRow' );

	// Event settings
	
	me.addProgramRuleBtnTag = $("#addProgramRuleBtn");
	me.addDataSetRuleBtnTag = $("#addDataSetRuleBtn");


	me.width = 600;
	me.height = 450;

	me.dbSettingName = "App_TabularData_SettingData";

	me.queryURL_orgUnitLevels = _queryURL_api + 'organisationUnitLevels.json?paging=false&fields=id,name,level';
	me.queryURL_orgUnitGroups = _queryURL_api + 'organisationUnitGroups.json?paging=false&fields=id,name';
	me.queryURL_trackedDataElements = _queryURL_api + 'dataElements.json?paging=false&fields=id,name,domainType,dataSetElements[dataSet[id]]'; // TRACKER
	me.queryURL_aggregateDataElements = _queryURL_api + 'dataSets/XURYYYvxH9z.json?fields=dataSetElements[dataElement[id,name,domainType]]'; // AGGEGATE

	me.settingData;
	me.ouGroupList = [];
	me.dataElementList = [];
	me.loadedOUGroups = false;
	me.loadedTrackerDataElements = false;
	me.loadedAggDataElements = false;
	
	me.FormPopupSetup = function()
	{
		// -- Set up the form -------------------
		me.dialogFormTag.dialog({
		  autoOpen: false
		  ,dialogClass: "noTitleStuff"
		  ,width: me.width
		  ,height: me.height				  
		  ,modal: true				
		  ,buttons: {
			"Save": function() {
				
				var dialogForm = $( this );
				
				// Check mandatory values
				var checkFail = false;
				
				// Check matrix periods
				if( !me.checkMandatoryMatrixPeriod() )
				{
					me.matrixPeriodSettingMsgTag.show();
					checkFail = true;
				}
				else
				{
					me.matrixPeriodSettingMsgTag.hide();
				}
				
				
				if ( me.countryLevelTag.val() == "" )
				{
					checkFail = true;
					alert( $( 'span.msg_SettingData_MandatoryCountryLevel' ).text() );
				}

				if ( !checkFail )
				{
					var json_SettingData = ( me.settingData !== undefined ) ? me.settingData : { 'countryLevel': '' } ; 

					json_SettingData.countryLevel = me.countryLevelTag.val();

					if ( me.trLatestVersionTag.is( ':visible' ) )
					{
						json_SettingData.latestVersion = me.latestVersionTag.val();
					}


					if ( me.trIncompleteActionUserRoleTag.is( ':visible' ) )
					{
						json_SettingData.incompleteActionUserRole = me.incompleteActionUserRoleTag.val();
					}
					
					// Matrix periods
					me.settingData.specialPeriodMode = me.specificPeriodModeTag.val();
					
					// Matrix periods
					me.settingData.thisYearMonthsPeriod = me.thisYearMonthsPeriodTag.prop("checked");
					me.settingData.last12MonthsPeriod = me.last12MonthsPeriodTag.prop("checked");
					me.settingData.last12WeeksPeriod = me.last12WeeksPeriodTag.prop("checked");
					me.settingData.last12QuartersPeriod = me.last12QuartersPeriodTag.prop("checked");
					
					// Tracker data elements in OU Group list
					json_SettingData.orgUnitGroups = [];
					me.dialogFormTag.find(".ouGroupList").each( function(){
						var ouGroupId = $( this ).val();
						
						var deList = [];
						var deListTag = $( this ).closest("tr").find("select.deList");
						deListTag.each( function(){
							var deId = $(this).val();
							if( deId !== "" )
							{
								deList.push( deId );
							}
						});
						
						if( deList.length > 0 )
						{
							var ouGroupSetting = {};
							ouGroupSetting.ouGroupId = ouGroupId;
							ouGroupSetting.deList = deList;
							json_SettingData.orgUnitGroups.push( ouGroupSetting );
						}
					});
					
					
					// Aggregate data elements in OU Group list
					json_SettingData.aggOrgUnitGroups = [];
					me.dialogFormTag.find(".aggOuGroupList").each( function(){
						var ouGroupId = $( this ).val();
						
						var deList = [];
						var deListTag = $( this ).closest("tr").find("select.deList");
						deListTag.each( function(){
							var deId = $(this).val();
							if( deId !== "" )
							{
								deList.push( deId );
							}
						});
						
						if( deList.length > 0 )
						{
							var ouGroupSetting = {};
							ouGroupSetting.ouGroupId = ouGroupId;
							ouGroupSetting.deList = deList;
							json_SettingData.aggOrgUnitGroups.push( ouGroupSetting );
						}
					});
					
					
					
					DBSetting.saveSettingValue( me.dbSettingName, json_SettingData
					, function()
					{
						me.settingData = json_SettingData;
						dialogForm.dialog( "close" );
						
						me.searchResultMsgRowTag.hide();
						me.mainPersonSectionTag.hide("fast");
						me.mainSectionEventTag.hide("fast");
						me.matrixOuDataDivTag.hide("fast");
						
						me.populateMatrixPeriodSetting();
					}
					, function()
					{
						alert( $( 'span.msg_SettingData_FailedToSave' ).text() );		
					});	
				}
			}
			,"Close": function()
			  {
				$( this ).dialog( "close" );
			  }

		  }				
		});		
	}

	me.checkMandatoryMatrixPeriod = function()
	{
		return( me.thisYearMonthsPeriodTag.prop( "checked" ) 
			|| me.last12MonthsPeriodTag.prop( "checked" ) 
			|| me.last12WeeksPeriodTag.prop( "checked" ) 
			|| me.last12QuartersPeriodTag.prop( "checked" ) );
	}
	
	me.openForm = function( status )
	{
		if ( status !== undefined && status == 'AtStart' )
		{
			me.dialogFormTag.find( '.ui-dialog-buttonpane' ).find( 'button:contains("Close")' ).button().hide();
		}

		me.populateSettingData();

		me.dialogFormTag.dialog( "open" );
	}

	me.populateSettingData = function()
	{
		if ( me.settingData !== undefined )
		{
			// set the tags value based on settingData
			if ( me.settingData.countryLevel !== undefined )
			{
				me.countryLevelTag.val( me.settingData.countryLevel );
			}

			if ( me.settingData.latestVersion !== undefined )
			{
				me.latestVersionTag.val( me.settingData.latestVersion );
			}

			if ( me.settingData.incompleteActionUserRole !== undefined )
			{
				me.incompleteActionUserRoleTag.val( me.settingData.incompleteActionUserRole );
			}
			
			// Set Default Mode : Matrix/Special Period
			if ( me.settingData.specialPeriodMode !== undefined )
			{
				me.specificPeriodChkTag.prop("checked", eval( me.settingData.specialPeriodMode ) );
				me.specificPeriodModeTag.val( me.settingData.specialPeriodMode );
				me.viewModeOnChange();
			}
			
			// Set Matrix period options
			me.populateMatrixPeriodSetting();
			
			
			// Traker data element in OU Group list
			me.dialogFormTag.find(".ouGroupList").closest("tr").remove();
			if( me.settingData.orgUnitGroups != undefined )
			{
				for( var i in me.settingData.orgUnitGroups )
				{
					var ouGroupSetting = me.settingData.orgUnitGroups[i];
					var deList =  ouGroupSetting.deList;
					var ouGroupRowTag = me.addTrackerOrgUnitGroupRow( ouGroupSetting.ouGroupId, deList[0] );
					var deListCellTag = ouGroupRowTag.find("select.deList").closest("td");
					for( var j=1; j<deList.length; j++ )
					{
						me.addMoreDEListTag( deListCellTag, deList[j], "TRACKER" );
					}
				}
			}
			
			// Aggregate data element in OU Group list
			me.dialogFormTag.find(".aggOuGroupList").closest("tr").remove();
			if( me.settingData.aggOrgUnitGroups != undefined )
			{
				for( var i in me.settingData.aggOrgUnitGroups )
				{
					var ouGroupSetting = me.settingData.aggOrgUnitGroups[i];
					var deList =  ouGroupSetting.deList;
					var ouGroupRowTag = me.addAggOrgUnitGroupRow( ouGroupSetting.ouGroupId, deList[0] );
					var deListCellTag = ouGroupRowTag.find("select.deList").closest("td");
					for( var j=1; j<deList.length; j++ )
					{
						me.addMoreDEListTag( deListCellTag, deList[j], "AGGREGATE" );
					}
				}
			}
		}
	}
	
	me.populateMatrixPeriodSetting = function()
	{
		var peCount = 0;
		if( me.settingData.thisYearMonthsPeriod == undefined 
			&& me.settingData.last12MonthsPeriod == undefined 
			&& me.settingData.last12WeeksPeriod == undefined 
			&& me.settingData.last12QuartersPeriod == undefined )
		{
			me.thisYearMonthsPeriodTag.prop( "checked", true );
			me.last12MonthsPeriodTag.prop( "checked", true );
			me.last12WeeksPeriodTag.prop( "checked", true );
			me.last12QuartersPeriodTag.prop( "checked", true );
			
			me.matrixPeriodTag.find("option").show();
		}
		else
		{
			me.thisYearMonthsPeriodTag.prop( "checked", false );
			me.last12MonthsPeriodTag.prop( "checked", false );
			me.last12WeeksPeriodTag.prop( "checked", false );
			me.last12QuartersPeriodTag.prop( "checked", false );
			me.matrixPeriodTag.find("option").hide();
			me.matrixPeriodTag.val("");
		}
		

		if( me.settingData.last12QuartersPeriod != undefined && me.settingData.last12QuartersPeriod )
		{
			me.last12QuartersPeriodTag.prop("checked", true );
			me.matrixPeriodTag.find("option[dataVal='last12QuartersPeriod']").show();
			me.matrixPeriodTag.val("last12Quarters_QUARTER");
			peCount++;
		}
		
		if( me.settingData.last12WeeksPeriod != undefined && me.settingData.last12WeeksPeriod )
		{
			me.last12WeeksPeriodTag.prop("checked", true );
			me.matrixPeriodTag.find("option[dataVal='last12WeeksPeriod']").show();
			me.matrixPeriodTag.val("last12Weeks_WEEK");
			peCount++;
		}
		
		if( me.settingData.last12MonthsPeriod != undefined && me.settingData.last12MonthsPeriod )
		{
			me.last12MonthsPeriodTag.prop("checked", true );
			me.matrixPeriodTag.find("option[dataVal='last12MonthsPeriod']").show();
			
			me.matrixPeriodTag.val("last12Months_MONTH");
			peCount++;
		}
		
		if( me.settingData.thisYearMonthsPeriod != undefined && me.settingData.thisYearMonthsPeriod )
		{
			me.thisYearMonthsPeriodTag.prop("checked", true );
			me.matrixPeriodTag.find("option[dataVal='thisYearMonthsPeriod']").show();
			me.matrixPeriodTag.val("thisYearMonths_MONTH");
			peCount++;
		}
		
		
		if( peCount == 1 )
		{
			me.matrixPeriodTbTag.hide();
		}
		else
		{
			me.matrixPeriodTbTag.show();
		}
	}
	
	me.getSettingData = function( execFunc )
	{
		if ( me.settingData !== undefined )
		{
			execFunc( me.settingData );
		}
		else
		{
			DBSetting.getSettingValue( me.dbSettingName
			, function( json_Data ) 
			{
				me.settingData = json_Data;

				execFunc( me.settingData );
			}
			, function( json_Data ) 
			{
				execFunc( me.settingData );
			});
		}
	}

	me.getCountryLevel = function()
	{
		var countryLevel;

		if ( me.settingData !== undefined )
		{
			countryLevel = me.settingData.countryLevel;
		}
		else
		{
			alert( $( 'span.msg_SettingData_CountryLevelNotDefined' ).text() );
		}

		return countryLevel;
	}


	// Check for existing country data and open if not setup yet
	me.checkRequiredData = function( json_Data )
	{
		if ( json_Data === undefined )
		{
			console.log( 'No setting data found.  Asking for setting data for the first time.' );

			me.openForm( 'AtStart' );
		}
		else if ( !( Util.checkDefined( json_Data ) && Util.checkValue( json_Data.countryLevel ) ) )
		{
			console.log( 'Setting data found, but country level is not set.  Asking for country level data.' );

			me.openForm( 'AtStart' );
		}				
	}


	me.checkIfNotLastVersion = function( json_Data )
	{
		// If the user is deploymentManager, show the version as editable
		if ( json_Data !== undefined && Util.checkValue( json_Data.latestVersion ) )
		{
			//get current version..
			var currentVersion = me.currentVersionTag.text();

			if ( currentVersion < json_Data.latestVersion )
			{
				var message = l10n.get( 'Msg_NotLatestVersion' );

				message = message.replace( '{--version--}', json_Data.latestVersion );
				//'This app is not the latest version, v ' + json_Data.latestVersion + '.  Please refresh the browser to get the latest version.';

				alert( message ); 

				MsgManager.msgAreaShow( message );
			}				
		}
	}


	me.checkIncompleteAction_UserRole = function( runFunc )
	{
		// If user has userRole that matches 'Incomplete Action User Role', execute 'runFunc'

		if ( me.settingData !== undefined && Util.checkValue( me.settingData.incompleteActionUserRole ) )
		{
			DHISUtil.retrieveUserInfo( function( json_Data )
			{
				var userRoles = json_Data.userCredentials.userRoles;

				if ( userRoles !== undefined )
				{
					$.each( userRoles, function( i_ur, item_ur )
					{
						if ( item_ur.name == me.settingData.incompleteActionUserRole )
						{
							runFunc();

							return false;
						}
					});
				}
			});
		}
	}


	me.loadSettingDataInitially_AndCheckRequired = function()
	{
		me.setRowVisibility();

		me.getSettingData( function( json_Data )
		{
			me.checkIfNotLastVersion( json_Data );
		
			me.checkRequiredData( json_Data );
		});
	}

	me.setRowVisibility = function()
	{
		DHISUtil.retrieveUserAccount( function( json_data ) 
		{
			if ( json_data.username == _deploymentManagerId )
			{
				me.trLatestVersionTag.show();

				me.trIncompleteActionUserRoleTag.show();
			}
		});	
	}


	// User Role should be loaded in the beginning and saved..
	// So that it can be reused..

	// Get User Role - Since using


	me.setOrgUnitList = function( listTag )
	{
		listTag.empty();

		RESTUtil.getAsynchData( me.queryURL_orgUnitLevels
		, function( json_Data )
		{
			listTag.append( '<option value="">' + l10n.get('selectOrgunitLevel') + '</option>' );

			if ( json_Data !== undefined )
			{
				var json_Levels = json_Data.organisationUnitLevels;

				var json_Levels_Sorted = Util.sortByKey( json_Levels, "level" );

				$.each( json_Levels_Sorted, function( i, item ) {

					listTag.append( $( '<option></option>' ).attr( "value", item.level ).text( l10n.get('level') + ' ' + item.level + ' - ' + item.name ) );
				});
			}
		}
		, function() 
		{  
			alert( $( 'span.msg_SettingData_OrgUnitLevelNotFound' ).text() );
		});	

	}
	
	me.loadOrgUnitGroupList = function()
	{
		RESTUtil.getAsynchData( me.queryURL_orgUnitGroups
		, function( json_Data )
		{
			me.ouGroupList = json_Data.organisationUnitGroups;
			me.loadedOUGroups = true;
			me.afterLoadedMetaData();
		}
		, function() 
		{  
			alert( $( 'span.msg_SettingData_OrgUnitLevelNotFound' ).text() );
		});
	};

	me.loadTrackerDataElementList = function()
	{
		RESTUtil.getAsynchData( me.queryURL_trackedDataElements
		, function( json_Data )
		{
			me.trackerDataElementList = Util.sortByKey( json_Data.dataElements, "name" );
			me.loadedTrackerDataElements = true;
			me.afterLoadedMetaData();
		}
		, function() 
		{  
			alert( $( 'span.msg_SettingData_OrgUnitLevelNotFound' ).text() );
		});
	};

	me.loadAggDataElementList = function()
	{
		me.aggDataElementList = [];
		
		RESTUtil.getAsynchData( me.queryURL_aggregateDataElements
		, function( json_Data )
		{
			for( var i in json_Data.dataSetElements )
			{
				me.aggDataElementList.push( json_Data.dataSetElements[i].dataElement );
			}
			
			me.aggDataElementList = Util.sortByKey( me.aggDataElementList, "name" );
			me.loadedAggDataElements = true;
			me.afterLoadedMetaData();
		}
		, function() 
		{  
			me.loadedAggDataElements = true;
			me.afterLoadedMetaData();
		});
	};
	
	
	me.afterLoadedMetaData = function()
	{
		if( me.loadedOUGroups && me.loadedTrackerDataElements && me.loadedAggDataElements )
		{
			me.addTrackerOrgUnitGroupRow();
			me.populateSettingData();
			
			MsgManager.appUnblock();
		}
	};
	
	me.addMoreDEListTag = function( deListCellTag, selectedDEId, domainType )
	{
		var deTag = me.generateDataElementListTag( domainType );
		if( selectedDEId != undefined )
		{
			deTag.val( selectedDEId );
		}
		
		var removeBtnTag = $( "<button class='removeDETag'>[-]</button>" );
		removeBtnTag.click( function(){
			me.removeDeTag( deTag, removeBtnTag );
		});

		var divTag = $("<div></div>");
		divTag.append( deTag );
		divTag.append( removeBtnTag );
		
		deListCellTag.find("button.addMoreDE").before( divTag );	
		
	};
	
	me.removeDeTag = function( deTag, removeBtnTag )
	{
		deTag.remove();
		removeBtnTag.remove();
	};
	
	me.addTrackerOrgUnitGroupRow = function( selectedOuId, selectedDEId )
	{
		// -----------------------------------------------------------------------
		// First column
		
		// STEP 1. Generate program list tag
		var ouGroupTag = me.generateOuGroupListTag( "ouGroupList" );
		if( selectedOuId != undefined )
		{
			ouGroupTag.val( selectedOuId );
		}
		
		// STEP 2. Add the OUGroup to first column
		var firstColTag = $("<td></td>");
		firstColTag.append( ouGroupTag );
		
		// -----------------------------------------------------------------------
		// Second column
		
		// STEP 3. Generate TRACKER data element list tag
		var deTag = me.generateDataElementListTag( "TRACKER" );
		if( selectedDEId != undefined )
		{
			deTag.val( selectedDEId );
		}
		
		// STEP 4. Create second column
		var secondColTag = $("<td></td>");
		
		// STEP 5. Create and add [Add more] button for data element selector in second column
		var addMoreDEBtnTag = $("<button class='addMoreDE'>[+]</button>");
		addMoreDEBtnTag.click( function(){
			me.addMoreDEListTag( secondColTag, undefined, "TRACKER" );
		});
		secondColTag.append("<br>");
		secondColTag.append( addMoreDEBtnTag );	
		
		// STEP 6. Add one data element selector in second column 
		me.addMoreDEListTag( secondColTag, selectedDEId, "TRACKER" );
		
		// -----------------------------------------------------------------------
		// Add two columns into table
		
		var groupRowTag = $("<tr></tr>");
		groupRowTag.append( firstColTag );
		groupRowTag.append( secondColTag );

		me.addProgramRuleBtnTag.closest("tr").before( groupRowTag );
		
		return groupRowTag;
	};
	
	
	me.addAggOrgUnitGroupRow = function( selectedOuId, selectedDEId )
	{
		// -----------------------------------------------------------------------
		// First column
		
		// STEP 1. Generate program list tag
		var ouGroupTag = me.generateOuGroupListTag( "aggOuGroupList" );
		if( selectedOuId != undefined )
		{
			ouGroupTag.val( selectedOuId );
		}
		
		// STEP 2. Add the OUGroup to first column
		var firstColTag = $("<td></td>");
		firstColTag.append( ouGroupTag );
		
		// -----------------------------------------------------------------------
		// Second column
		
		// STEP 3. Generate AGGREGATE data element list tag
		var deTag = me.generateDataElementListTag( "AGGREGATE" );
		if( selectedDEId != undefined )
		{
			deTag.val( selectedDEId );
		}
		
		// STEP 4. Create second column
		var secondColTag = $("<td></td>");
		
		// STEP 5. Create and add [Add more] button for data element selector in second column
		var addMoreDEBtnTag = $("<button class='addMoreDE'>[+]</button>");
		addMoreDEBtnTag.click( function(){
			me.addMoreDEListTag( secondColTag, undefined, "AGGREGATE" );
		});
		secondColTag.append("<br>");
		secondColTag.append( addMoreDEBtnTag );	
		
		// STEP 6. Add one data element selector in second column 
		me.addMoreDEListTag( secondColTag, selectedDEId, "AGGREGATE" );
		
		// -----------------------------------------------------------------------
		// Add two columns into table
		
		var groupRowTag = $("<tr></tr>");
		groupRowTag.append( firstColTag );
		groupRowTag.append( secondColTag );

		me.addDataSetRuleBtnTag.closest("tr").before( groupRowTag );
		
		return groupRowTag;
	};
	
	me.generateOuGroupListTag = function( clazzName )
	{
		var listTag = $( "<select class='" + clazzName + "' style='width:200px;'></select>" );
		listTag.append( '<option value="">' + l10n.get('selectOrgunitGroup') + '</option>' );

		var list = Util.sortByKey( me.ouGroupList, "name" );

		$.each( list, function( i, item ) {

			listTag.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
		});
		
		return listTag;
	
	};
				
	me.generateDataElementListTag = function( domainType )
	{
		var listTag = $( "<select class='deList' style='width:200px;'></select>" );
		listTag.append( '<option value="">' + l10n.get('selectDataElement') + '</option>' );

		var list;
		if( domainType == "TRACKER" ){
			list = me.trackerDataElementList;
		}
		else if( domainType == "AGGREGATE" ){
			list = me.aggDataElementList;
		}
		
		$.each( list, function( i, item ) {
			if( item.domainType == domainType )
			{
				listTag.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
			}
		});
		
		return listTag;
	};
	
	// Initial Setup Call
	me.initialSetup = function()
	{
		MsgManager.appBlock("Configuration ...");
		$( "#settingDialogTabs" ).tabs();
		
		me.specificPeriodChkTag.change( function(){
			 me.viewModeOnChange();
		} );
		me.loadSettingDataInitially_AndCheckRequired();
		
		
		var userSecurityManager = new UserSecurityManager();
		userSecurityManager.performSetup( function(){
			
			var authorities = userSecurityManager.getUserPermission_Authorities();
			if( authorities.Settings_Edit )
			{
				me.settingLinkTag.show();
			}
			else
			{
				me.settingLinkTag.hide();
			}
			
			me.setOrgUnitList( me.countryLevelTag );
		
			me.loadOrgUnitGroupList();
			me.loadAggDataElementList();
			me.loadTrackerDataElementList();
			
			me.FormPopupSetup();
			
			me.addProgramRuleBtnTag.click( function(){
				me.addTrackerOrgUnitGroupRow();
			});
			
			me.addDataSetRuleBtnTag.click( function(){
				me.addAggOrgUnitGroupRow();
			});
		});
		
	};
	
	
	// --------------------------
	// Run methods

	// Initial Run Call
	me.initialSetup();
	
	// Change the Views
	me.viewModeOnChange = function()
	{
		if( me.specificPeriodChkTag.prop( "checked" ) )
		{
			me.ouMatrixSectionTag.hide();
			me.specificPeriodSectionTag.show("fast");
			
			var orgUnitId = me.TabularDEObj.searchPanel.getOrgUnitId();
			me.TabularDEObj.orgUnitSelectionTreePopup.selectOrgunitOnTree( orgUnitId );
			
			
			// Disable for control form
			Util.disableTag( me.settingConsoleTag.find("input,select"), false );
			
			// Show Back button and enable [Back To Matrix] button
			me.backToMatrixTag.hide();
			
			// Reset [Specific Period] form
			me.TabularDEObj.searchPanel.resetSetting_OrgUnitAndBelow();
			me.TabularDEObj.searchPanel.setVisibility_Section( me.TabularDEObj.searchPanel.orgUnitRowTag, true );
			
			// Reset orgUnit seletor
			if( orgUnitId != undefined )
			{
				me.TabularDEObj.searchPanel.onOrgUnitSelect( me.TabularDEObj.searchPanel.getOrgUnit() );
			}
		}
		else
		{
			me.specificPeriodSectionTag.hide();
			me.ouMatrixSectionTag.show("fast");
			Util.disableTag( me.matrixExecuteRetrievalTag, false );
			
			var orgUnitId = me.searchMatrixOrgUnit.getOrgUnitId();
			me.orgUnitSelectionTreePopup.selectOrgunitOnTree( orgUnitId );
			
			me.specificPeriodSectionTag.hide();
			
			// Reset [Matrix] form
			if( orgUnitId != undefined )
			{
				me.searchMatrixOrgUnit.onOrgUnitSelect( me.searchMatrixOrgUnit.getOrgUnit() );
			}
			else
			{
				me.searchMatrixOrgUnit.setRootOrgUnitAsDefault();
			}
		}
	}

}

