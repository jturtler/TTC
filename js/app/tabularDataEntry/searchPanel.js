
// -------------------------------------------
// Class - SearchPanel
//			- Setting data holding class
function SearchPanel( TabularDEObj )
{
	var me = this;

	me.TabularDEObj = TabularDEObj;

	me.queryURL_OrgUnit = _queryURL_api + 'organisationUnits/'; //EmUlPkdz1t8.json?viewClass=basic
	me.queryURL_OrgUnitNameQuery = _queryURL_api + 'organisationUnits.json?paging=false&fields=name,id,level,parents[id,name,level],ancestors[id,name,level]&filter=name:ilike:';
	
	// Tages..
	me.orgUnitMapSmall_DivTag = $( '#orgUnitMapSmall' );
	me.orgUnitRowTag = $( '#orgUnitRow' );
	me.orgUnitNameTag = $( '#orgUnitName' );	// Default OrgUnit Search By Name in [Tabular] function
	me.orgUnitTreeBtnTag = $( '#orgUnitTreeBtn' );
	me.defaultDateRowTag = $( '#defaultDateRow' );
	me.defaultDateTag = $( '#defaultDate' );
	me.defaultDateFromTag = $( '#defaultDateFrom' );
	me.defaultDateToTag = $( '#defaultDateTo' );

	//me.periodRadio_MonthTag = $( '#periodRadio_Month' );

	me.defaultRetrievalRowTag = $( '#defaultRetrievalRow' );
	me.executeRetrievalTag = $( '#executeRetrieval' );

	me.defaultProgramRowTag = $( '#defaultProgramRow' );
	me.defaultProgramTag = $( '#defaultProgram' );
	me.defaultProgramNoteSpanTag = $( '#defaultProgramNote' );
	me.personFoundNoSpanTag = $( '#personFoundNo' );
	me.personList_DescSpanTag = $( '#personList_Desc' );

	me.personEventSearchOptionsTag = $( '#personEventSearchOptions' );

	me.programStatusListTag = $( '#programStatusList' );
	me.searchAllProgramTag = $( '#searchAllProgram' );
	me.listAllPersonHistoricalEventsTag = $( '#listAllPersonHistoricalEvents' );

	me.searchResultMsgRowTag = $( '#searchResultMsgRow' );
	me.searchResultMessageTag = $( '#searchResultMessage' );

	me.defaultDateType;
	me.defaultDateFrom;
	me.defaultDateTo;
	
	// Set program manager
	me.programManager = new ProgramManager( me.TabularDEObj, me.defaultProgramTag );

	me.defaultProgram_TEA_Manager = new DefaultProgram_TEA_Manager();

	// OrgUnit Selection Tree Popup
	me.orgUnitSelectionTreePopup = me.TabularDEObj.orgUnitSelectionTreePopup;


	me.countrySelectedId;
	me.orgUnitSelectedId;
	me.parents = [];

	me.userAccessableOrgUnits;
	
	me.countryOrgUnitId = "";
	
	me.orgUnitSearchRequests = [];
	me.orgUnitSearchParentsRequests = [];

	// ----------------------------------
	// Functions 


	me.isCase_ListAllPersonHistoricalEvents = function()
	{
		return me.listAllPersonHistoricalEventsTag.is( ":checked" );
	}
	
	me.isCase_SearchAllProgram = function()
	{
		return me.searchAllProgramTag.is( ":checked" );
	}

	me.getCountryId = function()
	{
		return me.countryOrgUnitId;
	}
				
	me.setCountryId = function( orgUnitId, ouParents )
	{
		me.countryOrgUnitId = "";

		var countryLevel = me.TabularDEObj.getCountryLevel();

		if ( countryLevel !== undefined )
		{
			if ( ouParents !== undefined )
			{
				$.each( ouParents, function( i, item )
				{
					if ( item.level == countryLevel )
					{
						me.countryOrgUnitId = item.id;
						
						return false;
					}
				});
			}
			else
			{
				$.get( me.queryURL_OrgUnit + orgUnitId + '.json?fields=ancestors[id,name,level]', function( json_data )
				{
					if ( json_data.ancestors !== undefined )
					{
						$.each( json_data.ancestors, function( i, item )
						{
							if ( item.level == countryLevel )
							{
								me.countryOrgUnitId = item.id;
								
								return false;
							}
						});
					}
				});
			}
		}
	}
	
	me.setOrgUnitTags = function( orgUnit, returnFunc ) 
	{
		me.retrieveOrgunitGroupList( orgUnit.id, function( json_ouGroupList ){
			me.orgUnitNameTag.val( orgUnit.name );
			me.orgUnitSelectedId = orgUnit.id;
			me.orgUnitSelected = orgUnit;
			me.orgUnitGroupIdList = json_ouGroupList;
			
			if( returnFunc !== undefined ) returnFunc();
			
			Util.paintClear( me.orgUnitNameTag );
		});
		
	}

	me.getOrgUnitId = function()
	{
		return me.orgUnitSelectedId;
	}

	me.getOrgUnit = function()
	{
		return me.orgUnitSelected;
	};
	
	me.hasOrgUnitGroup = function( ouGroupId )
	{
		var searched = Util.findItemFromList( me.orgUnitGroupIdList, "id", ouGroupId );
		return ( searched === undefined ) ? false : true;
	}

	me.retrieveUserAccessOrgUnits = function( execFunc )
	{
		DHISUtil.retrieveUserInfo( function( json_data )
		{
			me.userAccessableOrgUnits = json_data.organisationUnits;
			execFunc();
		});					
	}

	me.displayOrgUnitPersonCount = function( orgUnitId )
	{
		var personFoundCount = 0;

		// Set small page size since we only need number from total count
		
		var queryUrl = _queryURL_PersonQuery + ".json?skipPaging=true&fields=trackedEntityInstance&ou=" + orgUnitId;
						
		$.get( queryUrl, function( personList )
		{
			//me.json_PersonList = personList;

			if( personList !== undefined && personList.trackedEntityInstances !== undefined )
			{
				personFoundCount = personList.trackedEntityInstances.length;

				me.personFoundNoSpanTag.text( personFoundCount );
				me.personFoundNoSpanTag.attr( "title", "TEIs in OrgUnit: " + personFoundCount );
			}					
		});
	}

	me.clear_OrgUnitData = function()
	{
		delete me.orgUnitSelectedId;
		me.personFoundNoSpanTag.text( '' ).attr( "title", "" );	
		me.orgUnitMapSmall_DivTag.hide( '500' );
	}
	
	me.resetSetting_OrgUnitAndBelow = function()
	{
		me.orgUnitNameTag.val( '' );

		me.clear_OrgUnitData();

		me.setVisibility_Section( me.orgUnitRowTag, false );

		me.resetSetting_ProgramAndBelow();
	}

	me.resetSetting_ProgramAndBelow = function()
	{
		// program related reset
		me.programManager.resetSelectedProgram();

		me.defaultProgram_TEA_Manager.setProgramTrackedEntityAttributes( new Array() );
		me.defaultProgramNoteSpanTag.text( '' );

		// Should set as a function for reset
		me.setVisibility_Section( me.defaultProgramRowTag, false );	

		me.resetSetting_PeriodAndBelow();
	}


	me.resetSetting_PeriodAndBelow = function()
	{
		me.hidePeriodInputs();

		Util.paintAttention( me.defaultDateRowTag.find( 'input[type="radio"]' ).prop( 'checked', false ) );

		me.setVisibility_Section( me.defaultDateRowTag, false );	

		me.resetSetting_executeRetrieval();
		me.resetUnderPersonOptions();
		me.resetMainDataRelated();
	}


	me.resetSetting_executeRetrieval = function()
	{
		me.setVisibility_Section( me.defaultRetrievalRowTag, false );
	}


	me.resetUnderPersonOptions = function()
	{
		me.programStatusListTag.val( _status_ACTIVE );

		me.searchAllProgramTag.prop( 'checked', false );
		me.listAllPersonHistoricalEventsTag.prop( 'checked', false );
		
		me.setVisibility_Section( me.personEventSearchOptionsTag, false );
	}


	me.resetMainDataRelated = function()
	{
		me.setVisibility_MainSectionDiv( false );

		//json_PersonList = null;

		me.personList_DescSpanTag.html( "" );
		me.searchResultMsgRowTag.hide();
		me.searchResultMessageTag.text( "" );
	}


	me.setVisibility_Section = function( sectionTag, visible )
	{
		Util.disableTag( sectionTag, !visible );

		if( !visible )
		{
			sectionTag.slideUp( 400 );
		}
		else
		{
			sectionTag.slideDown( 400 );
		}
	}

	me.setVisibility_MainSectionDiv = function( visible )
	{
		me.TabularDEObj.hideMainSections();
		
		if ( visible )
		{
			me.TabularDEObj.showMainSection(); 
		}
	}


	me.showRetrievelButton = function()
	{
		me.setVisibility_Section( me.defaultRetrievalRowTag, true );
	}


	me.retrieveProgramPersonAttributeData = function( programId, returnFunc )
	{
		var programTrackedEntityAttributes = new Array();

		if ( programId != '' )
		{
			RESTUtil.getAsynchData( _queryURL_Program + programId + '.json?fields=id,programTrackedEntityAttributes[displayInList,allowFutureDate,mandatory,trackedEntityAttribute[id,name]]'
				, function( json_Program )
				{
					if ( json_Program.programTrackedEntityAttributes !== undefined )
					{
						$.each( json_Program.programTrackedEntityAttributes, function( i_attribute, item_attribute ) 
						{
							programTrackedEntityAttributes.push( { "id": item_attribute.trackedEntityAttribute.id, "name": item_attribute.trackedEntityAttribute.name, "mandatory": item_attribute.mandatory, "displayInList": item_attribute.displayInList } );
						});
					}

					returnFunc( programTrackedEntityAttributes );
				}
			);
		}
		else
		{
			returnFunc( programTrackedEntityAttributes );
		}
	}

	
	me.retrieveOrgunitGroupList = function( selectedOrgUnitId, returnFunc )
	{
		RESTUtil.getAsynchData( me.queryURL_OrgUnit + selectedOrgUnitId + '.json?fields=organisationUnitGroups[id]'
			, function( json_ouGroups )
			{
				returnFunc( json_ouGroups.organisationUnitGroups );
			}
		);
	}
	
	me.getEventQueryBaseUrl = function()
	{
		return _queryURL_EventQuery + '&programStatus=' + me.programStatusListTag.val();
	}

	me.getTEIFromEventQueryBaseUrl = function()
	{
		return _queryURL_TEIFromEventQuery + '&programStatus=' + me.programStatusListTag.val();
	}

	me.getSearchProgramStatus = function()
	{
		return me.programStatusListTag.val();
	}

	// ----------------------------------
	// Event related

	me.setUp_OrgUnitAutoSelection = function( orgUnitNameTag )
	{
		orgUnitNameTag.autocomplete( {
			source: 
				function( request, response ) 
				{
					orgUnitNameTag.removeClass( "ui-autocomplete-loading" );

					// Reset orgUnitSelectedId and below section
					me.orgUnitSelectionTreePopup.clearSelections();
					me.clear_OrgUnitData();
					me.resetSetting_ProgramAndBelow();

					me.orgUnitSearchRequests = FormUtil.abortAndClear_XhrRequest( me.orgUnitSearchRequests );
					me.orgUnitSearchParentsRequests = FormUtil.abortAndClear_XhrRequest( me.orgUnitSearchParentsRequests );
					
					
					var json_orgUnitList_new = new Array();


					if ( request.term.length >= 2 )
					{

						var xhr_ouSearch = RESTUtil.getAsynchData( me.queryURL_OrgUnitNameQuery + request.term
						, function( json_orgUnits ) 
						{

							var json_orgUnitList = json_orgUnits.organisationUnits;

							if( Util.checkDataExists( json_orgUnitList ) )
							{
								
								var deferredArrActions_ouAccessCheck = [];

								QuickLoading.dialogShowAdd( 'orgUnitLoading' );

								// Due to 'ancesters' and 'parents' compatibility, copy 'ancestors' data
								// into 'parents' and use 'parents' always.
								AppUtil.copyAncestorsToParents( json_orgUnitList );


								$.each( json_orgUnitList, function( i_ou, item_ou)
								{
									if ( item_ou.parents !== undefined )
									{
										if ( me.checkUserAccessable( item_ou.parents ) )
										{
											json_orgUnitList_new.push( me.getOUSelectionFormatted( item_ou, item_ou.parents ) );
										}
									}
									else
									{
										var xhr_parents = RESTUtil.getAsynchData( me.queryURL_OrgUnit + item_ou.id + '/parents.json?fields=name,id,level', function( json_orgUnitParents ) 
										{
											var ouParents = json_orgUnitParents.organisationUnits;
											if ( me.checkUserAccessable( ouParents ) )
											{
												json_orgUnitList_new.push( me.getOUSelectionFormatted( item_ou, ouParents ) );
											}
										}
										, function() {}
										);

										deferredArrActions_ouAccessCheck.push( xhr_parents );
										me.orgUnitSearchParentsRequests.push( xhr_parents );
									}
								});


								$.when.apply($, deferredArrActions_ouAccessCheck ).then( function( ) 
								{
									QuickLoading.dialogShowRemove( 'orgUnitLoading' );

									var json_orgUnitList_new_Sorted = Util.sortByKey( json_orgUnitList_new, "value" );

									response( json_orgUnitList_new_Sorted );
								});
							}
						}
						, function() {}
						, function() { QuickLoading.dialogShowAdd( 'orgUnitLoading' ); }
						, function() { QuickLoading.dialogShowRemove( 'orgUnitLoading' ); }
						);

						me.orgUnitSearchRequests.push( xhr_ouSearch );

					}
					else
					{
						response( json_orgUnitList_new );

						Util.paintAttention( orgUnitNameTag );
					}
				}
			,minLength: 0
			,delay: 800
			,select: 
				function( event, ui ) 
				{							
					me.parents = ui.item.parents;
					me.orgUnitSelectionTreePopup.selectOrgUnit( ui.item.orgUnit.id, ui.item.parents );
			
					// On select, set orgunit info and perform followup steps
					me.onOrgUnitSelect( ui.item.orgUnit );

					orgUnitNameTag.removeClass( "ui-autocomplete-loading" );
					orgUnitNameTag.autocomplete( "close" );
				}
		} );
	};
	
	me.checkUserAccessable = function( parentOUs )
	{
		var isUserAccessOU = false;

		if ( Util.checkValue( parentOUs ) )
		{
			$.each( parentOUs, function( i_parentOU, item_parentOU )
			{
				$.each( me.userAccessableOrgUnits, function( i_userOU, item_userOU)
				{
					if ( item_userOU.id == item_parentOU.id )
					{
						isUserAccessOU = true;
						return false;
					}
				});

				if ( isUserAccessOU ) return false;
			});
		}

		return isUserAccessOU;
	}


	me.getOUSelectionFormatted = function( item_ou, parents )
	{
		var itemLabel = item_ou.name + " ( lvl:" + item_ou.level;

		if ( Util.getNotEmpty( item_ou.code ).length > 0)
		{
			itemLabel += ", code:" + Util.getNotEmpty( item_ou.code );
		}

		itemLabel += " )";

		return { "id": item_ou.id, "label": itemLabel, "value": item_ou.name, "orgUnit": item_ou, "parents": parents  };
	}


	// On select, set orgunit info and perform followup steps
	me.onOrgUnitSelect = function( orgUnit, clearOu )
	{
		// When coming from orgUnitPopupTree selection, clear orgUnit Map data again.
		if ( clearOu !== undefined && clearOu )
		{
			me.clear_OrgUnitData();
			me.resetSetting_ProgramAndBelow();
		}


		var orgUnitId = orgUnit.id;

		// Set OrgUnit
		me.setOrgUnitTags( orgUnit, function(){
			
			me.setVisibility_Section( me.defaultProgramRowTag, true );


			// Re-retrieve the programManager based on the orgUnit
			me.programManager.loadProgramList( orgUnitId );


			// Set the country orgUnit <--- Send object...
			me.setCountryId( orgUnitId, orgUnit.parents );
			

			// Notify person count in the org unit
			me.displayOrgUnitPersonCount( orgUnitId );

			
			// Setup the orgUnit Map
			me.setUp_OrgUnitMap( orgUnitId );


			me.defaultProgramTag.focus();
		} );
	}

	// On reset orgunit, we need to remove the map from image, etc..

	me.setUp_OrgUnitMap = function( ouId )
	{
		// Get orgunit coordinate first
		RESTUtil.getAsynchData( me.queryURL_OrgUnit + ouId + '.json?fields=id,coordinates'
		, function( json_orgUnit ) 
		{
			if ( json_orgUnit.coordinates !== undefined )
			{
				var coordinatesData = $.parseJSON( json_orgUnit.coordinates );
				//[36.630948,-0.981278]

				if ( coordinatesData.length == 2 )
				{
					var longitude = coordinatesData[0];
					var latitude = coordinatesData[1];

					var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';

					mapUrl += 'zoom=9&size=120x80';

					mapUrl += '&markers=size:tiny%7Ccolor:blue%7Clabel:S%7C' + latitude + ',' + longitude;

					mapUrl += '&center=' + latitude + ',' + longitude;

					// Set the map info
					$( '#orgUnitMapImage' ).attr( 'src', mapUrl ).attr( 'lat', latitude ).attr( 'lng', longitude );

					me.orgUnitMapSmall_DivTag.show( '600' );
				}
			}

		}
		, function() 
		{
			console.log( 'Failed to retrieve the org unit - during org unit map setup' );
		});
	}

	me.setUp_OrgUnitMapClick = function( )
	{
		$( '#orgUnitMapAnchor' ).click( function()
		{
			var orgUnitMapPopupForm = me.TabularDEObj.orgUnitMapPopup;

			// Set the image first
			var mapImgTag = $( this ).find( 'img' );
			
			//console.log( 'mapImgTag: ' + mapImgTag.length );

			orgUnitMapPopupForm.setUp_Map( mapImgTag.attr( 'lat' ), mapImgTag.attr( 'lng' ) );
			
			orgUnitMapPopupForm.dialogFormTag.dialog( "open" );

			return false;
		});
	}


	me.setUp_orgUnitTreePopup = function( onOrgUnitSelectFunc )
	{
		me.orgUnitTreeBtnTag.click( function()
		{
			me.orgUnitSelectionTreePopup.openForm();

			//return false;
		});

		me.orgUnitSelectionTreePopup.onOrgUnitSelectSet( onOrgUnitSelectFunc );

	}


	me.setPeriod_DefaultDates = function( date )
	{
		// Set day
		//me.defaultDateTag.val( $.format.date( date, _dateFormat_YYYYMMDD ) );

		// Set Week
		$( '#defaultWeek' ).val( Weekly.getLastWeekStr( date ) );


		// Set Month
		Monthly.setDate( $( '#defaultMonth_Month' ), $( '#defaultMonth_Year' ), date );

		var yesterday = new Date( date.getFullYear(), date.getMonth(), date.getDate() - 1 );

		// Date Period
		me.defaultDateFromTag.val( $.format.date( yesterday, _dateFormat_YYYYMMDD ) );
		me.defaultDateToTag.val( $.format.date( yesterday, _dateFormat_YYYYMMDD ) );
	}


	me.setPeriod_Events = function()
	{
		// Setup click event
		$( "input[type='radio'][name='period']" ).click( function() 
		{
			me.hidePeriodInputs();

			var radioBtn = $( this ).attr( 'value' );

			
			if ( radioBtn == 'month' )
			{
				$( '#defaultMonth' ).show();
			}
			else if ( radioBtn == 'week' )
			{
				$( '#defaultWeek' ).show();
			}
			else if ( radioBtn == 'custom' )
			{
				$( '#defaultDatePeriod' ).show();
			}

			me.defaultDateType = radioBtn;

			// Enable the populate button since date has been changed..
			//me.setStatus_PopulateButton();

			if ( me.TabularDEObj.isCase_MEwR() ) 
			{
				me.setVisibility_Section( me.personEventSearchOptionsTag, true );
			}

			// Perform the retrieval action
			//me.performDataRetrieval();

			// Show Data
			me.showRetrievelButton();


			// Scroll right end
			AppUtil.pageHScroll( "Right" );
		});		


		$( "input[type='radio'][name='period']" ).keydown( function( event ) 
		{
			if ( event.keyCode == 13 )
			{
				$( this ).click();
			}
		});

	}

	me.hidePeriodInputs = function()
	{
		$( '#defaultMonth' ).hide();
		$( '#defaultWeek' ).hide();
		$( '#defaultDatePeriod' ).hide();
	}

	me.getDefaultStartDate = function()
	{
		var date;

		if ( me.defaultDateType  == 'day' )
		{
			date = Util.getDate_FromYYYYMMDD( $( '#defaultDate' ).val() );
		}
		else if ( me.defaultDateType  == 'week' )
		{
			date = Weekly.getStartDate( $( '#defaultWeek' ).val() );
		}
		else if ( me.defaultDateType  == 'month' )
		{
			date = Monthly.getStartDate( $( '#defaultMonth_Month' ), $( '#defaultMonth_Year' ) );
		}
		else if ( me.defaultDateType  == 'custom' )
		{
			date = Util.getDate_FromYYYYMMDD( $( '#defaultDateFrom' ).val() );
		}
		
		return date;
	}


	me.getDefaultEndDate = function()
	{
		var date;

		if ( me.defaultDateType  == 'day' )
		{
			date = Util.getDate_FromYYYYMMDD( $( '#defaultDate' ).val() );
		}
		else if ( me.defaultDateType  == 'week' )
		{
			date = Weekly.getEndDate( $( '#defaultWeek' ).val() );
		}
		else if ( me.defaultDateType  == 'month' )
		{
			date = Monthly.getEndDate( $( '#defaultMonth_Month' ), $( '#defaultMonth_Year' ) );
		}
		else if ( me.defaultDateType  == 'custom' )
		{
			date = Util.getDate_FromYYYYMMDD( $( '#defaultDateTo' ).val() );
		}
						
		return date;
	}


	me.setDefaultDatePeriod_Related = function()
	{

		// Set Default Date RadioButton as 'Date'
		$( "input[type='radio'][name='period'][value='day']" ).prop('checked', true );
		me.defaultDateType  = 'day';
		$( '#defaultDate' ).show();
		
		// Set up the weekly date picker control
		Weekly.setWeekPicker( $( '#defaultWeek' ), me.showRetrievelButton );


		// Monthly Select List populate and event set.
		Monthly.populateMonthYear( $( '#defaultMonth_Month' ), $( '#defaultMonth_Year' ) );


		// Set the Default Date as today
		me.setPeriod_DefaultDates( _today );


		// ------------------------
		// Events Related

		me.setPeriod_Events();


		// On Date picker Selection, enable/disable Populate button depending on chocies
		Util.setupDatePicker( $( '.defaultDatePicker' ), function() 
		{
			//me.performDataRetrieval();
			me.showRetrievelButton();
		} );				


		// On Month/Year selection, Populate Option Checkbox selectoin, enable/disable Populate button depending on chocies
		$( '#defaultMonth_Month, #defaultMonth_Year' ).change( function() 
		{
			//me.performDataRetrieval();

			me.showRetrievelButton();

			// Enable the populate button since date has been changed..
			//me.setStatus_PopulateButton();					
		});

	}


	me.setDefaultProgramTag_Change = function()
	{

		me.defaultProgramTag.change( function() 
		{
			me.programTagOnChange();
		});
	}


	me.programTagOnChange = function( exeFunc )
	{
		me.programManager.resetSelectedProgram();

		me.defaultProgramNoteSpanTag.text( '' );

		me.resetSetting_PeriodAndBelow();

		var selectedProgramId = me.defaultProgramTag.val();
		me.programManager.setSelectedProgram( selectedProgramId );

		if( selectedProgramId == '' )
		{
			me.defaultProgramNoteSpanTag.text( '*Please select a program.' );
			Util.paintAttention( me.defaultProgramTag );
			if( exeFunc != undefined ) exeFunc();

			//me.setStatus_PopulateButton();					
		}
		else
		{

			Util.paintClear( me.defaultProgramTag );
		
			me.setVisibility_Section( me.defaultDateRowTag, true );

			DialogLoading.openWithCallback( function()
			{ 

				var selectedProgram = me.TabularDEObj.getSelectedProgram();


				// Preload program stage data elements data before actual loading of events list.
				me.preloadProgramStageDataElementsData( selectedProgramId );


				// Store the person attributes of the program - to be placed in person table columns (th)
				me.retrieveProgramPersonAttributeData( selectedProgramId
					, function( programTrackedEntityAttributes )
					{
						me.defaultProgram_TEA_Manager.setProgramTrackedEntityAttributes( programTrackedEntityAttributes );
					
						// If the selected program does not have 
						if ( me.TabularDEObj.isCase_MEwR() && programTrackedEntityAttributes.length == 0 )
						{
							alert( $( 'span.msg_NoProgramAttributes' ).text() );
							Util.paintAttention( me.defaultProgramTag );
						}
						else
						{
							me.defaultProgramNoteSpanTag.text( '' );
							Util.paintClear( me.defaultProgramTag );

							// Reset PersonList Table Structure/Data and populate the header + one empty row..

							// Reset the list of person  <-- Default Program selection will do this instead.
							me.TabularDEObj.resetMainList();


							// Make the person Main section visible
							//me.setVisibility_MainSectionDiv( true );
						}


						//me.setStatus_PopulateButton();

						DialogLoading.close();

						//me.defaultProgramTag.focus();

						$( 'input:radio[name="period"]')[0].focus();

						if( exeFunc != undefined ) exeFunc();
					}

				);
		

			});

		}
	};
	
	me.setUp_SearchOptions_Change = function()
	{

		$( '#' + me.searchAllProgramTag.attr( 'id' ) 
			+ ', #' + me.programStatusListTag.attr( 'id' ) 
			+ ', #' + me.listAllPersonHistoricalEventsTag.attr( 'id' ) 
		).change( function() 
		{
			//me.showRetrievelButton();
			me.performDataRetrieval();
		});
	}


	me.performDataRetrieval = function( exeFunc )
	{
		me.resetMainDataRelated();
	
		if ( me.TabularDEObj.isCase_SEwoR() )
		{
			me.TabularDEObj.retrieveAndPopulateEvents( me.TabularDEObj.personList.personEvent.mainEventTableTag, function( eventFoundNo )
			{

				me.searchResultMsgRowTag.show();
				me.searchResultMessageTag.text( "Found " + eventFoundNo + " event(s) for period from " + $.format.date( me.getDefaultStartDate(), "dd/MM/yyyy" ) + " to " + $.format.date( me.getDefaultEndDate(), "dd/MM/yyyy" ) + " at " + me.orgUnitNameTag.val() );
				
				if( exeFunc != undefined ) exeFunc();
			});
			
			me.TabularDEObj.retrieveAndPopulateDataSetValuesIfAny();

		}
		else
		{
			me.TabularDEObj.populatePersonData( function( personFoundNo )
			{
				me.searchResultMsgRowTag.show();
				me.searchResultMessageTag.text( "Found " + personFoundNo + " client(s) with at least one event for period from " + $.format.date( me.getDefaultStartDate(), "dd/MM/yyyy" ) + " to " + $.format.date( me.getDefaultEndDate(), "dd/MM/yyyy" ) + " at " + me.orgUnitNameTag.val() );	
				
				if( exeFunc != undefined ) exeFunc();
			});
			
			me.TabularDEObj.dataSetValues.resetDataSetForm();
		}


		me.setVisibility_MainSectionDiv( true );
	
	}


	me.preloadProgramStageDataElementsData = function( programId )
	{
		// Run below to PRELOAD Data Elements of Stages before the actual person data retrieval.
		//	- Since Below has memory loading - remembers for the loaded data.
		var programStageList = me.programManager.getProgramStageList( programId );

		if ( programStageList !== undefined )
		{
			$.each( programStageList, function( i_programStage, item_programStage )
			{
				me.TabularDEObj.dataInMemory.retrieveProgramStageData_WithDataElementsAndOptionSets( item_programStage.id );
			});
		}
	}


	// --------------------------
	// On Init Setup Method	

	me.initialSetup = function()
	{
		// Set OrgUnit Auto Selection
		me.setUp_OrgUnitAutoSelection( me.orgUnitNameTag );

		me.retrieveUserAccessOrgUnits( function()
		{
			me.orgUnitRowTag.show();
			Util.paintAttention( me.orgUnitNameTag );
			me.orgUnitNameTag.focus();
		});


		// Set Event for Default Program Change
		me.setDefaultProgramTag_Change();

		// Set Default Date Period Related Initial/Event Set
		me.setDefaultDatePeriod_Related();


		// Added new.
		me.executeRetrievalTag.click( function()
		{
			me.performDataRetrieval();

			// Scroll left end
			AppUtil.pageHScroll( "Left" );
		});


		me.setUp_SearchOptions_Change();
		
		me.setUp_OrgUnitMapClick();

		me.setUp_orgUnitTreePopup( me.onOrgUnitSelect );
	}

	// --------------------------
	// Run methods

	// Initial Setup Call
	me.initialSetup();
}

