
//		- Used for popup Setting Form

function SettingForm()
{
	var me = this;

	me.dialogFormTag = $( "#settingDialogForm" );

	me.countryLevelTag = $( '#countryLevels' );

	me.currentVersionTag = $( '#currentVersion' );
	me.trLatestVersionTag = $( '#trLatestVersion' );
	me.latestVersionTag = $( '#latestVersion' );

	me.trIncompleteActionUserRoleTag = $( '#trIncompleteActionUserRole' );
	me.incompleteActionUserRoleTag = $( '#incompleteActionUserRole' );
	
	
	me.mainPersonSectionTag =  $( '#mainSection_Person' );
	me.mainSectionEventTag =  $( '#mainSection_Event' );
	
	me.searchResultMsgRowTag = $( '#searchResultMsgRow' );

	// Event settings
	
	me.allowCreateFutureEventTag = $( '#allowCreateFutureEvent' );
	me.lockEditingAndCreateEventTag = $( '#lockEditingAndCreateEvent' );
	me.lockEditingPreviousEventTag = $( '#lockEditingPreviousEvent' );
	me.addProgramRuleBtnTag = $("#addProgramRuleBtn");


	me.width = 600;
	me.height = 450;

	me.dbSettingName = "App_TabularData_SettingData";

	me.queryURL_orgUnitLevels = _queryURL_api + 'organisationUnitLevels.json?paging=false&fields=id,name,level';
	me.queryURL_orgUnitGroups = _queryURL_api + 'organisationUnitGroups.json?paging=false&fields=id,name';
	me.queryURL_trackedDataElements = _queryURL_api + 'dataElements.json?paging=false&fields=id,name&filter=domainType:eq:TRACKER';

	me.settingData;
	me.ouGroupList = [];
	me.dataElementList = [];
	me.loadedOUGroups = false;
	me.loadedDataElements = false;
	
	
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

				// Check the value and 
				var checkFail = false;
				
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

	
					json_SettingData.lockEditingPreviousEvent = me.lockEditingPreviousEventTag.prop("checked");
					json_SettingData.lockEditingAndCreateEvent = me.lockEditingAndCreateEventTag.prop("checked");
					json_SettingData.allowCreateFutureEvent = me.allowCreateFutureEventTag.prop("checked");
					
					// Remove the last settings for OU Group list
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
					
					
					DBSetting.saveSettingValue( me.dbSettingName, json_SettingData
					, function()
					{
						me.settingData = json_SettingData;
						dialogForm.dialog( "close" );
						
						me.searchResultMsgRowTag.hide();
						me.mainPersonSectionTag.hide("fast");
						me.mainSectionEventTag.hide("fast");
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
			
			if ( me.settingData.lockEditingPreviousEvent !== undefined )
			{
				me.lockEditingPreviousEventTag.prop( "checked", me.settingData.lockEditingPreviousEvent );
			}
			
			if ( me.settingData.lockEditingAndCreateEvent !== undefined )
			{
				me.lockEditingAndCreateEventTag.prop( "checked", me.settingData.lockEditingAndCreateEvent );
			}
			
			if ( me.settingData.allowCreateFutureEvent !== undefined )
			{
				me.allowCreateFutureEventTag.prop( "checked", me.settingData.allowCreateFutureEvent );
			}
			
			// Remove the last settings for OU Group list
			me.dialogFormTag.find(".ouGroupList").closest("tr").remove();
			if( me.settingData.orgUnitGroups != undefined )
			{
				for( var i in me.settingData.orgUnitGroups )
				{
					var ouGroupSetting = me.settingData.orgUnitGroups[i];
					var deList =  ouGroupSetting.deList;
					var ouGroupRowTag = me.addOrgUnitGroupRow( ouGroupSetting.ouGroupId, deList[0] );
					var deListCellTag = ouGroupRowTag.find("select.deList").closest("td");
					for( var j=1; j<deList.length; j++ )
					{
						me.addMoreDEListTag( deListCellTag, deList[j] );
					}
				}
			}
			
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

	me.loadTrackedDataElementList = function()
	{
		RESTUtil.getAsynchData( me.queryURL_trackedDataElements
		, function( json_Data )
		{
			me.dataElementList = json_Data.dataElements;
			me.loadedDataElements = true;
			me.afterLoadedMetaData();
		}
		, function() 
		{  
			alert( $( 'span.msg_SettingData_OrgUnitLevelNotFound' ).text() );
		});
	};

	me.afterLoadedMetaData = function()
	{
		if( me.loadedOUGroups && me.loadedDataElements )
		{
			me.addOrgUnitGroupRow();
		}
	};
	
	me.addMoreDEListTag = function( deListCellTag, selectedDEId )
	{
		var deTag = me.generateDataElementListTag();
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
	}
	
	me.addOrgUnitGroupRow = function( selectedOuId, selectedDEId )
	{
		// -----------------------------------------------------------------------
		// First column
		
		// STEP 1. Generate program list tag
		var ouGroupTag = me.generateOuGroupListTag();
		if( selectedOuId != undefined )
		{
			ouGroupTag.val( selectedOuId );
		}
		
		// STEP 2. Add the OUGroup to first column
		var firstColTag = $("<td></td>");
		firstColTag.append( ouGroupTag );
		
		// -----------------------------------------------------------------------
		// Second column
		
		// STEP 3. Generate data element list tag
		var deTag = me.generateDataElementListTag();
		if( selectedDEId != undefined )
		{
			deTag.val( selectedDEId );
		}
		
		// STEP 4. Create second column
		var secondColTag = $("<td></td>");
		
		// STEP 5. Create and add [Add more] button for data element selector in second column
		var addMoreDEBtnTag = $("<button class='addMoreDE'>[+]</button>");
		addMoreDEBtnTag.click( function(){
			me.addMoreDEListTag( secondColTag );
		});
		secondColTag.append("<br>");
		secondColTag.append( addMoreDEBtnTag );	
		
		// STEP 6. Add one data element selector in second column 
		me.addMoreDEListTag( secondColTag, selectedDEId );
		
		// -----------------------------------------------------------------------
		// Add two columns into table
		
		var groupRowTag = $("<tr></tr>");
		groupRowTag.append( firstColTag );
		groupRowTag.append( secondColTag );

		me.addProgramRuleBtnTag.closest("tr").before( groupRowTag );
		
		return groupRowTag;
	};
	
	me.generateOuGroupListTag = function()
	{
		var listTag = $( "<select class='ouGroupList' style='width:200px;'></select>" );
		listTag.append( '<option value="">' + l10n.get('selectOrgunitGroup') + '</option>' );

		var list = Util.sortByKey( me.ouGroupList, "name" );

		$.each( list, function( i, item ) {

			listTag.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
		});
		
		return listTag;
	me.dataElementList = [];
	
	};
				
	me.generateDataElementListTag = function()
	{
		var listTag = $( "<select class='deList' style='width:200px;'></select>" );
		listTag.append( '<option value="">' + l10n.get('selectDataElement') + '</option>' );

		var list = Util.sortByKey( me.dataElementList, "name" );

		$.each( list, function( i, item ) {

			listTag.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
		});
		
		return listTag;
	};
	
	// Initial Setup Call
	me.initialSetup = function()
	{
		me.setOrgUnitList( me.countryLevelTag );
		
		me.loadOrgUnitGroupList();
		me.loadTrackedDataElementList();
		
		me.FormPopupSetup();
		
		me.addProgramRuleBtnTag.click( function(){
			me.addOrgUnitGroupRow();
		});
	}

	// --------------------------
	// Run methods

	// Initial Run Call
	me.initialSetup();

}

