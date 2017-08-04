
// -------------------------------------------
// Class - PersonList
//		Add 'Person' class and 'Event' class to add all the related methods to them.
//		* Should have created each person object instance.
//			- Seperate by instance storage and presentation of each
//		But for now, we keep the event info in each html row

function PersonList( TabularDEObj )
{
	var me = this;

	me.TabularDEObj = TabularDEObj;

	me._TEISearchMaxAllowed = 100;

	me.mainPersonTableTag =  $( '#mainTable_Person' );
	me.mainPersonSectionTag =  $( '#mainSection_Person' );

	me.personAddNewRowTag = $( '.person_addNewRow' );

	me.personDialogForm = new PersonDialogForm( me.TabularDEObj );

	me.personEvent = new PersonEvent( me.TabularDEObj, me.mainPersonTableTag );

	me.json_PersonList_EventDateChecked;

	me.attr_PersonRowNo = "personrowno";
	me.attr_doneStages = 'done_stages';

	me.trTemplate_PersonHeaderTr = "<tr class='trPersonHeader'>"
									+ "<th class='blank' width='23px'>&nbsp;</th>"
									+ "</tr>"; 
	
	me.trTemplate_PersonRow = "<td DEID='personDetailToggle'><input type='image' class='personRowDelete dimImgWHover' alt='Delete Row' title='Delete Row' src='img/cross.png' style='border: 0px solid;' /><a class='detailToggle' href='' style='display:none;'>[+]</a></td>";

	me.itemTemplate_PersonInputAndInfo = "<input type='text' class='personSelect jq_watermark' placeholder='" + l10n.get('searchOrAddPerson') + "' size='25' />"
							+ "<button type='button' class='personInfo button smallRoundButton' infoType='" + me.personDialogForm.type_New + "' style='display:none; margin:2px 4px 2px 3px; font-size: 11px;' ><span nameId='AddPerson'>" + l10n.get('addPerson') + "</span></button>"
							+ "<button type='button' class='personInfo button smallRoundButton' infoType='" + me.personDialogForm.type_Exist + "' style='display:none; margin:2px 4px 2px 3px; font-size: 11px;' ><span nameId='UpdatePerson'>" + l10n.get('updatePerson') + "</span></button>"
							+ "<span class='personEventCountSec' style='display:none;color:#CCCCCC;font-size:9px;'>&nbsp;<span class='personEventCount'></span></span>";

	me.trTemplate_PersonDetail = "<td class='blank' colspan='0'></td>";

	me.trGeneratedTemplate = "";

	me.personSearchRequests = [];


	// ----------------------------------
	// Functions

	me.hideMainSections = function()
	{
		me.mainPersonSectionTag.hide();
		me.personEvent.mainEventSectionTag.hide();
	}

	me.showMainSection = function()
	{
		if ( me.TabularDEObj.isCase_MEwR() )
		{
			me.mainPersonSectionTag.show( 200 );
		}
		else if ( me.TabularDEObj.isCase_SEwoR() )
		{
			me.personEvent.mainEventSectionTag.show( 200 );
		}
	}


	me.resetMainList = function()
	{
		if ( me.TabularDEObj.isCase_MEwR() )
		{
			me.resetPersonList();
		}
		else if ( me.TabularDEObj.isCase_SEwoR() )
		{
			me.personEvent.resetEventList();
		}
	}

	me.clearPersonList = function( tableTag )
	{
		me.clearPersonTableRows( tableTag );

		// even clear headers - since we need to regenerate based on changed program attributes (displayed ones)
		tableTag.find( "tr" ).remove();
	}


	me.resetPersonList = function()
	{
		me.clearPersonList( me.mainPersonTableTag );

		// Remove the saved Tr Template
		me.trGeneratedTemplate = "";

		// Add Header 
		me.createPersonTableHeaders( me.TabularDEObj.getProgramTrackedEntityAttributes() );

		me.addInitialRow();
	}

	me.clearPersonTableRows = function( tableTag )
	{
		// Clear all the person list & their events
		tableTag.find( ".tbStyle_PersonDetail" ).remove();
		tableTag.find( "tr.trPerson, tr.trPersonDetail" ).remove();  // since we now have dynamic header
	}

	me.addInitialRow = function()
	{
		// TODO: call this method from a class...
		// Initial first blank row add
		me.addNewLastRow_Person( me.mainPersonTableTag );
	}

	me.getNewPersonRowCount = function( mainPersonTable )
	{
		var rowCount;

		var lastPersonRow = mainPersonTable.find( "tr.trPerson:last" );

		if ( lastPersonRow.length == 0 )
		{
			rowCount = 1;
		}
		else
		{
			var rowCount = parseInt( lastPersonRow.attr( me.attr_PersonRowNo ) ) + 1;
		}

		return rowCount;
	}


	// ---------
	// Set Person Table Header/Row/Data Related

	me.createPersonTableHeaders = function( programTrackedEntityAttributes )
	{
		
		me.mainPersonTableTag.append( me.trTemplate_PersonHeaderTr );

		var personTableHeader = me.mainPersonTableTag.find( 'tr.trPersonHeader' );

		var i_attributeCount = 0;

		// For each person attributes, add the person table column
		$.each( programTrackedEntityAttributes, function( i_attribute, item_attribute )
		{
			if ( item_attribute.displayInList )
			{
				personTableHeader.append( "<th class='orig' type='header_attribute_" + i_attributeCount + "' attributeid='" + item_attribute.id + "'>" + item_attribute.name + "</th>" );
				// "' style='max-width: 140px;'

				i_attributeCount++;
			}
		});


		// Add the last org info - the org the person belongs to. ID gets populated later
		personTableHeader.append( "<th class='orig' type='homeUnit' orguintid=''>" + l10n.get('homeUnit') + "</th>" );
	}


	me.createPersonTableRows = function( mainPersonTable, programTrackedEntityAttributes )
	{
		var trString = "";

		if ( Util.checkValue( me.trGeneratedTemplate ) )
		{
			trString = me.trGeneratedTemplate;
		}
		else
		{
			trString = me.trTemplate_PersonRow;

			var i_attributeCount = 0;

			// For each person attributes, add the person table column
			$.each( programTrackedEntityAttributes, function( i_attribute, item_attribute )
			{
				
				if ( item_attribute.displayInList )
				{

					var tdStr = "";

					if ( i_attributeCount == 0 )
					{
						tdStr = "<td type='attribute_" + i_attributeCount + "' attributeid='" + item_attribute.id + "' style='white-space: nowrap;' class='tdPersonInfo'>" + me.itemTemplate_PersonInputAndInfo + "</td>";

						// Enter text here for search or ...
					}
					else
					{
						tdStr = "<td type='attribute_" + i_attributeCount + "' attributeid='" + item_attribute.id + "' class='tdPersonInfo'></td>";
					}
					
					trString += tdStr;

					i_attributeCount++;
				}
			});


			// Add the last org info - the org the person belongs to. ID gets populated later
			trString += "<td type='homeUnit'></td>" ;

			me.trGeneratedTemplate = trString;
		}


		// Append the generated Tr info - * Use 'document.createElement()' to speed up.
		mainPersonTable.append( $( document.createElement( "tr" ) ).attr( 'class', 'trPerson' ).attr( 'done_stages', '' ).append( trString ) );
		
		
		var lastPersonRow = mainPersonTable.find( 'tr.trPerson:last' );

		// Add row delete event handler
		
		lastPersonRow.find( '.personRowDelete').click( function() 
		{
			var trCurrent = $( this ).closest( 'tr' );

			// Actually, this does not exists..
			var nextFocusTag = trCurrent.next( 'trPerson' );// Util.getNextRowFocus_Person( trCurrent );

			Util.setRowRemoval( trCurrent );

			( nextFocusTag.length == 1 ) ? nextFocusTag.focus() : me.personAddNewRowTag.focus();

			// Scroll to the bottom.
			$('html, body').scrollTop( $(document).height() );

		});

		return lastPersonRow;
	}


	me.populatePersonAttirbutesToRow = function( trCurrent, attributes )
	{
		if ( attributes !== undefined )
		{

			$.each( attributes, function( i_attribute, item_attribute )
			{

				var currentTd = trCurrent.find( "td[attributeid='" + item_attribute.attribute + "']" );

				if ( currentTd.length > 0 )
				{
					var inputField = currentTd.find( 'input' );

					var attributeValue = FormUtil.getFormattedAttributeValue( item_attribute );

					if ( inputField.length > 0 )
					{
						inputField.val( attributeValue );
					}
					else
					{
						// TODO: Need to get the display value of each attribue..
						currentTd.html( '<span>' + attributeValue + '</span>' );
					}
				}
				
			});
		}
	}

	// Set Person Table Header/Row/Data Related
	// ---------


	// -- Row Manipulation (Add/Remove) ----
	me.addNewLastRow_Person = function( mainPersonTable )
	{
		var newRowCount = me.getNewPersonRowCount( mainPersonTable );

		// Add 2 Rows (Person + PersonDetail)
		// Person Row Add
		var trCurrent = me.addPersonRow( mainPersonTable, newRowCount );

		// --- Set events ---
		me.personAutoSelection( trCurrent.find( '.personSelect' ) );
		
						
		// Person Detail Row Add - empty row		
		var trPersonDetail = me.addPersonDetailRow_Empty( mainPersonTable, trCurrent );

		return trCurrent;
	}


	me.addPersonRow = function( mainPersonTable, newRowCount )
	{
		
		var lastPersonRow = me.createPersonTableRows( mainPersonTable, me.TabularDEObj.getProgramTrackedEntityAttributes() );

		lastPersonRow.attr( me.attr_PersonRowNo, newRowCount );

		// Add dialog click event
		lastPersonRow.find( ".personInfo" ).hide().click( function() {
			me.personInfoPopup( $( this ) );
		});

		return lastPersonRow;
	}


	me.personInfoPopup = function( personInfoTag, afterSaveAction )
	{
		// Check the Default Program selection.
		// For new user case, alert if not selected
		var formType = personInfoTag.attr( "infoType" );

		var trCurrent = personInfoTag.closest("tr");
		var defaultProgramId = me.TabularDEObj.getSelectedProgramId();

		if ( formType == me.personDialogForm.type_New && !Util.checkValue( defaultProgramId ) )
		{
			// If the person form Type is 'New', but default Program is not selected,
			// Ask users to select one.
			alert( $( 'span.msg_SelectDefaultProgram' ).text() );
		}
		else
		{
			DialogLoading.openWithCallback( function()
			{ 								
				me.personDialogForm.openForm( trCurrent, formType, function()
				{
					DialogLoading.close();
				}
				, function()
				{
					if ( afterSaveAction !== undefined ) afterSaveAction();							
				});
			}
			);
		}
	}


	me.addPersonDetailRow_Empty = function( mainPersonTable, trPerson )
	{
		mainPersonTable.append( $( document.createElement( "tr" ) ).attr( 'class', 'trPersonDetail' ).attr( 'style', 'display:none;' ).append( me.trTemplate_PersonDetail ) );


		var personDetailRowCurrent = mainPersonTable.find( 'tr.trPersonDetail:last' );

		var personTableColumnNo = me.TabularDEObj.getInDisplayListCount() + 2;

		personDetailRowCurrent.find( 'td.blank' ).attr( 'colspan', personTableColumnNo );


		return personDetailRowCurrent;
	}


	// Functions
	// ----------------------------------


	// -- Person Auto Selected Related -------------------
	// ---------------------------------------------------

	me.personAutoSelection = function( el )
	{
		var trPersonTable = el.closest( "table" );
		var trCurrent = el.closest( "tr.trPerson" );

		el.autocomplete( {
			source: 
				function( request, response ) 
				{
					me.clearColor_duplicatePersonWarning( trPersonTable );

					// Clear the info
					me.setPersonInfoRow( trCurrent );

					// Hide the person detail row if expanded.
					Util.toggleTarget( trCurrent.find( '.detailToggle' ), trCurrent.next(), false );

					me.personSearchRequests = FormUtil.abortAndClear_XhrRequest( me.personSearchRequests );

					var json_persons_new = new Array();


					if ( request.term.length >= 2 )
					{
						var attribute0_id = me.getAttributeIdIfExists( trCurrent, 'attribute_0' );
						var attribute1_id = me.getAttributeIdIfExists( trCurrent, 'attribute_1' );

						if ( !Util.checkValue( attribute0_id ) ) 
						{
							el.removeClass( "ui-autocomplete-loading" );

							alert( $( 'span.msg_ProgramAttributeAtLeast' ).text() );
						}
						else
						{
							// ou Added for the limited feature..
							var requestUrl = _queryURL_PersonQuery + ".json?filter=" + attribute0_id + ":LIKE:" + request.term + "&ouMode=DESCENDANTS&ou=" + me.TabularDEObj.searchPanel.getCountryId();

							// Step 0. Check the search count first!!
							me.checkSearchMaxLimit( requestUrl, function( pass ) {

								if ( !pass )
								{
									el.removeClass( "ui-autocomplete-loading" );

									response( json_persons_new );
								}
								else
								{
									requestUrl += '&skipPaging=true';

									// Step 1. Search Person  --- TODO: do the loading message?
									var xhr_personSearch = RESTUtil.getAsynchData( requestUrl
									, function( json_Persons )
									{
										if( json_Persons.trackedEntityInstances !== undefined )
										{
											$.each( json_Persons.trackedEntityInstances, function( i, item_Person ) 
											{
												var attribute_first = Util.getFromList( item_Person.attributes, attribute0_id, "attribute" );

												var attributesLongDesc = attribute_first.value; 

												if ( Util.checkValue( attribute1_id ) ) 
												{
													var attribute_second = Util.getFromList( item_Person.attributes, attribute1_id, "attribute" );

													if ( attribute_second !== undefined )
													{
														attributesLongDesc += ', ' + attribute_second.value;
													}
												}

												json_persons_new.push( { "id": item_Person.trackedEntityInstance, "label": attributesLongDesc, "value": attribute_first.value } );

											});
										}
										
										response( Util.sortByKey( json_persons_new, 'label', true ) );
									}
									, function() {}
									, function() {}
									, function() { el.removeClass( "ui-autocomplete-loading" ); }
									);

									me.personSearchRequests.push( xhr_personSearch );
								}	
							});
						}	
					}
					else
					{
						el.removeClass( "ui-autocomplete-loading" );

						response( json_persons_new );
					}
				}
			,minLength: 0
			,delay: 800
			,select: 
				function( event, ui ) {

					el.removeClass( "ui-autocomplete-loading" );
					el.autocomplete( "close" );

					if( me.checkPersonExistInList( ui.item.id, el, trPersonTable ) )
					{
						$( this ).val( '' );
						return false;
					}
					else
					{
						DialogLoading.openWithCallback( 
							function()
							{ 
								me.getPersonById( ui.item.id, function( item_Person )
								{
									me.setPersonInfoRow( trCurrent, item_Person );

									me.populateAndSet_PersonDetailSection( trCurrent, trCurrent.next(), item_Person );

									DialogLoading.close();

									// Open up the Detail Part
									Util.toggleTarget( trCurrent.find( '.detailToggle' ), trCurrent.next() );
								});											
							}
						);
					}
				}
		} );
	}


	me.checkSearchMaxLimit = function( requestUrl, successFunc )
	{
		requestUrl += "&skipPaging=false&pageSize=1&totalPages=true&fields=trackedEntityInstance";

		RESTUtil.getAsynchData( requestUrl, function( jsonData )
		{
			if ( jsonData.pager !== undefined && jsonData.pager.total !== undefined )
			{
				var totalCount = jsonData.pager.total;

				if ( totalCount > me._TEISearchMaxAllowed )
				{
					alert( 'The search found too many result: ' + totalCount + ' (Max ' + me._TEISearchMaxAllowed + ').  Please add more detail to the search.' );
					successFunc( false );
				}
				else
				{
					successFunc( true );
				}
			}

		});
	}


	me.getPersonById = function( personId, execFunc )
	{
		PersonUtil.getPersonByID_Reuse( personId, function( item_person )
		{
			execFunc( item_person );
		});
	}


	me.getPerson_WithDoneStage = function( personId, execFunc )
	{
		PersonUtil.getPersonByID_Reuse( personId, function( item_person )
		{
			me.retrieveAndSetDoneProgramStages( item_person, function()
			{
				execFunc( item_person );
			});
		});
	}

	me.checkPersonExistInList = function( personId, currentInputTag, tableTag )
	{
		var existsAlready = false;

		var foundPersonTrTag = tableTag.find( 'tr.trPerson[uid="' + personId + '"]' );

		if ( foundPersonTrTag.length > 0 )
		{
			//Util.paintWarning( currentInputTag );
			Util.paintAttention( foundPersonTrTag.find( 'input.personSelect' ) );

			alert( $( 'span.msg_SamePersonInList' ).text() );

			existsAlready = true;
		}

		return existsAlready;
	}


	me.clearColor_duplicatePersonWarning = function( tableTag )
	{
		Util.paintClear( tableTag.find( 'input.personSelect' ) );
	}


	me.getAttributeIdIfExists = function( trCurrent, attributeNo )
	{
		var attributeId = '';

		var tdAttribute = trCurrent.find( "td[type='" + attributeNo + "']" );
		if ( tdAttribute.length == 1 )
		{
			attributeId = tdAttribute.attr( 'attributeid' );
		}
		
		return attributeId;
	}

	me.getAttributeValueById = function( attributes, attributeId )
	{
		var attributeValue = "";

		for (i = 0; i < attributes.length ;i++ )
		{
			if ( attributes[i].attribute == attributeId )
			{
				attributeValue = FormUtil.getFormattedAttributeValue( attributes[i] );

				break;
			}
		}

		return attributeValue;
	}

	me.getHeaderAttributeIndex = function( headers, attributeId )
	{
		var foundIndex;

		if ( attributeId != "" )
		{
			for ( i = 0; i < headers.length; i++ )
			{
				if ( headers[i].name == attributeId )
				{
					foundIndex = i;
					break;
				}
			}
		}

		return foundIndex;
	}



	me.setPersonInfoRow = function( trCurrent, item_Person )
	{

		// Initialize person event count
		me.setPersonEventCount( trCurrent );

		// Hide the buttons and images
		trCurrent.find( ".personInfo" ).hide();


		if( Util.checkDefined( item_Person ) )
		{
			var personId = item_Person.trackedEntityInstance;

			trCurrent.attr( 'uid', personId );
			trCurrent.next().attr( 'uid', personId );

			// set 'doneStage' attribute data
			if ( item_Person.doneStages !== undefined )
			{
				trCurrent.attr( me.attr_doneStages, item_Person.doneStages );
			}


			// Display Person Info Image Button
			trCurrent.find( ".personInfo[infoType='" + me.personDialogForm.type_Exist + "']" ).show();


			// Populate the person Attribute info.
			me.populatePersonAttirbutesToRow( trCurrent, item_Person.attributes );


			// Set person Home Unit - org Unit
			if ( Util.checkDefined( item_Person.orgUnit ) )
			{
				me.TabularDEObj.dataInMemory.retrieveOrgUnitName( item_Person.orgUnit, function( json_OrgUnit )
				{
					trCurrent.find( "td[type='homeUnit']" ).text( json_OrgUnit.name );
				});
			}


			// Hide row delete
			trCurrent.find( '.personRowDelete' ).hide();

			var trDetailRow = trCurrent.next();
		

			// When toggling anchor, show/hide the event list
			trCurrent.find( '.detailToggle' ).show().off( 'click' ).click( function() {
				
				Util.toggleTarget( $( this ), trDetailRow );


				// If event section is not setup/populated, create Table and load data, event setup
				var populateStatus = trDetailRow.attr( 'populateStatus' );

				// If it is not populated already, add table and populate event
				if ( !( Util.checkValue( populateStatus ) && populateStatus == 'Y' ) )
				{	
					// Populate table.
					me.populateAndSet_PersonDetailSection( trCurrent, trDetailRow, item_Person );
				}
				
				return false;
			} );


			// Set up the event count on the row
			if ( Util.checkDefined( item_Person.eventRows ) )
			{
				me.setPersonEventCount( trCurrent, item_Person.eventRows.length );
			}

			/*
			// TODO: Currently do not use this, but when opening the events, we need to use this?
			if( Util.checkDefined( json_Events_Data ) )
			{
				me.personEvent.populateEvents( trCurrent, trDetailRow.find( ".tbStyle_PersonDetail" ), json_Events_Data );
			}
			*/

		}
		else
		{
			// Clear person data
			// Attributes
			trCurrent.find( "td[type^='attribute_']" ).each( function()
			{
				var tdTag = $( this );
				if ( tdTag.attr( 'type' ) != 'attribute_0' )
				{
					tdTag.text( '' );
				}
			});

			// Remove 'doneStage' data
			trCurrent.attr( me.attr_doneStages, '' );

			trCurrent.attr( 'uid', '' );

			// Home Unit
			trCurrent.find( "td[type='homeUnit']" ).text( '' );


			if( trCurrent.find( ".personSelect" ).val() != "" )
			{
				trCurrent.find( ".personInfo[infoType='" + me.personDialogForm.type_New + "']" ).show();
			}


			// Show row delete
			trCurrent.find( ".personRowDelete" ).show();

			// Add Person Detail Toggle Anchor
			trCurrent.find( ".detailToggle" ).hide();
			
			// Add Event to the created toggle anchor
			//trCurrent.find(".detailToggle").click( personDetailToggle );
		}
	}


	me.setPersonEventCount = function( trPersonRow, count )
	{
		var personEventCountSecTag = trPersonRow.find( '.personEventCountSec' );
		var personEventCountTag = trPersonRow.find( '.personEventCount' );

		if ( count === undefined )
		{
			// Initialize
			personEventCountSecTag.hide();
			personEventCountTag.text( '' );
		}
		else
		{
			// Initialize
			personEventCountSecTag.show();
			personEventCountTag.text( count ).attr( 'title', 'Event Count' );
		}
	}


	me.populateAndSet_PersonDetailSection = function( trPersonRow, trDetailRow, item_Person )
	{
		var tdDetailSection = trDetailRow.find( 'td.blank' );
		var personId = item_Person.trackedEntityInstance;


		tdDetailSection.html( '' ).append( "<div class='divPersonDetail'><table class='tbStyle_PersonDetail'>"
									+ "<tr class='trEventHead'>"
										+ "<th class='orig'><span nameId='EventTableHeader_Date_OrgUnit'>" + l10n.get('dateOrgunit') + "</span></th>"
										+ "<th class='orig'><span nameId='EventTableHeader_Program_Stage'>" + l10n.get('programAndStage') + "</span></th>"
										+ "<th class='orig' align='center'><span nameId='EventTableHeader_Status'>" + l10n.get('status') + "</span></th>"
										+ "<th class='orig' type='delete'>&nbsp;</th>"
									+ "</tr>"
								+ "</table>"
								+ "<div class='divAddEvent' style='margin:2px 1px 4px 20px;'><span><button type='button' class='personEvent_addNewRow BlueButton' style='display:none; font-size:11px;'><span nameId='AddNewEventRow'>" + l10n.get('addEvent') + "</span></button></span><span style='width:24px;'>&nbsp;</span></div></div>" );


		var tbEvent = trDetailRow.find( '.tbStyle_PersonDetail' );
		var addNewEventRowButton = trDetailRow.find( '.personEvent_addNewRow' );


		// Set events on Person Detail seciton
		me.setEvents_PersonDetailRow( trPersonRow, tbEvent, addNewEventRowButton );


		// Populate the event data..
		var divPersonDetailTag = tdDetailSection.find( '.divPersonDetail' );
		

		me.personEvent.populateEventsByPersonId( personId, trPersonRow, divPersonDetailTag, function( json_Events )
		{
			
			// Show 'Add new event' button if Active program
			if ( me.TabularDEObj.getSearchProgramStatus() == _status_ACTIVE )
			{
				addNewEventRowButton.show();
			}

			// * After populating event data, Set 'DoneStage'
			me.setDoneStageRelated( item_Person, trPersonRow, function( doneStages )
			{
				// For already populated events case, if there is 'add new'
				// row added, remove the stage.
				me.personEvent.removeFromStageList( divPersonDetailTag.find( 'select.eventStage' ), doneStages );					
			});


			// Set event count update
			me.setPersonEventCount( trPersonRow, json_Events.length );

		});	

		// Set as populated
		trDetailRow.attr( 'populateStatus', 'Y' );			
	}


	// ------ Done Stages Related - BEGIN ------

	me.setDoneStageRelated = function( item_Person, trPersonRow, execFunc )
	{
		var divAddEvent = trPersonRow.next().find( ".divAddEvent" );

		// Disable the row 'add Event' button.. Initially..
		FormUtil.setTagAsWait( divAddEvent );

		// For Person, do event search for 'done' program stage (for non-repeatable)
		me.retrieveAndSetDoneProgramStages( item_Person, function()
		{
			if ( item_Person.doneStages !== undefined )
			{
				trPersonRow.attr( me.attr_doneStages, item_Person.doneStages );
			
				execFunc( trPersonRow.attr( me.attr_doneStages ) );
			}

			// Enable the row 'add Event' button..
			FormUtil.setTagAsWait_Clear( divAddEvent );
		});
	}

	me.addTo_DoneStage = function( trPersonRow, stageId )
	{
		var doneStages_Existing = trPersonRow.attr( me.attr_doneStages );
		
		if ( doneStages_Existing === undefined )
		{
			trPersonRow.attr( me.attr_doneStages, stageId + ';' );
		}
		else
		{
			trPersonRow.attr( me.attr_doneStages, doneStages_Existing + stageId + ';' );
		}
	}


	// ------ Done Stages Related - END ------


	me.setEvents_PersonDetailRow = function( trPerson, tbEvent, addNewEventRowButton )
	{
		
		//me.personEvent.addNewLastRow_Event( trPerson, tableCurrent, me.TabularDEObj.getSelectedProgramId() );

		// Set event handler for 'add new event row' button
		addNewEventRowButton.click( function() 
		{ 
			var eventDate = me.personEvent.addNewLastRow_Event( trPerson, tbEvent, me.TabularDEObj.getSelectedProgramId() );

			eventDate.focus();
		});
	}


	// -----
	// Populate Person Method.

	me.populatePersonData = function( returnFunc )
	{
		var tableTag = me.mainPersonTableTag;

		// Step 1. Clear the person/event data table
		me.clearPersonTableRows( tableTag );

			
		// Step 2. Retrieve person and events.
		me.TabularDEObj.retreivePersonListWithEvents( function( json_PersonEventsList )
		{

			// If there were no event, simply add one empty row.
			if ( json_PersonEventsList.length == 0 )
			{
				me.addNewLastRow_Person( tableTag );
				returnFunc( 0 );
			}
			else
			{
				// Retrieve each person information, sort them by first attribute, and display as person row.

				// Step 3. Sort the person by the first attribute
				var firstAttribute = me.TabularDEObj.getFirstDisplayAttribute();
				
				PersonUtil.setPersonWithFirstAttributeData( json_PersonEventsList, firstAttribute.id );


				var personEventObjList_Sorted = Util.sortByKey( json_PersonEventsList, PersonUtil.primaryAttributeVal, true );


				// Step 4. With person and person events within it, popuplate/display person only.
				$.each( personEventObjList_Sorted, function( i_person, item_person ) 
				{
					var trPersonLast = me.addNewLastRow_Person( tableTag );

					me.setPersonInfoRow( trPersonLast, item_person );

				});


				// Last emtpy row add
				me.addNewLastRow_Person( tableTag );
					
				returnFunc( personEventObjList_Sorted.length );
			}
		}
		, function( failed_Message )
		{
			returnFunc( 0 );

			alert( $( 'span.msg_EventRetrievalFailed' ).text() + '\n\n Error: ' + JSON.stringify( failed_Message ) );
		});
	}

	/*
	me.updatePersonWithDetails = function( json_PersonEventsList, execFunc )
	{
		var personTotal = json_PersonEventsList.length;
		var count = 0;

		$.each( json_PersonEventsList, function( i_person, item_person ) 
		{
			PersonUtil.getPersonByID_ReuseReload( item_person.trackedEntityInstance
			, function( json_Person )
			{
				Util.copyProperties( json_Person, item_person );
			}
			, function() {}
			, DialogLoading.open
			, function() 
			{
				DialogLoading.close();

				count++;

				if ( count == personTotal )
				{
					execFunc( json_PersonEventsList );
				}						
			}
			);
		});
	}*/

	/*
	me.retrievePersonAndPopulateInfo = function( personRowsTag, personCount )
	{
		personRowsTag.each( function( i )
		{
			var trPersonTag = $( this );
			var personUid = trPersonTag.attr( 'uid' );

			if ( Util.checkValue( personUid ) )
			{
				PersonUtil.getPersonByID_ReuseReload( personUid
				, function( json_Person )
				{
					if ( Util.checkDefined( json_Person ) ) 
					{
						// Populate the row with person obj.
						me.setPersonInfoRow( trPersonTag, json_Person );

						FormUtil.setTagAsWait_Clear( trPersonTag );
					}
				}
				, function() 
				{
					console.log( 'Failed to retrieve person data: ' + personUid );
				}
				);
			}

		});
	}
	*/


	// -- Person Auto Selected Related -------------------
	// ---------------------------------------------------

	me.checkProgramEnroll = function( personId, programId, orgUnitId, enrolledAction, notEnrolledAction )
	{
		// Check Enrollment first. //'&ou=' + orgUnitId
		RESTUtil.getAsynchData( _queryURL_ProgramEnrollmentQuery + '?trackedEntityInstance=' + personId + '&program=' + programId + '&ouMode=ALL'
			, function( json_ProgramEnrollment ) 
			{ 
				if ( Util.checkDefined( json_ProgramEnrollment ) 
					&& Util.checkDataExists( json_ProgramEnrollment.enrollments ) )
				{

					if ( Util.checkData_WithPropertyVal( json_ProgramEnrollment.enrollments, "status", _status_ACTIVE ) )
					{
						enrolledAction();
					}
					else
					{
						if ( me.TabularDEObj.getSelectedProgram().onlyEnrollOnce )
						{
							alert( $( 'span.msg_CanNotEnrol_PreviousEnroll' ).text() );
						}
						else
						{
							notEnrolledAction();
						}
					}
				}
				else
				{
					notEnrolledAction();
				}
			}
			, notEnrolledAction
		);
	}

	me.programEnroll = function( personId, programId, orgUnitId, eventDateInFormat, successAction, failAction )
	{
		// Enroll the user
		var json_Enroll = { "trackedEntityInstance": personId, "orgUnit": orgUnitId, "program": programId, "enrollmentDate": eventDateInFormat } //, "dateOfIncident": eventDateInFormat };

		RESTUtil.submitData( json_Enroll, _queryURL_ProgramEnrollmentSubmit, "POST"
			, function( returnData )
			{
				if ( successAction !== undefined ) successAction( returnData );
			}
			, function( returnData )
			{
				if ( failAction !== undefined ) failAction( returnData );
			}
		);
	}

	me.retrieveAndSetDoneProgramStages = function( item_person, execFunc )
	{
		// If the person has non-repeatable stages that are 'done', 
		// mark the stage, so that this person can not add that stage anymore.

		var programStageList = me.TabularDEObj.getProgramStageList( me.TabularDEObj.getSelectedProgramId() );

		var deferredArrActions_checkStages = [];

		$.each( programStageList, function( i_programStage, item_programStage )
		{
			if ( !item_programStage.repeatable )
			{
				deferredArrActions_checkStages.push( 
					RESTUtil.getAsynchData( me.TabularDEObj.getEventQueryBaseUrl() 
						+ '&programStage=' + item_programStage.id 
						+ '&trackedEntityInstance=' + item_person.trackedEntityInstance
					, function( eventsRetrieved )
					{
						if ( Util.checkValue( eventsRetrieved.events ) ) 
						{
							if ( item_person.doneStages === undefined )
							{
								item_person.doneStages = item_programStage.id + ";";
							}
							else
							{
								item_person.doneStages += item_programStage.id + ";";
							}
						}
					}
					, function() 
					{ 
						console.log( 'Failed - On retrieveAndSetDoneProgramStages.  Stage: ' + item_programStage.id + ', TrackedEntityInstance: ' + item_person.trackedEntityInstance ); 
					} ) );	
			}
		});
			

		$.when.apply($, deferredArrActions_checkStages ).then( function( ) 
		{
			execFunc();
		});		
	}


	me.setupAddNewPersonRow = function()
	{
		me.personAddNewRowTag.click( function() 
		{
			var trPersonLast = me.addNewLastRow_Person( me.mainPersonTableTag );

			trPersonLast.find( '.personSelect' ).focus();
		});
	}

	// Initial Setup Call
	me.initialSetup = function()
	{				
		me.setupAddNewPersonRow();
	}

	// --------------------------
	// Run methods

	// Initial Setup Call
	me.initialSetup();
}
