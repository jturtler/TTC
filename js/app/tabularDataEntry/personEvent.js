
function PersonEvent( TabularDEObj, mainPersonTableTag )
{
	var me = this;

	me.TabularDEObj = TabularDEObj;

	me.mainPersonTableTag =  mainPersonTableTag;

	me.mainEventTableTag =  $( '#mainTable_Event' );
	me.mainEventSectionTag =  $( '#mainSection_Event' );
	me.dataSetDivTag =  $( '#dataSetDiv' );
	me.mainSection_PersonTag = $("#mainSection_Person");


	me.attr_EventRowNo = "eventrowno";


	me.buttonTemplate_Complete = "<button type='button' class='button eventComplete' style='display:none;'><span nameId='CompleteEvent'>" + l10n.get('complete') + "</span></button><button type='button' class='button eventIncomplete' style='display:none;'><span nameId='IncompleteEvent'>" + l10n.get('incomplete') + "</span></button>";
	
	me.trTemplate_EventRow = "<td class='orig'><input type='text' class='eventDate datepicker' caltype='upToToday' size='12'><br><span class='eventOrgUnit'></span></td>"
		+ "<td class='orig'><div><select class='eventProgram' style='margin: 1px 1px;display:none;' />"
			+	"<div class='eventProgramDiv divReadOnly'></div></div>"
			+	"<div><select class='eventStage' style='margin: 1px 1px;'/><div class='eventStageDiv  divReadOnly'></div></div><div><button class='eventCreate button smallRoundButton' style='font-size: 10px;' >&nbsp;&nbsp;<span nameId='CreateEvent' style='font-size: 10px;'>Create</span>&nbsp;&nbsp;</button></div></td>"
		
		+ "<td class='orig' align='center'><span class='eventStatus' style='font-size: 11px;'></span></td>"
		//	+ "<div>" + me.buttonTemplate_Complete + "</div></td>"

		+ "<td class='orig tdEventDelete'><input type='image' class='eventRowDelete dimImgWHover' alt='Delete Row' title='Delete Row' src='img/cross.png' style='border: 0px solid;' /><input type='image' class='eventDelete dimImgWHover' alt='Delete Event' title='Delete Event' src='img/cross.png' style='display:none; border: 0px solid;' /></td>";

	me.AttributeControlsTemplate = "<input type='text' class='datepicker' style='display:none;' size='11' /><input class='textbox' style='display:none;' type='text' size='25' height='20px' /><textarea class='textarea' style='display:none;' cols='15' rows='2'></textarea><input class='checkbox' style='display:none;' type='checkbox' /><select class='dropdown' style='display:none;'><option value=''>" + l10n.get('selectValue') + "</option></select><span class='label' style='display:none;'></span>";  
	// Should use separate for 'AttributeControl'
	// Larger Text fields, etc..

	me.thTemplate_CompleteButton = "<th class='added' colcount='' type='completed_button'>&nbsp;</th>";
	me.tdTemplate_CompleteButton = "<td class='added' type='completed_button' colcount=''>" + me.buttonTemplate_Complete + "</td>";


	// ======================
	// Methods

	// ----------------------
	// Public Getters

	me.getAttrControlsTemplate = function()
	{
		return me.AttributeControlsTemplate;
	}


	// Public Getters
	// ----------------------

	// ----------------------------------------------------------------------
	// Event List without Person List related

	me.clearEventList = function()
	{
		me.mainEventTableTag.find( "tr.trEventData" ).remove();
		me.mainEventTableTag.find( "tr.trEventHead th.added" ).remove();
	}

	me.resetEventList = function( )
	{
		me.clearEventList();

		me.addNewLastRow_Event( undefined, me.mainEventTableTag, me.TabularDEObj.getSelectedProgramId() );


		me.mainEventSectionTag.find( '.personEvent_addNewRow' ).off( 'click' ).on( 'click', function() 
		{ 
			var eventDate = me.addNewLastRow_Event( undefined, me.mainEventTableTag, me.TabularDEObj.getSelectedProgramId() );

			eventDate.focus();
		});
	}

	// Event List without Person List related
	// ----------------------------------------------------------------------


	me.getNewPersonEventRowCount = function( tableCurrent )
	{
		var rowCount;

		var lastRow = tableCurrent.find( "tr.trEventData:last" );

		if ( lastRow.length == 0 )
		{
			rowCount = 1;
		}
		else
		{
			var rowCount = parseInt( lastRow.attr( me.attr_EventRowNo ) ) + 1;
		}

		return rowCount;
	}


	me.setEventCreateButtonEnable = function( trCurrent )
	{
		var eventDate = trCurrent.find( ".eventDate" );
		var eventStage = trCurrent.find( ".eventStage" );
		var eventCreateTag = trCurrent.find( ".eventCreate" );

		// Disable the button initially
		Util.disableTag( eventCreateTag, true );

		if ( Util.checkCalendarDateStrFormat( eventDate.val() ) )
		{
			if ( me.TabularDEObj.isCase_SEwoR() || eventStage.val() != '' )
			{
				Util.disableTag( eventCreateTag, false );
			}
		}
	}


	me.addNewLastRow_Event = function( trPerson, tableCurrent, programId )
	{
		var newRowCount = me.getNewPersonEventRowCount( tableCurrent );

		// Person Row Add
		var trCurrent = me.addEventRow( newRowCount, tableCurrent );
		var trHead = tableCurrent.find( "tr.trEventHead:first" );

		// Populate Program and Stage
		var eventDate = trCurrent.find( ".eventDate" );
		var eventProgram = trCurrent.find( ".eventProgram" );
		var eventProgramDiv = trCurrent.find( "div.eventProgramDiv" );
		var eventStage = trCurrent.find( ".eventStage" );
		var eventCreateTag = trCurrent.find( ".eventCreate" );


		// Event Date Datepicker setup
		//   - Initially, event date is empty and program stage is disabled.
		//   - When event date is selected, enable program stage and set focus on that stage.
		
		
		// For program, set is as display only. 
		Util.selectOption_WithOptionalInsert( eventProgram, programId, me.TabularDEObj.getProgramList_Full(), "displayName" );
		eventProgram.hide();
		eventProgramDiv.show().html( eventProgram.find( 'option:selected' ).text() );


		// Populate Stage list.
		if( Util.checkValue( eventProgram.val() ) )
		{
			me.TabularDEObj.populateProgramStages( eventStage, eventProgram.val() );


			// If MEwR case, see if person has done stage list.
			// If there is, remove them from the programStage selection.
			if ( trPerson !== undefined )
			{
				var doneStages = trPerson.attr( me.TabularDEObj.personList.attr_doneStages );

				me.removeFromStageList( eventStage, doneStages );
			}

			// Disable the ProgramStage - Initially
			Util.disableTag( eventStage, true );					
		}

		// Set the event button Disable - initially
		me.setEventCreateButtonEnable( trCurrent );

		
		// Create DATE range for eventDate picker
			
		var validEventDateRange = me.getValidEventDateRange();
		
		// Set start data for the new event date as default value of matrix period selected if any
		// In case the range date of matrix period includes today, then set today as default value.
		
		var startDate = me.TabularDEObj.getDefaultStartDate();
		var endDate = me.TabularDEObj.getDefaultEndDate();
		var today = new Date();
		
		var startDateStr = $.format.date( startDate, "yyyyMMdd" );
		var endDateStr = $.format.date( endDate, "yyyyMMdd" );
		var todayStr = $.format.date( today, "yyyyMMdd" );
		
		var validMinDateStr;
		var validEndDateStr;
		if( validEventDateRange.startDate != undefined )
		{
			validMinDateStr = $.format.date( validEventDateRange.startDate, "yyyyMMdd" );
			validEndDateStr = $.format.date( validEventDateRange.endDate, "yyyyMMdd" );
		}
	

		var defaultDate = $.format.date( startDate, _dateFormat_YYYYMMDD );
		if( validEventDateRange.startDate !== undefined && startDateStr < validMinDateStr )
		{
			if( validMinDateStr >= startDateStr && validMinDateStr <= endDateStr )
			{
				defaultDate = $.format.date( validEventDateRange.startDate, _dateFormat_YYYYMMDD );
			}
			else
			{
				defaultDate = "";
			}
		}
		
		if( startDateStr <= todayStr && todayStr <= endDateStr )
		{
			eventDate.val( $.format.date( new Date(), _dateFormat_YYYYMMDD ) );
		}
		else if( validEndDateStr <= startDateStr )
		{
			eventDate.val( $.format.date( validEventDateRange.startDate, _dateFormat_YYYYMMDD ) );
		}
		else
		{
			eventDate.val( defaultDate );
		}
		
		var minDate = validEventDateRange.startDate;
		var maxDate = today;
		
		Util.setupDateRangePicker( eventDate
			, function() 
			{ 
				// STEP 1. Check if the selected event date is in the range			
				me.checkDateEventOutOfDateRange( eventDate );
				
				// STEP 2.		
				
				Util.disableTag( eventStage, true );

				if ( Util.checkCalendarDateStrFormat( eventDate.val() ) ) Util.disableTag( eventStage, false );

				me.setEventCreateButtonEnable( trCurrent );

				( me.TabularDEObj.isCase_SEwoR() ) ? eventCreateTag.focus() : eventStage.focus(); 

			}
			, undefined
			,minDate
			,maxDate
		);


		// On stage change, check stage value and event date value.
		eventStage.change( function() 
		{
			me.setEventCreateButtonEnable( trCurrent );

			eventStage.focus();
		});



		// If Single Event without Registration case, hide program & stage
		if ( me.TabularDEObj.isCase_SEwoR() )
		{
			eventProgram.closest( 'div' ).hide();
			eventStage.closest( 'div' ).hide();
			eventStage.val( eventStage.find( 'option:nth-child(2)' ).val() );
		}


		eventCreateTag.click( function() 
		{	
			var programStageSelected = eventStage.val();

			// Check eventDate and eventStage value
			if ( Util.checkCalendarDateStrFormat( eventDate.val() ) && programStageSelected != ''  )
			{
				// 1. Generate the event and put the event id into the ..
				me.eventCreate( trCurrent
				, function( json_Event )
				{
					// Check for program stage 'non-repeatableness'
					// and add to 'DontStage' is applicable.
					var programStageData_Selected = me.TabularDEObj.getProgramStageData_ById( programStageSelected );

					if ( me.TabularDEObj.isCase_MEwR() && Util.checkDefined( programStageData_Selected ) && Util.checkDefined( programStageData_Selected.repeatable ) &&  !programStageData_Selected.repeatable )
					{
						// Add this uid to the doneStage
						me.TabularDEObj.addTo_DoneStage( trPerson, programStageSelected );
					}


					eventStage.attr( "selectedProgramStage", programStageSelected ); 

					// 2. Populate the data element columns
					me.populateEventColumnsAndData( trHead, trCurrent, programStageSelected
					, function()
					{	
						//var eventId = trCurrent.attr( "uid" );	
						// Set this - for complete button show/hide & complete event handler set.
						// var eventStatus = me.TabularDEObj.isCase_MEwR() ? EventStatus.SIGN_SEwR_EVENT_OPEN : EventStatus.SIGN_SEwoR_EVENT_OPEN;
						me.setEventFixedColumn_ForExisting( trCurrent, json_Event );
						
						// setTimeout due to the first time Async Data Element retrieval and rendering.
						setTimeout( function() 
						{
							me.getFirstDEControl( trCurrent ).focus();
						}
						, 400);
														
					});

				});

			}
			else
			{
				alert( $( 'span.msg_CheckEventDateStage' ).text() );

				eventDate.focus();
			}
		});

		// Return the reference to the first control, so that it can be focused after the row generate.
		return eventDate;
	};
	
	me.checkDateEventOutOfDateRange = function( eventDateTag )
	{
		var startDate = me.TabularDEObj.getDefaultStartDate();
		var endDate = me.TabularDEObj.getDefaultEndDate();
		var eventDate = eventDateTag.val();
		
		var startDateStr = $.format.date( startDate, "yyyyMMdd" );
		var endDateStr = $.format.date( endDate, "yyyyMMdd" );
		var eventDateStr = eventDate.split("/").join("");
		
		var eventDateColTag = eventDateTag.closest("td");
		eventDateColTag.find("div.warning").remove();
			
		if( eventDateStr < startDateStr || eventDateStr > endDateStr )
		{
			var warningMsg = l10n.get( 'eventDataOutOfRange' );
			eventDateColTag.append("<div class='warning' style='color:red;font-size: 8px;font-style: italic;line-height: 12px;'>*** " + warningMsg + "</div>");
		}
	};
	
	me.getValidEventDateRange = function()
	{
		var selectedProgramOption = me.TabularDEObj.searchPanel.defaultProgramTag.find("option:selected");
		var today = new Date();
			
		// Setup expiredDate and expiredDate based today
		
		var relativePeriod = new RelativePeriod();
		// var startDate = me.TabularDEObj.getDefaultStartDate();
		var todayExpiredDateRange = relativePeriod.calExpiredDateRange( today, selectedProgramOption.attr("peType"), selectedProgramOption.attr("expiryDays") );
		
		return {
			"startDate": todayExpiredDateRange.validMinDate
			,"endDate": today
		}
		
	};
  
	
	me.removeFromStageList = function( eventStage, doneStages )
	{
		if ( doneStages != "" )
		{
			var doneStageArr = doneStages.split(";");

			$.each( doneStageArr, function( i_stage, item_stage )
			{	
				var stageId = Util.trim( item_stage );

				if ( stageId != "" )
				{
					eventStage.find( 'option[value="' + stageId + '"]' ).remove();
				}
			});
		}
	}


	me.getFirstDEControl = function( trCurrent )
	{
		// Set focuse to the first DE element
		return trCurrent.find( "td[colcount='0']" ).find( FormUtil.getStr_Views() ).first();

		//if ( firstDEControl.length > 0 )
	}


	// =========================================================
	// Event Create/Delete Related


	me.eventCreate = function( trCurrent, successFunc )
	{
		//var returnVal = false;

		// check date, program, programstage
		var eventDate = trCurrent.find( "input.eventDate" );
		var eventProgram = trCurrent.find( "select.eventProgram" );
		var eventStage = trCurrent.find( "select.eventStage" );
		//var eventStatus = trCurrent.find( "span.eventStatus" );

		var eventDel = trCurrent.find( "input.eventDelete" );

		var personUid = trCurrent.closest( '.trPersonDetail' ).attr( 'uid' );
		var orgUnitUid = me.TabularDEObj.getOrgUnitId();

		var eventDateInFormat = Util.formatDate( eventDate.val() );


		// Need to check if the program Stage has (programStages.captureCoordinates 

		var json_Data = {"program": eventProgram.val(), "programStage": eventStage.val(),"orgUnit": orgUnitUid, "eventDate": eventDateInFormat, "coordinate": {}, "status": _status_ACTIVE };


		if ( me.TabularDEObj.isCase_SEwoR() )
		{
			me.eventCreate_SubmitData( json_Data, trCurrent, function( eventId, status )
			{
				json_Data.event = eventId;
				successFunc( json_Data, status );
			});
		}
		else
		{
			json_Data.trackedEntityInstance = personUid;

	
			// Check for Enrollment.  If enrolled already, create event.  If not, open PersonInfo Popup.
			me.TabularDEObj.checkProgramEnroll( personUid, eventProgram.val(), orgUnitUid
			, function()
			{
				me.eventCreate_SubmitData( json_Data, trCurrent, function( eventId, status )
				{
					json_Data.event = eventId;
					successFunc( json_Data, status );
				});								
			}
			, function()
			{
				// Alert proper message here.
				alert( $( 'span.msg_NotEnrolled' ).text() );

				var personInfoTag = trCurrent.closest( '.trPersonDetail' ).prev().find( '.personInfo:visible' );

				me.TabularDEObj.personInfoPopup( personInfoTag, function()
				{
					// Doesn't work well.  - due to timing..
					me.eventCreate_SubmitData( json_Data, trCurrent, function( eventId, status )
					{
						successFunc( json_Data, status );
					});							
				});
			});

		}
	}


	me.eventCreate_SubmitData = function( json_Data, trCurrent, successFunc )
	{
		RESTUtil.submitData( json_Data, _queryURL_EventSubmit, "POST"
			, function( returnData )
			{
				if ( returnData !== undefined && returnData.response !== undefined && returnData.response.importSummaries !== undefined )
				{
					var importSummary = returnData.response.importSummaries[0];

					if ( importSummary.status == "SUCCESS" )
					{
						trCurrent.attr( "uid", importSummary.reference );
						
						successFunc( importSummary.reference, json_Data.status );
					}
				}
				else
				{
					alert( $( 'span.msg_FailedToCreateEvent' ).text() + '\n\n Error: ' + JSON.stringify( returnData ) );
				}
			}
			, function( returnData ) 
			{
				alert( $( 'span.msg_FailedToCreateEvent' ).text() + '\n\n Error: ' + JSON.stringify( returnData ) );
			}
			, function()
			{
				// Loading..
				DialogLoading.open();
			}
			, function()
			{
				// Loading finish..
				DialogLoading.close();
			}
		);
	}
	
	
	this.setStatusRelated = function( trCurrent, json_Event, programStageId )
	{
		var eventDate = trCurrent.find( "input.eventDate" );
		var eventStatus = trCurrent.find( "span.eventStatus" );
		var eventDel = trCurrent.find( "input.eventDelete" );
		var eventRowDel = trCurrent.find( "input.eventRowDelete" );
		var eventComplete = trCurrent.find( "button.eventComplete" );
		var eventIncomplete = trCurrent.find( "button.eventIncomplete" );
		var eventProgramDiv = trCurrent.find( "div.eventProgramDiv" );
		var eventStageDiv = trCurrent.find( "div.eventStageDiv" );
		
		
		var status = me.getEventStatus( json_Event );
		// Set Status
		var statusMsg = ( me.TabularDEObj.isCase_MEwR() ) ? EventStatus.SEwR_EVENT_STATUS[status] : EventStatus.SEwoR_EVENT_STATUS[status];
		eventStatus.html( statusMsg );

		if( status == EventStatus.SIGN_SEwR_PROGRAM_INACTIVE
			|| status == EventStatus.SIGN_SEwR_PROGRAM_COMPLETED )
		{
			trCurrent.closest("div.divPersonDetail").find("button").hide();
			trCurrent.closest("div.divPersonDetail").find("span.eventStatus").html( statusMsg );
			trCurrent.closest("div.divPersonDetail").find("input,select").each( function(){
				Util.disableTag( $(this), true );
			});
		}
		else if( status == EventStatus.SIGN_SEwR_EVENT_OPEN
			|| status == EventStatus.SIGN_SEwoR_EVENT_OPEN )
		{
			// Delete related
			eventDel.show();
			
			// remove previous click event
			eventDel.off( 'click' );
			eventRowDel.off( 'click' );
			
			eventDel.click( function() { me.eventDelete( trCurrent, json_Event.event ); });
			
			// Complete related
			eventComplete.show();

			eventComplete.off( "click" ).on( "click", function() 
			{
				me.completeEvent( trCurrent, json_Event, programStageId );
			});
			
			eventIncomplete.hide();
			
			// Show 'Add new event' button if Active program
			var personUid = trCurrent.closest("tr.trPersonDetail").attr("uid");
			var personTag = me.mainSection_PersonTag.find("tr.trPerson[uid='" + personUid + "']");
		}
		else if( status == EventStatus.SIGN_SEwR_EVENT_COMPLETED_CAN_REOPEN
			|| status == EventStatus.SIGN_SEwoR_EVENT_COMPLETED_CAN_REOPEN )
		{
			// In-Complete related
			me.TabularDEObj.checkIncompleteAction_UserRole( function() 
			{
				eventIncomplete.show();
			});
			
			eventIncomplete.off( "click" ).on( "click", function() 
			{
				me.incompleteEvent( trCurrent, json_Event, programStageId );
			});
			
			me.TabularDEObj.dataInMemory.retrieveProgramStageData( programStageId, function( json_ProgramStage )
			{
				if ( json_ProgramStage.blockEntryForm )
				{
					// Disable all the DataElements controls - move the control rendering area..
					me.setEventDEControlDisable( trCurrent );
				}
			});
			
			eventComplete.hide();
			eventDel.hide();
		}
		else
		{
			eventIncomplete.hide();
			eventComplete.hide();
			eventDel.hide();
			
			me.setEventFixedColumnDisable( trCurrent );
			me.setEventDEControlDisable( trCurrent );					
			Util.paintClear( eventProgramDiv );
			Util.paintClear( eventStageDiv );

			eventProgramDiv.css( 'color', '#80808F' );
			eventStageDiv.css( 'color', '#80808F' );
		}
		
		// Hide 'Add new event' button if program is COMPLETED / INACTIVE
		var personUid = trCurrent.closest("tr.trPersonDetail").attr("uid");
		var trPerson = me.mainSection_PersonTag.find("tr.trPerson[uid='" + personUid + "']");
		var addNewEventRowButton = trCurrent.closest("div.divPersonDetail").find( '.personEvent_addNewRow' );
		me.showSEwoRCreateNewEventBtn( me.TabularDEObj.searchPanel.defaultProgramTag, trPerson, addNewEventRowButton );
	};
	
	me.showSEwoRCreateNewEventBtn = function( eventProgram, trPerson, addNewEventRowButton )
	{
		addNewEventRowButton.hide();
		
		if( me.TabularDEObj.isCase_MEwR() ) 
		{	
			var eventStage = $("<select></select>");
			
			// Populate Stage list.
			if( Util.checkValue( eventProgram.val() ) )
			{
				me.TabularDEObj.populateProgramStages( eventStage, eventProgram.val() );

				// If MEwR case, see if person has done stage list.
				// If there is, remove them from the programStage selection.
				if ( trPerson !== undefined )
				{
					var doneStages = trPerson.attr( me.TabularDEObj.personList.attr_doneStages );

					me.removeFromStageList( eventStage, doneStages );
				}
			}
			
			if( eventStage.find("option").length > 1 )
			{
				addNewEventRowButton.show();
			}
		}
	};
	
	me.getEventStatus = function( event )
	{
		var relativePeriod = new RelativePeriod();
		var eventDate = event.eventDate;
		
		var programSelected = me.TabularDEObj.searchPanel.defaultProgramTag.find("option:selected");
		var expiredPeriodType = programSelected.attr("peType");
		var expiryDays = programSelected.attr("expiryDays");
		var completeEventsExpiryDays = programSelected.attr("completeEventsExpiryDays");
		var eventStatus = event.status;
		
		return relativePeriod.lockDataFormByEventDate( !me.TabularDEObj.isCase_MEwR(), event, expiredPeriodType, expiryDays, completeEventsExpiryDays );
	};

	me.setEventFixedColumn_ForExisting = function( trCurrent, json_Event )
	{
		var eventDate = trCurrent.find( "input.eventDate" );
		var eventProgram = trCurrent.find( "select.eventProgram" );
		var eventStage = trCurrent.find( "select.eventStage" );
		var eventProgramDiv = trCurrent.find( "div.eventProgramDiv" );
		var eventStageDiv = trCurrent.find( "div.eventStageDiv" );
		var eventRowDelete = trCurrent.find( ".eventRowDelete" );
		var eventCreateTag = trCurrent.find( ".eventCreate" );

		// event date update are place in 'setEventDateSave()'

		// disable the controls
		Util.disableTag( eventCreateTag, true );

		eventProgram.hide();
		eventStage.hide();
		eventCreateTag.hide();

		eventProgramDiv.show().text( eventProgram.find( 'option:selected' ).text() );
		//eventStageDiv.show().html( eventStage.find( 'option:selected' ).text() );
		eventStageDiv.show();

		var selectedStageId = eventStage.attr( "selectedProgramStage" );

		if ( selectedStageId != "" )
		{
			// Simply used to get programStage name.  <-- should do a more efficient way for this..
			me.TabularDEObj.dataInMemory.retrieveProgramStageData( selectedStageId, function( json_ProgramStage )
			{
				eventStageDiv.text( json_ProgramStage.displayName );
				eventStageDiv.attr( 'uid', json_ProgramStage.id );
			});
		}

		// color the controls
		//Util.paintResult( eventDate, true );
		Util.paintLightGreen( eventProgramDiv );
		Util.paintLightGreen( eventStageDiv );

		// Hide the simple row delete
		eventRowDelete.hide();
		Util.disableTag( eventRowDelete, true );

		// Set status, delete, completed status button related actions.
		me.setStatusRelated( trCurrent, json_Event, selectedStageId );

	}

	

	me.eventDelete = function( trCurrent, eventUid )
	{		
		
		if( confirm( $( 'span.msg_ConfirmDelete' ).text() ) )
		{
			// Find the next tabbing tag first.
			var nextTabTag = EventUtil.getNextRowFocus_Event( trCurrent );

			RESTUtil.submitData( undefined, _queryURL_EventSubmit + '/' + eventUid, "DELETE"
				, function()
				{
					MsgManager.msgAreaShow( $( 'span.msg_EventDeleted' ).text() );
														
					var tableCurrent = trCurrent.closest( 'table' );

					// Remove this row and set focus on next tag
					Util.setRowRemoval( trCurrent, function()
					{							
						// If this is the last row in this table, remove all the DE data columns.
						if ( tableCurrent.find( 'tr.trEventData' ).length == 0 )
						{
							tableCurrent.find( 'tr.trEventHead' ).find( 'th.added' ).remove();
						}
						
						// Set focus to the next tag.
						if ( nextTabTag !== undefined )
						{
							nextTabTag.focus();
						}
					});
					
				}
				, function( errorMsg )
				{							
					var auditMsg = "";

					//console.log( 'errorMsg: ' + errorMsg + ', obj: ' + JSON.stringify( errorMsg ) );


					if ( errorMsg !== undefined && errorMsg.responseJSON !== undefined )
					{
						var devMsg = errorMsg.responseJSON.devMessage;

						if ( devMsg !== undefined )
						{
							console.log( 'errorMsg.devMessage: ' + devMsg + ', audit:' +
							devMsg.indexOf( "audit" ) );

							if ( devMsg.indexOf( "audit" ) >= 0 )
							{
								auditMsg += '  ErrorMsg: Due to the associated audit data existing, delete is not allowed.';
							}

						}
					}
					// Need to display information about the audit info..

					alert( $( 'span.msg_EventDeleteFailed' ).text() + auditMsg );

					trCurrent.find( "input.eventDelete" ).focus();

				}
			);
		}
	}


	me.completeEvent = function( trCurrent, eventUid, programStageId )
	{		
		if ( me.checkCompulsoryData( trCurrent ) && ProgramRuleUtil.checkProgramRuleData( trCurrent ) )
		{
			if( confirm( $( 'span.msg_ConfirmEventComplete' ).text() ) )
			{
				me.eventUpdate( trCurrent, _status_COMPLETED
					, function( json_Event )
					{
						
						trCurrent.find("input,select").each( function(){
							Util.disableTag( $(this), true );
						});
					
						// Find the next tabbing tag first.
						var nextTabTag = EventUtil.getNextRowFocus_Event( trCurrent );

						// Update the completeted row info/setting..
						
						me.setStatusRelated( trCurrent, json_Event, programStageId );

						if ( nextTabTag !== undefined )
						{
							nextTabTag.focus();
						}
						

					}
				);
			}
		}
	}


	me.incompleteEvent = function( trCurrent, json_Event, programStageId )
	{		
		if( confirm( $( 'span.msg_ConfirmEventIncomplete' ).text() ) )
		{
			me.eventUpdate( trCurrent, _status_ACTIVE
				, function( json_Event )
				{
					trCurrent.find("input,select").each( function(){
						Util.disableTag( $(this), false );
					});
						
					// Find the next tabbing tag first.
					var nextTabTag = EventUtil.getNextRowFocus_Event( trCurrent );

					// Update the completeted row info/setting..
					me.setStatusRelated( trCurrent, json_Event, programStageId );

					if ( nextTabTag !== undefined )
					{
						nextTabTag.focus();
					}
				}
			);
		}
	}


	me.addEventRow = function( newRowCount, tableCurrent )
	{
		tableCurrent.append( $( document.createElement( "tr" ) ).attr( 'class', 'trEventData' ).attr( 'uid', '' ).append( me.trTemplate_EventRow ) );

		var lastRow = tableCurrent.find( "tr.trEventData:last" );

		lastRow.attr( me.attr_EventRowNo, newRowCount );


		// Adjust the column count here.
		me.adjustNewRowTDCount( lastRow, tableCurrent );

		// Add delete row event
		lastRow.find( '.eventRowDelete').click( function() 
		{
			var trCurrent = $( this ).closest( 'tr' );

			// Find the next tabbing tag first.
			var nextTabTag = EventUtil.getNextRowFocus_Event( trCurrent );

			Util.setRowRemoval( trCurrent );

			// Set focus to the next tag.
			if ( nextTabTag !== undefined )
			{
				nextTabTag.focus();
			}
		});


		return lastRow;
	}


	me.adjustNewRowTDCount = function( trCurrent, tableCurrent )
	{
		//var columnCount = tableCurrent.find("th.added").length;

		tableCurrent.find( "th.added" ).each( function( index ) {
			
			trCurrent.append( "<td class='added' colCount='" + $( this ).attr("colCount") + "'>&nbsp;</td>");
		} );
	}


	me.adjustRowsTDCount = function( tableCurrent )
	{
		var columnCount = tableCurrent.find("th.added").length;

		tableCurrent.find( "tr.trEventData" ).each( function( i_tr, item_tr ) {

			// For each data row, check if each row has enough td.
			// If not, add them.
			me.addTDRow( $(this), columnCount );

		} );

		//trCurrent.append( "<td colCount='" + $( this ).attr("colCount") + "'>&nbsp;</td>");

	}


	me.addTDRow = function( trCurrent, totalColumnCount )
	{
		var tdCount = trCurrent.find( "td.added" ).length;

		if( tdCount < totalColumnCount )
		{
			for( var i = tdCount; i < totalColumnCount; i++)
			{					
				trCurrent.append( "<td class='added' colCount='" + i + "'>&nbsp;</td>");
			}
		}
	}

	// Event Create/Delete Related
	// =========================================================


	// =========================================================
	// Retrieve and Populate Event Related
	

	me.populateEventsByPersonId = function( personId, trPersonRow, divPersonDetailTag, successFunc )
	{
			// NOTE: Populate event that does not have register date/orgUnit
			// first <-- auto generated events on enrollment to program
		
		me.getUnregisteredEventsByPersonId( personId, divPersonDetailTag, function( events_unregistered )
		{
			// Retrieve registered events
			var requestUrl = me.getEventsSearchUrl( personId );
			var json_EventList = new Array();
			var tbEvents = divPersonDetailTag.find( ".tbStyle_PersonDetail" );

			RESTUtil.getAsynchData( requestUrl, function( json_Events )
			{	
				// Combine unregistered and registered events
				if ( Util.checkDataExists( json_Events.events ) )
				{
					var json_EventList_Sorted = Util.sortByKey( json_Events.events, "eventDate" );

					json_EventList = $.merge( events_unregistered, json_EventList_Sorted );
				}
				else if ( events_unregistered.length > 0 )
				{
					json_EventList = events_unregistered;
				}

				if ( json_EventList.length > 0 )
				{
					me.populateEvents( trPersonRow, tbEvents, json_EventList );
				}
				else
				{
					// If no event found, create the new event row
					me.addNewLastRow_Event( trPersonRow, tbEvents, me.TabularDEObj.getSelectedProgramId() );
				}

				successFunc( json_EventList );
			}
			, function() { successFunc( json_EventList ); }
			, function() { FormUtil.setTagAsWait( divPersonDetailTag ); }
			, function() { FormUtil.setTagAsWait_Clear( divPersonDetailTag ); }
			);
		});
	}

	me.getUnregisteredEventsByPersonId = function( personId, divPersonDetailTag, returnFunc )
	{
		var json_EventList = new Array();
		var requestUrl = me.getUnregisteredEventsSearchUrl( personId );

		RESTUtil.getAsynchData( requestUrl, function( json_Events )
		{					
			if ( Util.checkDataExists( json_Events.events ) )
			{
				$.each( json_Events.events, function( i_event, item_event )
				{
					if ( item_event.eventDate === undefined )
					{
						json_EventList.push( item_event );
					}
				});
			}

			returnFunc( json_EventList );
		}
		, function() { returnFunc( json_EventList ); }
		, function() { FormUtil.setTagAsWait( divPersonDetailTag ); }
		, function() { FormUtil.setTagAsWait_Clear( divPersonDetailTag ); }
		);
	}


	// To be executed by 'Populate' button. - if Program is SEwoR.
	me.retrieveAndPopulateEvents = function( tableCurrent, execFunc )
	{
		// Step 1. Clear the person/event data table
		me.clearEventList();

		var foundNo = 0;

		var requestUrl = me.getEventsSearchUrl();
			
		RESTUtil.getAsynchData( requestUrl, function( json_Events )
		{
			if ( Util.checkDataExists( json_Events.events ) )
			{
				var json_EventList_Sorted = Util.sortByKey( json_Events.events, "eventDate" );

				me.populateEvents( undefined, tableCurrent, json_EventList_Sorted );

				foundNo = json_Events.events.length;
			}


			if ( foundNo == 0 )
			{
				// Create the new event row - simply get basic info
				me.addNewLastRow_Event( undefined, me.mainEventTableTag, me.TabularDEObj.getSelectedProgramId() );
			}

			execFunc( foundNo );
		}
		, function( failed_Message )
		{
			execFunc( foundNo );					

			alert( $( 'span.msg_EventRetrievalFailed' ).text() + '\n\n Error: ' + JSON.stringify( failed_Message ) );

		}
		, DialogLoading.open
		, DialogLoading.close					
		);	
	}


	// =========================================================
	// Populate Event Column Related

	// Move this to populate Layout method section
	me.populateEventColumnsAndData = function( trHead, trCurrent, programStageUid, runAfterwards_Func, item_event )
	{

		me.TabularDEObj.dataInMemory.retrieveProgramStageData( programStageUid, function( json_ProgramStage )
		{

			trCurrent.find( "td.added" ).html( "" ).attr( "DEID", "" );

			var count_columnExisting = trHead.find( ".added" ).length;
			//var count_dataElements = json_ProgramStage.programStageDataElements.length;
			var count_current = 0;


			var cssTD_DENameDisplay = "style=''";
			var cssTH_DENameDisplay = "style=''";

			if ( me.TabularDEObj.isCase_SEwoR() )
			{
				cssTD_DENameDisplay = "style='display:none;'";
			}
			else 
			{
				cssTH_DENameDisplay = "style='display:none;'";
			}


			// TODO: place class='before' coordinate at here?
			//		Add class
			if ( Util.checkDefined( json_ProgramStage.captureCoordinates ) && json_ProgramStage.captureCoordinates )
			{
				var coordinateControlTemplate = "<div id='eventCoordinateDiv'><table class='tbNone11'><tr><td><span style='font-size: 11px;'>Lat:</span></td><td><input type='text' class='eventCoorLat' size='7' " + _view + "='" + _view_Yes + "' + style='margin-bottom:1px;'/></td></tr><tr><td><span style='font-size: 11px;'>Long:</span></td><td><input type='text' class='eventCoorLng' size='7' " + _view + "='" + _view_Yes + "'/></td></tr></table></div>";

				me.setColumns_AddedPart( count_current++, count_columnExisting, trCurrent, trHead, undefined, "Coordinates", cssTH_DENameDisplay, cssTD_DENameDisplay, coordinateControlTemplate );
			}
			
			// For each data elements, add column.
			me.getHiddenDataElementsInSettings( function(hiddenDEList){
				$.each( json_ProgramStage.programStageDataElements, function( i, item ) {
					var deId = item.dataElement.id;
					
						if( hiddenDEList.indexOf( deId ) < 0 )
						{
							me.setColumns_AddedPart( count_current, count_columnExisting, trCurrent, trHead, item, "", cssTH_DENameDisplay, cssTD_DENameDisplay, "" );
							count_current++;
						}
					});
			});


			// NOTE: Added Back From Old Version
			// After done with data elements, add complete button.
			if ( count_columnExisting > count_current )
			{
				trCurrent.find( "td[colCount='" + count_current + "']" ).append( me.buttonTemplate_Complete );

			}
			else
			{
				trHead.find( 'th[type="completed_button"]' ).attr( 'type', '' );

				trHead.append( me.thTemplate_CompleteButton ).find( 'th[type="completed_button"]' ).attr( 'colcount', count_current );

				trCurrent.append( me.tdTemplate_CompleteButton ).find( 'td[type="completed_button"]' ).attr( 'colcount', count_current );
			}
			
			me.adjustRowsTDCount( trCurrent.closest( ".tbStyle_PersonDetail" ) );

			// This is where the visible attribute is being set ('view=y') and controls are decided.
			me.setEventDEControlTypesAndValue( trCurrent, item_event );

			me.setEventDataSave( trCurrent );


			// -- PROGRAM RULE RELATED ------------
			var selectedProgram = me.TabularDEObj.getSelectedProgram();

			var personId = trCurrent.closest( 'tr.trPersonDetail' ).attr( 'uid' );


			// Add Program Rules (with events?)
			me.TabularDEObj.programRule.setUp_ProgramRules( 'Event_DE', personId, trCurrent, trCurrent.find( 'td.added' ), selectedProgram.rules, selectedProgram.ruleVariables );

			// Set td background switching event on focus
			FormUtil.setTabBackgroundColor_Switch( trCurrent.find( "input,select,button" ) );
			
			runAfterwards_Func();
		});

	}


	me.setColumns_AddedPart = function( i, count_columnAdded, trCurrent, trHead, deItem, titleName, cssTH_Name, cssTD_Name, controlsTemplate )
	{
		var deId = "";
		var compulsory = false;
		var compulsorySpan = "";


		if ( Util.checkDefined( deItem ) )
		{
			deId = deItem.dataElement.id;
			compulsory = deItem.compulsory;

			titleName = ( Util.checkValue( deItem.dataElement.displayFormName ) ) ? deItem.dataElement.displayFormName : deItem.dataElement.displayName;

			if ( deItem.compulsory )
			{
				compulsorySpan = "<span title='Compulsory' class='mandatory'>*</span>";
			}
		}


		// NOTE: Need to count this <-- so we can reuse the exisitng columns
		if( i < count_columnAdded )
		{
			// reuse the column
			trCurrent.find( "td[colCount='" + i + "']" ).attr( "DEID", deId ).attr("compulsory", compulsory ).append( "<span class='dataElementName' " + cssTD_Name + ">" + titleName + compulsorySpan + ": </span>" + controlsTemplate );
		}
		else
		{
			// create the column
			trHead.append( "<th class='added' colCount='" + i + "'><span class='dataElementName' " + cssTH_Name + ">" + titleName + compulsorySpan + "</span>&nbsp;</th>" );

			trCurrent.append( "<td class='added' DEID='" + deId + "' compulsory='" + compulsory + "'  colCount='" + i + "'><span class='dataElementName' " + cssTD_Name + ">" + titleName + compulsorySpan + ": </span>" + controlsTemplate + "</td>" );
		}

	}


	// =========================================================
	// Set Event DataElement Controls

	me.setEventDEControlTypesAndValue = function( trCurrent, item_event )
	{	

		var deValueSet = [];

		// Set values if available.
		if ( item_event !== undefined )
		{					
			if ( item_event.coordinate !== undefined )
			{
				// Put coordinate values to input tags
				me.populateCoordinateTagData( item_event.coordinate, trCurrent.find( "input.eventCoorLat" ), trCurrent.find( "input.eventCoorLng" ) );
			}


			// Set data element values to be populated once the controls are set.
			if( item_event.dataValues !== undefined )
			{
				$.each( item_event.dataValues, function( i_dataValue, item_dataValue ) 
				{
					if( item_dataValue.dataElement !== undefined )
					{
						deValueSet.push( { "de": item_dataValue.dataElement, "value": item_dataValue.value } );
					}
				});
			}
		}


		// Set Controls and values
		trCurrent.find( "td.added" ).each( function( index ) 
		{

			var tdTag = $( this ); 
			var DEID = tdTag.attr( "DEID" );


			if( Util.checkValue( DEID ) )
			{
				
				var deValue = Util.getFromList( deValueSet, DEID, "de" );

				// Get dataElement info
				me.TabularDEObj.dataInMemory.retrieveDataElement( DEID, function( json_DataElement )
				{
					var controlTag;
					var valType = json_DataElement.valueType;


					// TODO: Need to add validation of the type
					//		- INTEGER, LETTER, PHONE_NUMBER, etc..
					//		PersonUtil.setTagTypeValidation
					//		But, we need to perform this on 'saving' area and prevent it..
					//		So, for now, set it as attribute?

					if( json_DataElement.id == 'k3gpW1Vm3Ov' )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".textbox" );
						
						// For Orgunit Field
						controlTag.click( function(){
							var gpsFieldTag = $(this).closest("tr").find("td[deid='VzOmsEZChev']").find("input,select");
							me.TabularDEObj.dataElementOrguUnitPopup.setInputTags( $(this), gpsFieldTag );
							me.TabularDEObj.dataElementOrguUnitPopup.openForm();
						});
					}
					else if( json_DataElement.optionSetValue || valType == "BOOLEAN" )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".dropdown" );

						if( valType == "BOOLEAN" )
						{
							controlTag.append("<option value='true'>Yes</option>").append("<option value='false'>No</option>");						
						}
						else
						{
							// Get optionSet values
							me.TabularDEObj.dataInMemory.retrieveOptionSets( json_DataElement.optionSet.id, function( json_OptionSets )
							{
								$.each( json_OptionSets.options, function( i_Option, item_Option) 
								{
									EventUtil.appendSelectOption_Option( controlTag, item_Option );
								});

								if ( deValue !== undefined ) controlTag.val( deValue.value );
							});
						}
					}
					else if( valType == "TEXT" || valType == "USERNAME" || valType == "LETTER" || valType == "PHONE_NUMBER" || valType == "EMAIL" || valType == "DATETIME" || valType == "FILE_RESOURCE" || valType == "COORDINATE" )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".textbox" );
					}
					else if( valType == "LONG_TEXT" )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".textarea" );
					}
					else if ( valType.indexOf( "INTEGER" ) == 0 || valType == "UNIT_INTERVAL" )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".textbox" ).attr( "size", "5" );
					}
					else if ( valType == "NUMBER" || valType == "PERCENTAGE" )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".textbox" ).attr( "size", "8" );
					}
					else if( valType == "DATE" )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".datepicker" );
						Util.setupDatePicker( controlTag );
						/*, function() 
						{
							setTimeout( function() 
							{ 
								console.log( 'cal changed: ' + controlTag.val() );
								controlTag.focusout();
							}, 500 );
						} );*/
					}
					else if( valType == "TRUE_ONLY" || valType == "TRACKER_ASSOCIATE" )
					{
						var controlTag = me.setAndGetControlTag( tdTag, ".checkbox" );
					}
					else
					{
						//alert( "Unknown Column(DataElement) Type Found.  [Name: " + json_DataElement.displayName + ", ID: " + json_DataElement.id + ", valueType: " + valType + "]" );
						var controlTag = me.setAndGetControlTag( tdTag, ".label" ).html( '<span style="color:Red;">Not supported valueType: ' + valType + '</span>' );
					}


					// For validation, set 'valType' as attribute and check the type validation during saving ( on 'change' event )
					controlTag.attr( 'valType', valType );


					// Populate Data - Other than optionSet listings already applied above.
					if ( controlTag !== undefined && deValue !== undefined )
					{
						if( valType == "DATE" )
						{
							controlTag.val( Util.formatDateBack( deValue.value ) );
						}
						else if( valType == "TRUE_ONLY" || valType == "TRACKER_ASSOCIATE" )
						{
							controlTag.prop( 'checked', deValue.value );
						}
						else
						{
							controlTag.val( deValue.value );
						}
					}

				});
			}
		});
	}


	me.setAndGetControlTag = function( inputTag, className )
	{
		var controlTag;

		if ( className == '.datepicker' )
		{
			controlTag = $( '<input class="datepicker" type="text" size="11" />' );
		}
		else if ( className == '.textbox' )
		{
			controlTag = $( '<input class="textbox" type="text" size="15" height="20px" />' );
		}
		else if ( className == '.textarea' )
		{
			controlTag = $( '<textarea class="textarea" cols="15" rows="2"></textarea>' );
		}
		else if ( className == '.checkbox' )
		{
			controlTag = $( '<input class="checkbox" type="checkbox" />' );
		}
		else if ( className == '.dropdown' )
		{
			controlTag = $( '<select class="dropdown"><option value="">' + l10n.get('selectValue') + '</option></select>' );
		}
		else if ( className == '.label' )
		{
			controlTag = $( '<span class="label"></span>' );
		}
		else
		{
			controlTag = $( '<span class="label"></span>' );
		}

		controlTag.attr( _view, _view_Yes );

		inputTag.append( controlTag );

		return controlTag;
	}


	me.setEventFixedColumnDisable = function( trCurrent )
	{
		// .find( FormUtil.getStr_Views() )
		trCurrent.find( "td.orig" ).find( "input,select" ).each( function( index ) {

			Util.disableTag( $( this ), true );
		});
	}

	me.setEventDEControlDisable = function( trCurrent )
	{
		// .find( FormUtil.getStr_Views() )
		trCurrent.find( "td.added" ).find( "input,select,textarea" ).each( function( index ) {

			Util.disableTag( $( this ), true );
		});
	}

	// Set Event DataElement Controls
	// =========================================================



	// ==============================================
	// Event Save Related

	me.setEventDataSave = function( trCurrent )
	{

		/* trCurrent.find( "input.eventDate" ).datepicker( "option", "onSelect", function() 
		{
			me.setStatusChecking( $( this ), true );

			me.eventUpdate( trCurrent );
		}); */

		trCurrent.find( "input.eventCoorLat, input.eventCoorLng" ).change( function () 
		{
			me.eventUpdate( trCurrent );
		});

		trCurrent.find( "td.added input.datepicker" ).focusout( function () 
		{
			var cntrl = $( this );
			setTimeout( function() 
			{ 
				//console.log( 'focus out val: ' + cntrl.val() );
				me.eventUpdatePartial( cntrl, trCurrent.attr( 'uid' ) );
			}, 200 );
		});

		trCurrent.find( "td.added input.textbox, td.added select, td.added textarea, td.added input.checkbox" ).change( function () 
		{
			me.eventUpdatePartial( $( this ), trCurrent.attr( 'uid' ) );
		});
	}


	me.setUp_EntryKeyTabbing = function( tags )
	{
		tags.keydown( function( event ) { me.moveNextOnEnter( event, $( this ) ); } );
	}

	me.setUp_OnChangeTabbing = function( tags )
	{
		tags.change( function( event ) 
		{ 
			tag = $( this );

			tag.parent().next().find( FormUtil.getStr_Views() ).first().focus().select();

		} );
	}

	me.moveNextOnEnter = function( event, tag )
	{
		if ( event.keyCode == 13 )
		{
			var nextTag = tag.parent().next().find( FormUtil.getStr_Views() ).first();
			
			nextTag.focus();

			nextTag.select();
		}
	}


	me.eventUpdate = function( trCurrent, newStatus, successAction )
	{
		// Assuming that the event was created before, by ProgramStage selection, 
		// when any of the values changes, update the event with all thoes values.
		
		// check date, program, programstage
		var eventDate = trCurrent.find( "input.eventDate" );
		var eventProgram = trCurrent.find( "select.eventProgram" );
		var eventStage = trCurrent.find( "select.eventStage" );
		var eventStatus = trCurrent.find( "span.eventStatus" );
		
		var eventCoorLat = trCurrent.find( "input.eventCoorLat" );
		var eventCoorLng = trCurrent.find( "input.eventCoorLng" );

		var personUid = trCurrent.closest( '.trPersonDetail' ).attr( 'uid' );
		var eventUid = trCurrent.attr( 'uid' );

		var eventDateInFormat = Util.formatDate( eventDate.val() );
		
		var status = eventStatus.text();

		if ( Util.checkValue( newStatus ) )
		{
			status = newStatus;
		}
					
		var json_Data = {"program": eventProgram.val(), "programStage": eventStage.attr( 'selectedprogramstage' ),"orgUnit": me.TabularDEObj.getOrgUnitId(), "eventDate": eventDateInFormat,  "coordinate": {}, "status": status, "dataValues": me.generateJSON_AllDataColumns( trCurrent ) };


		// if coordinates exists, add them.
		me.setCoordinateData( json_Data.coordinate, eventCoorLat, eventCoorLng );


		if ( !me.TabularDEObj.isCase_SEwoR() )
		{
			json_Data.trackedEntityInstance = personUid;
		}

		RESTUtil.submitData( json_Data, _queryURL_EventSubmit + '/' + eventUid, "PUT"
			, function()
			{	
				RESTUtil.getAsynchData( me.getEventDataUrl( eventUid )
					, function( json_Event )
					{				
						// Clear all coloring
						trCurrent.find( "td.added" ).find( "input,select" ).each( 
							function () 
							{
								Util.paintResult( $(this), false );
							}
						);

						trCurrent.find( "[status='checking']" ).each( 
							function () 
							{
								$(this).attr( "status", "updated" );				 
								Util.paintResult( $(this), true );
							}
						);
						
						if ( successAction !== undefined ) successAction( json_Event );
					});
			}
			, function()
			{
				alert( $( 'span.msg_EventUpdateFailed' ).text() );
			}
		);
		
	}


	me.eventUpdatePartial = function( tag, eventId, successAction )
	{
		// Check the Validation
		if ( me.validateEventDEControlVal( tag ) )
		{
			var dataElementId = tag.closest( "td" ).attr( "DEID" );
			
			if ( Util.checkValue( eventId ) && Util.checkValue( dataElementId ) )
			{
				var dataValue = me.getDataValue_FromTag( tag );
				
				var valType = tag.attr("valtype");
				if( valType == "COORDINATE" )
				{
					dataValue = me.validCoordinatorsValue( dataValue );
					tag.val( dataValue );
				}

				var dataElementValue = { "dataElement": dataElementId };

				if ( dataValue != "" ) dataElementValue.value = dataValue;

				var json_Data = { "dataValues": [ dataElementValue ] };


				var queryUrl = _queryURL_EventSubmit + '/' + eventId + '/' + dataElementId;

				RESTUtil.submitData( json_Data, queryUrl, "PUT"
				, function()
				{
					tag.attr( "status", "updated" );				 
					Util.paintResult( tag, true );
					
					if ( successAction !== undefined ) successAction();
				}
				, function()
				{
					tag.attr( "status", "failed" );
					Util.paintWarning( tag );

					alert( $( 'span.msg_EventUpdateFailed' ).text() );
				}
				);
			}	
		}
	};


	me.validCoordinatorsValue = function( coordinates )
	{
		coordinates = coordinates.replace("[", "").replace("]", "");
		
		if( _settingForm.DHISVersion !== undefined && _settingForm.DHISVersion !== "2.25" )
		{
			coordinates = "[" + coordinates + "]";
		}
		
		return coordinates;
	};
	
	me.validateEventDEControlVal = function( inputTag )
	{
		var pass = true;
		var valType = inputTag.attr( 'valType' );

		if ( valType !== undefined && valType != '' )
		{
			pass = FormUtil.validateValueType( inputTag, valType );
		}

		return pass;
	}


	me.checkCompulsoryData = function( trCurrent )
	{
		var pass = true;

		trCurrent.find( "td.added[compulsory='true']" ).find( FormUtil.getStr_Views() ).each( function( index ) 
		{
			var tag = $( this );
			
			var dataValue;

			// Check the class and covert the values
			if( tag.hasClass( "datepicker" ) )
			{
				dataValue = Util.formatDate( tag.val() );
			}
			else if( tag.hasClass( "checkbox" ) )
			{
				dataValue = tag.is( ":checked" ) ? "true" : "" ;
			}
			else
			{
				dataValue = tag.val();
			}

			if( !Util.checkValue( dataValue ) )
			{	
				Util.paintWarning( tag );
				pass = false;
			}
			else
			{
				Util.paintClear( tag );
			}
		});

		if ( !pass )
		{
			alert( $( 'span.msg_CompulsoryFill' ).text() );
		}

		return pass;
	}


	me.generateJSON_AllDataColumns = function( trCurrent )
	{
		var dataValues = new Array();

		trCurrent.find( "td.added" ).find( FormUtil.getStr_Views() ).each( function ( i ) 
		{
			var item = $(this);

			var dataElementUID = item.closest( "td" ).attr( "DEID" );

			if ( Util.checkValue( dataElementUID ) )
			{
				var dataValue = me.getDataValue_FromTag( item );

				if( Util.checkValue( dataValue ) )
				{						
					dataValues.push( { "dataElement": dataElementUID, "value": dataValue } );

					me.setStatusChecking( item, true );
				}
				else
				{
					me.setStatusChecking( item, false );
				}
			}

		});

		return dataValues;
	}


	me.getDataValue_FromTag = function( tag )
	{
		var dataValue = "";

		// Check the class and covert the values
		if( tag.hasClass( "datepicker" ) )
		{
			dataValue = Util.formatDate( tag.val() );
		}
		else if( tag.hasClass( "checkbox" ) )
		{
			dataValue = tag.is( ":checked" ) ? "true" : "" ;
		}
		else
		{
			dataValue = tag.val();
		}
	
		return dataValue;				
	}


	me.setStatusChecking = function( tag, isChecking )
	{
		var checkingStr = ( isChecking ) ? "checking" : "";

		tag.attr( "status", checkingStr );
	}


	me.setCoordinateData = function( coordinate, eventCoorLatTag, eventCoorLngTag )
	{
		me.setStatusChecking( eventCoorLatTag, false );
		me.setStatusChecking( eventCoorLngTag, false );
		
		if ( Util.checkValue( eventCoorLatTag.val() ) ) 
		{
			coordinate.latitude = eventCoorLatTag.val();
			me.setStatusChecking( eventCoorLatTag, true );
		}

		if ( Util.checkValue( eventCoorLngTag.val() ) ) 
		{
			coordinate.longitude = eventCoorLngTag.val();
			me.setStatusChecking( eventCoorLngTag, true );
		}
	}


	// Event Search from default setting - populate
	me.getEventsDefaultPopulate_SearchUrl = function()
	{				
		return me.buildSearchURLByParameter( me.TabularDEObj.getEventQueryBaseUrl() );
	}

	
	me.getTEIFromEvents_SearchUrl = function()
	{
		return me.buildSearchURLByParameter( me.TabularDEObj.getTEIFromEventQueryBaseUrl() );
	}


	me.buildSearchURLByParameter = function( baseURL )
	{
		var orgUnitId = me.TabularDEObj.getOrgUnitId();
		var programId = me.TabularDEObj.getSelectedProgramId();
		var startDate = me.TabularDEObj.getDefaultStartDate();
		var endDate = me.TabularDEObj.getDefaultEndDate();
		
		var searchAllProgramStr = "";

		if ( !me.TabularDEObj.isCase_SearchAllProgram() && Util.checkValue( programId ) )
		{
			searchAllProgramStr = '&program=' + programId;
		}

		return baseURL 
		+ '&orgUnit=' + orgUnitId 
		+ '&startDate=' + $.format.date( startDate, _dateFormat_YYYYMMDD_Dash ) 
		+ '&endDate=' + $.format.date( endDate, _dateFormat_YYYYMMDD_Dash ) 
		+ searchAllProgramStr; 
	}

	
	me.getEventsSearchUrl = function( personId )
	{
		var returnUrl = "";


		// If list All perosn historical events flag is set, remove the date/program/orgUnit filter.
		if ( me.TabularDEObj.isCase_ListAllPersonHistoricalEvents() && me.TabularDEObj.isCase_MEwR() )
		{
			returnUrl = me.TabularDEObj.getEventQueryBaseUrl();
		}
		else
		{
			returnUrl = me.getEventsDefaultPopulate_SearchUrl();
		}

		if ( Util.checkValue( personId ) )
		{
			returnUrl += '&trackedEntityInstance=' + personId;
		}

		return returnUrl;
	}


	me.getUnregisteredEventsSearchUrl = function( personId )
	{
		return me.TabularDEObj.getEventQueryBaseUrl() 
		+ '&trackedEntityInstance=' + personId 
		+ '&program=' + me.TabularDEObj.getSelectedProgramId();				
	}

	me.getEventDataUrl = function( eventId )
	{
		return _queryURL_ProgramStageInstance + '/' + eventId + ".json";	
	}
	
	
	// -------------------------------------
	// -- Populate Events Related ----------

	me.populateEvents = function( trPerson, item_EventTable, json_Events )
	{
		if( item_EventTable != undefined )
		{
			//var orgUnitUid = me.TabularDEObj.getOrgUnitId();
			item_EventTable.find( "tr.trEventData" ).remove();
			item_EventTable.find( "tr.trEventHead th.added" ).remove();
		}
		
		if( Util.checkDataExists( json_Events ) )
		{
			$.each( json_Events, function( i_event, item_event ) 
			{
				// Create the new event row - simply get basic info
				me.addNewLastRow_Event( trPerson, item_EventTable, item_event.program );

				// Populate Event Columns and Data.
				me.populateEventData( item_EventTable, item_event );
				
			});
		}
		
		
		// Check if this event should be disabled ( belongs to the settings )
		for( var i in json_Events ){
			var event = json_Events[i];
			if ( event.eventDate !== undefined )
			{
				var relativePeriod = new RelativePeriod();
				var eventDate = event.eventDate;
				
				var programSelected = me.TabularDEObj.searchPanel.defaultProgramTag.find("option:selected");
				var expiredPeriodType = programSelected.attr("peType");
				var expiryDays = programSelected.attr("expiryDays");
				var completeEventsExpiryDays = programSelected.attr("completeEventsExpiryDays");
				
				var lockFormSign = relativePeriod.lockDataFormByEventDate( !me.TabularDEObj.isCase_MEwR(), event, expiredPeriodType, expiryDays, completeEventsExpiryDays );
				
				// Display [Delete] button for open event
				if( lockFormSign != EventStatus.SIGN_SEwR_EVENT_OPEN
					&& lockFormSign != EventStatus.SIGN_SEwoR_EVENT_OPEN  )
				{
					item_EventTable.find("tr[uid='" + event.event + "']").find("input,select").each( function(){
						Util.disableTag( $(this), true );
					});
				}
			}
		}
		
	}

	me.populateEventData = function( tableCurrent, item_event )
	{
		var trHead = tableCurrent.find( "tr.trEventHead:first" );
		var trCurrent = tableCurrent.find( "tr.trEventData:last" );


		// -----------------------------------------------
		// --- STEP 1. Populate first 3 row - Event date, program, stage
		var eventDate = trCurrent.find( "input.eventDate" );
		var eventOrgUnit = trCurrent.find( "span.eventOrgUnit" );
		var eventProgram = trCurrent.find( "select.eventProgram" );
		var eventStage = trCurrent.find( "select.eventStage" );
		var eventStatus = trCurrent.find( "span.eventStatus" );
		var eventDel = trCurrent.find( "input.eventDelete" );

		if ( item_event.eventDate !== undefined )
		{
			eventDate.val( Util.formatDateBack( item_event.eventDate ) );
			
			// Check if the selected event date is in the range			
			me.checkDateEventOutOfDateRange( eventDate );
		}
		
		// Select Program/ProgramStages <-- if not in select option, add one.
		Util.selectOption_WithOptionalInsert( eventProgram, item_event.program, me.TabularDEObj.getProgramList_Full(), "displayName" );
		
		Util.selectOption_WithOptionalInsert( eventStage, item_event.programStage, me.TabularDEObj.getProgramStageList_Full(), "displayName" );
		//eventProgram.val( item_event.program );
		//eventStage.val( item_event.programStage );

		eventStage.attr( "selectedProgramStage", item_event.programStage ); 

		// Disable 3 rows
		// put event id
		trCurrent.attr( "uid", item_event.event );	
		

		// Set Event Org Unit Name - only for MEwR case.
		if ( !me.TabularDEObj.isCase_SEwoR() )
		{
			if ( Util.checkValue( item_event.orgUnitName ) )
			{
				eventOrgUnit.text( item_event.orgUnitName );
			}
			else if ( Util.checkValue( item_event.orgUnit ) )
			{
				me.TabularDEObj.dataInMemory.retrieveOrgUnitName( item_event.orgUnit, function( json_OrgUnit ) 
				{
					eventOrgUnit.text( json_OrgUnit.name );
				});
			}
		}


		// -----------------------------------------------
		// --- STEP 2. Render the program stage selected data element controls

		// Populate the data element columns
		me.populateEventColumnsAndData( trHead, trCurrent, item_event.programStage, function() 
		{ 
			me.setEventFixedColumn_ForExisting( trCurrent, item_event );
		}
		, item_event );

	}

	me.getHiddenDataElementsInSettings = function( returnFunc )
	{
		var deList = [];
		_settingForm.getSettingData( function( settingData ){
			if( settingData.orgUnitGroups != undefined )
			{
				for( var i in settingData.orgUnitGroups )
				{
					var ouGroupSetting = settingData.orgUnitGroups[i];
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

	me.populateCoordinateTagData = function( coordinate, latTag, lngTag )
	{
		if ( coordinate !== undefined )
		{
			if ( coordinate.latitude !== undefined ) latTag.val( coordinate.latitude );
			if ( coordinate.longitude !== undefined ) lngTag.val( coordinate.longitude );
		}
	}

	// -- Populate Events Related ----------
	// -------------------------------------


	me.retreivePersonListWithEvents = function( returnFunc )
	{
		var personEventList = new Array();

		//var requestUrl = me.getEventsDefaultPopulate_SearchUrl();
		var requestUrl = me.getTEIFromEvents_SearchUrl();


		// Get the search criteria Events
		RESTUtil.getAsynchData( requestUrl, function( json_Events ) 
		{
			// Sort the personInfo here.
			if ( json_Events.eventRows !== undefined )
			{
				// Use this personLis to group the events under?
				personEventList = me.createPersonEventList( json_Events.eventRows );
			}						

			// Empty personObjList_Sorted..
			returnFunc( personEventList );

		}
		, function() 
		{
			console.log( 'Failed to query events' );
			returnFunc( personEventList );
		} 
		, DialogLoading.open
		, DialogLoading.close				
		);

	}


	me.createPersonEventList = function( eventTEIs )
	{
		var personList = new Array();

		$.each( eventTEIs, function( i_eventTEI, item_eventTEI ) 
		{
			if ( Util.checkValue( item_eventTEI.trackedEntityInstance ) )
			{
				var personObj = me.getPersonObject( personList, item_eventTEI );
										
				personObj.eventRows.push( item_eventTEI );
			}
		});

		return personList;
	}


	me.getPersonObject = function( personList, eventTEI )
	{
		var personObj = Util.getFromList( personList, eventTEI.trackedEntityInstance, 'trackedEntityInstance' );

		if ( personObj === undefined )
		{
			personList.push( { 'trackedEntityInstance': eventTEI.trackedEntityInstance, 'attributes': eventTEI.attributes, 'orgUnit': eventTEI.orgUnit, 'orgUnitName': eventTEI.orgUnitName, 'eventRows': [] } );

			personObj = Util.getFromList( personList, eventTEI.trackedEntityInstance, 'trackedEntityInstance' );
		}

		return personObj;
	}

}
