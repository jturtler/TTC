
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
	
	me.trTemplate_EventRow = "<td class='orig'><select class='catOption' style='margin: 1px 1px;'/><input type='text' class='eventDate datepicker' caltype='upToToday' size='12'><br><span class='eventOrgUnit'></span> </td>"
		+ "<td class='orig'><div><select class='eventProgram' style='margin: 1px 1px;display:none;' />"
			+	"<div class='eventProgramDiv divReadOnly'></div></div>"
			+	"<div><select class='eventStage' style='margin: 1px 1px;'/><div class='eventStageDiv  divReadOnly'></div></div><div><button class='eventCreate button smallRoundButton' style='font-size: 10px;' >&nbsp;&nbsp;<span nameId='CreateEvent' style='font-size: 10px;'>Create</span>&nbsp;&nbsp;</button></div></td>"
		
		+ "<td class='orig' align='center'><span class='eventStatus' style='font-size: 11px;'></span></td>"
		//	+ "<div>" + me.buttonTemplate_Complete + "</div></td>"

		+ "<td class='orig tdEventDelete'><input type='image' class='eventRowDelete dimImgWHover' alt='Delete Row' title='Delete Row' src='img/cross.png' style='border: 0px solid;' /><input type='image' class='eventDelete dimImgWHover' alt='Delete Event' title='Delete Event' src='img/cross.png' style='display:none; border: 0px solid;' /></td>";

	me.AttributeControlsTemplate = "<input type='text' class='datepicker' style='display:none;' size='11' /><input class='textbox' style='display:none;' type='text' size='25' height='20px' /><textarea class='textarea' style='display:none;' cols='15' rows='2'></textarea><input class='checkbox' style='display:none;' type='checkbox' /><select class='dropdown' style='display:none;'><option value=''>" + l10n.get('selectValue') + "</option></select><span class='labelMsg' style='display:none;'></span>";  
	// Should use separate for 'AttributeControl'
	// Larger Text fields, etc..

	me.thTemplate_CompleteButton = "<th class='added' colcount='' type='completed_button'>&nbsp;</th>";
	me.tdTemplate_CompleteButton = "<td class='added' type='completed_button' colcount=''>" + me.buttonTemplate_Complete + "</td>";

	me.eventsLoadedJson = {};	// saved/loaded events data (from retrieval), to be used on update

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
		var catOption = trCurrent.find( ".catOption" );
		var eventCreateTag = trCurrent.find( ".eventCreate" );

		// Disable the button initially
		Util.disableTag( eventCreateTag, true );

		if ( Util.checkCalendarDateStrFormat( eventDate.val() ) )
		{
			if ( catOption.val() != '' && ( me.TabularDEObj.isCase_SEwoR() || eventStage.val() != '' ) )
			{
				Util.disableTag( eventCreateTag, false );
			}
			else if( catOption.val() == "" && catOption.find("option").length == 1 )
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
		var catOption = trCurrent.find( ".catOption" );
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

		// Populate catOption list
		if( Util.checkValue( eventProgram.val() ) )
		{
			// Load CatOptionCombo list by selected program
			me.TabularDEObj.populateCatOptionCombos( catOption, me.TabularDEObj.getSelectedCategoryOptionId() );
			catOption.find("option[value='ALL']").remove();
			catOption.find("option[value='" + _settingForm.defaultCatOption.id + "']").remove();
			
			if( me.TabularDEObj.getSelectedCategoryOptionId() == "ALL" )
			{
				catOption.show();
			}
			else
			{
				catOption.hide();
			}
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
		if( validEventDateRange.startDate !== undefined )
		{
			if( validMinDateStr >= startDateStr && validMinDateStr <= endDateStr ) // startDateStr <= validMinDateStr <= endDateStr
			{
				defaultDate = $.format.date( validEventDateRange.startDate, _dateFormat_YYYYMMDD );
			}
			else
			{
				defaultDate = "";
			}
		}
		
		if( startDateStr <= todayStr && todayStr <= endDateStr ) // startDateStr <= todayStr <= endDateStr 
		{
			eventDate.val( $.format.date( new Date(), _dateFormat_YYYYMMDD ) );
		}
		else if( validEndDateStr <= startDateStr )
		{
			eventDate.val( $.format.date( validEventDateRange.startDate, _dateFormat_YYYYMMDD ) );
		}
		else
		{
			defaultDate = "";
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

		
		// On catOption change, check catOption value and event date value.
		catOption.change( function() 
		{
			me.setEventCreateButtonEnable( trCurrent );

			catOption.focus();
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
			var programStageId = eventStage.val();

			// Check eventDate and eventStage value
			if ( Util.checkCalendarDateStrFormat( eventDate.val() ) && programStageId != ''  )
			{
				// 1. Generate the event and put the event id into the ..
				me.eventCreate( trCurrent
				, function( json_Event )
				{
					// Check for program stage 'non-repeatableness'
					// and add to 'DontStage' is applicable.
					var programStageJson = me.TabularDEObj.getProgramStageData_ById( programStageId );

					if ( me.TabularDEObj.isCase_MEwR() && Util.checkDefined( programStageJson ) && Util.checkDefined( programStageJson.repeatable ) &&  !programStageJson.repeatable )
					{
						// Add this uid to the doneStage
						me.TabularDEObj.addTo_DoneStage( trPerson, programStageId );
					}


					eventStage.attr( "selectedProgramStage", programStageId ); 

					// 2. Populate the data element columns
					me.populateEventColumnsAndData( trHead, trCurrent, programStageId
					, function()
					{	
						// TODO: 2.30 - Coordinate captured populating on Event Row Add/Create
						// Populate coordinate if data is available
						if ( _enableCoordinateCapture && json_Event.coordinate !== undefined )
						{
							// Put coordinate values to input tags
							me.populateCoordinateTagData( json_Event.coordinate, trCurrent.find( "input.eventCoorLat" ), trCurrent.find( "input.eventCoorLng" ) );
						}
			
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


		// TODO: 2.30, Set Div tag in each TD
		trCurrent.find( 'td' ).wrapInner( "<div class='tdContentDiv'></div>" );

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
		eventDateColTag.find( "div.warningMsg[type='eventDateRange']" ).remove();
			
		if( eventDateStr < startDateStr || eventDateStr > endDateStr )
		{
			var warningMsg = l10n.get( 'eventDataOutOfRange' );
			me.appendWarningMsg( eventDateColTag, warningMsg, 'eventDateRange' );
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
	
	//json_Data.coordinate = { "latitude": geoLoc.coords.latitude, "longitude": geoLoc.coords.longitude };		
	// populate with current one? <-- only on Add new!			


	me.eventCreate = function( trCurrent, successFunc )
	{
		//var returnVal = false;

		// check date, program, programstage
		// var _enableCoordinateCapture = me.TabularDEObj.getSelectedProgram().featureType;
		// _enableCoordinateCapture = ( _enableCoordinateCapture == undefined || _enableCoordinateCapture == "NONE" ) ? false : true;

		var eventDate = trCurrent.find( "input.eventDate" );
		var eventProgram = trCurrent.find( "select.eventProgram" );
		var eventStage = trCurrent.find( "select.eventStage" );
		var catOption = trCurrent.find( "select.catOption" );
		//var eventStatus = trCurrent.find( "span.eventStatus" );

		var eventDel = trCurrent.find( "input.eventDelete" );

		var personUid = trCurrent.closest( '.trPersonDetail' ).attr( 'uid' );
		var orgUnitUid = me.TabularDEObj.getOrgUnitId();
		var orgUnitJson = me.TabularDEObj.getOrgUnitJson();

		var eventDateInFormat = Util.formatDate( eventDate.val() );

		if ( me.checkOrgUnitOpenCloseDate( orgUnitJson, eventDateInFormat, true ) )
		{
			//var json_Data = {"program": eventProgram.val(), "programStage": eventStage.val(),"orgUnit": orgUnitUid, "eventDate": eventDateInFormat, "coordinate": {}, "status": _status_ACTIVE, "attributeCategoryOptions" : catOption.val() };
			var json_Data = {"program": eventProgram.val(), "programStage": eventStage.val(),"orgUnit": orgUnitUid, "eventDate": eventDateInFormat, "status": _status_ACTIVE, "attributeCategoryOptions" : catOption.val() };

			// TODO: 2.30 ALSO, ASK COORDINATES HERE?
			FormUtil.checkGeoLocation( _enableCoordinateCapture, function( geoLoc )
			{						
				// if ( geoLoc ) FormUtil.setGeometryJson( json_Data, geoLoc.coords );
				if ( geoLoc ) FormUtil.getCoordinateJson( json_Data, geoLoc.coords );

				// Disable catOption selector
				var catOption = trCurrent.find( ".catOption" );
				Util.disableTag( catOption, true );

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
			});
		}
	}


	me.checkOrgUnitOpenCloseDate = function( orgUnitJson, eventDateInFormat, alert )
	{	
		var passed = true;

		try
		{
			var eventDateObj = new Date( eventDateInFormat );
	
			if ( orgUnitJson.openingDate )
			{
				var ouOpenDateStr = Util.formatDate( orgUnitJson.openingDate );
				var ouOpenDate = new Date( ouOpenDateStr );
	
				if ( eventDateObj.getTime() < ouOpenDate.getTime() )
				{
					if ( alert ) alert( 'event date is before OrgUnit Open date, ' + ouOpenDateStr );
					passed = false;
				}
			}
	
			if ( orgUnitJson.closedDate )
			{				
				var closedDateStr = Util.formatDate( orgUnitJson.closedDate );
				var ouClosedDate = new Date( closedDateStr );
	
				if ( eventDateObj.getTime() > ouClosedDate.getTime() )
				{
					if ( alert ) alert( 'event date is after OrgUnit Closed date, ' + closedDateStr );
					passed = false;
				}
			}
		}
		catch ( e )
		{
			if ( alert ) alert( 'FAILED during OrgUnit Open/Close Date with event date.' );
			passed = false;
		}


		return passed;
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
						trCurrent.attr( "eventStatus", "ACTIVE" );
						
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
	
	
	me.setStatusRelated = function( trCurrent, json_Event, programStageId )
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
		if ( !status ) status = "";

		// Set Status Display		// TODO: 2.30 - IF STATUS MSG IS EMTPY, ADD OVERRIDING TEXT
		var statusMsg = ( me.TabularDEObj.isCase_MEwR() ) ? EventStatus.SEwR_EVENT_STATUS[status] : EventStatus.SEwoR_EVENT_STATUS[status];
		if ( !statusMsg ) statusMsg = '<span style="font-style: italic; font-color: #555;">' + status + '</span>'; 

		eventStatus.html( statusMsg );
		eventStatus.attr( "status", status ); // ?? json_Event.status and 'status' by 'getEventStatus' is a bit different..?

		
		// remove previous Delete click event
		eventDel.off( 'click' );
		eventRowDel.off( 'click' );
		eventDel.click( function() { me.eventDelete( trCurrent, json_Event.event ); });
			
		try
		{
			if( status == EventStatus.SIGN_SEwR_PROGRAM_INACTIVE
				|| status == EventStatus.SIGN_SEwR_PROGRAM_COMPLETED )
			{
				me.disableAllEventsRow_inTei( trCurrent.closest( "div.divPersonDetail" ), "Events Disabled: Program inactive/completed", "programNA" );
			}
			else if( status == EventStatus.SIGN_SEwR_EVENT_OPEN
				|| status == EventStatus.SIGN_SEwoR_EVENT_OPEN )
			{
				// Delete related
				eventDel.show();
				
				// Complete related
				eventComplete.show();
	
				eventComplete.off( "click" ).on( "click", function() 
				{
					me.completeEvent( trCurrent, json_Event, programStageId, status );
				});
				
				eventIncomplete.hide();
				
				// Show 'Add new event' button if Active program
				var personUid = trCurrent.closest("tr.trPersonDetail").attr("uid");
				var personTag = me.mainSection_PersonTag.find("tr.trPerson[uid='" + personUid + "']");
			}
			else if( status == EventStatus.SIGN_SEwR_EVENT_COMPLETED_CAN_REOPEN
				|| status == EventStatus.SIGN_SEwoR_EVENT_COMPLETED_CAN_REOPEN )
			{
				eventDel.show();
			
				// TODO - Remove the checking userrole so that "Incomplete" button will be displayed based on completed expire days
				// In-Complete related
				// me.TabularDEObj.checkIncompleteAction_UserRole( function() 
				// {
				// 	eventIncomplete.show();
				// });
				
					
				// eventIncomplete.show();
				
				/* trCurrent.find("input,select").each( function(){
					Util.disableTag( $(this), true );
				}); */
				
				eventIncomplete.show();
				eventIncomplete.off( "click" ).on( "click", function() 
				{
					me.incompleteEvent( trCurrent, json_Event, programStageId );
				});

				me.TabularDEObj.dataInMemory.retrieveProgramStageData( programStageId, function( programStageJson )
				{	
					if ( programStageJson.blockEntryForm )
					{
						me.TabularDEObj.checkIncompleteAction_UserRole( function() 
						{
							Util.disableTag( eventIncomplete, false );
						}, function(){
							Util.disableTag( eventIncomplete, true ); // No 'uncomplete' authority
							eventIncomplete.attr( "title", "This stage is blocked after completion. You will need the authority 'uncomplete' if you want to re-open it");
						});

						// Disable all the DataElements controls - move the control rendering area..
						me.setEventDEControlDisable( trCurrent );

						me.appendWarningMsg_Tr( trCurrent, "EventEntry Blocked: Event completed with block entry", "completed" );

					}
					else
					{
						Util.disableTag( eventIncomplete, false ); // Allow to edit
					}

					// // Disable all the DataElements controls - move the control rendering area..
					// me.setEventDEControlDisable( trCurrent );

					// me.appendWarningMsg_Tr( trCurrent, "EventEntry Blocked: Event completed with block entry", "completed" );
					
				});
				
				eventComplete.hide();
				eventDel.show();
			}
			else // if( status == EventStatus.SIGN_SEwoR_EVENT_COMPLETED_EXPIRED || status == EventStatus.SIGN_SEwR_EVENT_COMPLETED_LOCKED )
			{
				eventIncomplete.hide();
				eventComplete.hide();


				trCurrent.find("input,select").each( function(){
					Util.disableTag( $(this), true );
				});

				// eventDel.hide();
				eventDel.show();
				
				me.setEventFixedColumnDisable( trCurrent );
				me.setEventDEControlDisable( trCurrent );					
				Util.paintClear( eventProgramDiv );
				Util.paintClear( eventStageDiv );
	
				eventProgramDiv.css( 'color', '#80808F' );
				eventStageDiv.css( 'color', '#80808F' );
			}
			
		}
		catch( e )
		{
			console.log( 'Error setting status' );
			console.log( e );
		}


		// ABOVE FAILS SOMETIME??

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
			

			// TODO: WE SHOULD WRITE NOTE ABOUT 'DONE' STAGE!!!


			// But we should add Event Button always.. Regardless of stage population..
			//if( eventStage.find("option").length >= 1 )
			//if( eventStage.find("option").length > 1 )
			//{
				addNewEventRowButton.show();
			//}
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

		// if this 'completeEventsExpiryDays'/'expiryDays' set to "0", this should be considered unset.
		if ( completeEventsExpiryDays === "0" ) completeEventsExpiryDays = "";
		// if ( expiryDays === "0" ) expiryDays = "";

		return relativePeriod.lockDataFormByEventDate( !me.TabularDEObj.isCase_MEwR(), event, expiredPeriodType, expiryDays, completeEventsExpiryDays );
	};

	me.setEventFixedColumn_ForExisting = function( trCurrent, json_Event )
	{
		// Event date might have not been populated on loading events at this point
		//var eventDate = trCurrent.find( "input.eventDate" );
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
			me.TabularDEObj.dataInMemory.retrieveProgramStageData( selectedStageId, function( programStageJson )
			{
				eventStageDiv.text( programStageJson.displayName );
				eventStageDiv.attr( 'uid', programStageJson.id );
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


	me.completeEvent = function( trCurrent, eventUid, programStageId, status )
	{		
		if ( me.checkCompulsoryData( trCurrent ) && ProgramRuleUtil.checkProgramRuleData( trCurrent ) )
		{
			var canCompleted = true;
			var errorOnCompleteTags = trCurrent.find('img.errorOnComplete');
			if( errorOnCompleteTags.length > 0 )
			{
				message = $( 'span.Msg_ConfirmEventErrorOnComplete' ).text();
				for( var i=0; i<errorOnCompleteTags.length; i++ )
				{
					message += "\n - " + $(errorOnCompleteTags[i]).attr("title");
				}
				alert( message );
				canCompleted = false;
			}
			else
			{
				var messageTag = $( 'span.msg_ConfirmEventComplete' );
				var message = messageTag.text();

				var warmingOnCompleteTags = trCurrent.find('img.warmingOnComplete');
				if( warmingOnCompleteTags.length > 0 )
				{
					messageTag = $( 'span.Msg_ConfirmEventWarmingOnComplete' );
					message = messageTag.text();
					for( var i=0; i<warmingOnCompleteTags.length; i++ )
					{
						message += "\n - " + $(warmingOnCompleteTags[i]).attr("title");
					}
				}
				
				if( confirm( message ) )
				{
					me.eventUpdate( trCurrent, _status_COMPLETED
						, function( json_Event )
						{
							
							trCurrent.attr( "eventStatus", "COMPLETED" );

							// TODO - Always lock form after completing an event
							/* if( status == EventStatus.SIGN_SEwoR_EVENT_COMPLETED_EXPIRED || status == EventStatus.SIGN_SEwR_EVENT_COMPLETED_LOCKED )
							{
								trCurrent.find("input,select").each( function(){
									Util.disableTag( $(this), true );
								});
							} */
							

							/* if( status == EventStatus.SIGN_SEwoR_EVENT_COMPLETED_EXPIRED || status == EventStatus.SIGN_SEwR_EVENT_COMPLETED_LOCKED )
							{
								trCurrent.find("input,select").each( function(){
									Util.disableTag( $(this), true );
								});
							} */

							
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
		else
		{
			alert( $( 'span.msg_ErrorEventComplete' ).text() );
		}
	}


	me.incompleteEvent = function( trCurrent, json_Event, programStageId )
	{	
		if( confirm( $( 'span.msg_ConfirmEventIncomplete' ).text() ) )
		{
			
			me.eventUpdate( trCurrent, _status_ACTIVE
				, function( json_Event )
				{
					trCurrent.attr( "eventStatus", "ACTIVE" );

					trCurrent.find("input,select").each( function(){
						Util.disableTag( $(this), false );
					});
						
					// Disable catOption dropbox
					var catOption = trCurrent.find( ".catOption" );
					Util.disableTag( catOption, true );
					
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

	//me.disableEventRow = function( trCurrent)
	// COMBINATION OF me.setEventDEControlDisable && me.setEventFixedColumnDisable


	me.addEventRow = function( newRowCount, tableCurrent )
	{

		var lastRow = $( '<tr class="trEventData" uid=""></tr>' );
		var rowDivTag = $( '<div class="rowDiv"></div>')
		lastRow.append( rowDivTag );
		
		rowDivTag.append( me.trTemplate_EventRow );



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
	console.log("populateEventsByPersonId");	
		// me.getUnregisteredEventsByPersonId( personId, divPersonDetailTag, function( events_unregistered )
		// {
			// Retrieve registered events
			var requestUrl = me.getEventsSearchUrl( personId );
			var json_EventList = new Array();
			var tbEvents = divPersonDetailTag.find( ".tbStyle_PersonDetail" );

			RESTUtil.getAsynchData( requestUrl, function( data )
			{	
				var enrollments = data.enrollments;

				var json_EventList = [];
				
				var orgUnitId = me.TabularDEObj.getOrgUnitId();
				var programId = me.TabularDEObj.getSelectedProgramId();
				var startDate =  $.format.date( me.TabularDEObj.getDefaultStartDate(), _dateFormat_YYYYMMDD_Dash );
				var endDate = $.format.date( me.TabularDEObj.getDefaultEndDate(), _dateFormat_YYYYMMDD_Dash );
				var catOptionURLParam =  me.TabularDEObj.getSelectedCategoryOptionId(); // == "ALL" 
	
				for( var i=0;i<enrollments.length; i++ )
				{
					var events = enrollments[i].events;
					if( events !== undefined )
					{
						for( var j=0; j<events.length; j++ )
						{
							var event = events[j];
							
							// This condition ( event.eventDate != undefined )  is used to check if an event was generated by enrolment and didn't have eventDate yet
							if( ( event.eventDate != undefined ) 
								&& ( catOptionURLParam == "ALL" || catOptionURLParam == event.attributeCategoryOptions )
								&& ( event.eventDate.substr(0,10) >= startDate && event.eventDate.substr(0,10) <= endDate 
									&& event.orgUnit == orgUnitId && event.program == programId ) )
							{
								json_EventList.push( event );
							}
						}
					}
				}
				

				
				// // Combine unregistered and registered events
				// if ( Util.checkDataExists( events ) )
				// {
				// 	var json_EventList_Sorted = Util.sortByKey(  events, "eventDate" );

				// 	json_EventList = $.merge( events_unregistered, json_EventList_Sorted );
				// }
				// else if ( events_unregistered.length > 0 )
				// {
				// 	json_EventList = events_unregistered;
				// }

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
		// });
	}

	me.getUnregisteredEventsByPersonId = function( personId, divPersonDetailTag, returnFunc )
	{
		var json_EventList = new Array();
		var requestUrl = me.getUnregisteredEventsSearchUrl( personId );
console.log("getUnregisteredEventsByPersonId" + requestUrl );
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
	/* me.retrieveAndPopulateEvents = function( tableCurrent, execFunc )
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
	} */

	// To be executed by 'Populate' button. - if Program is SEwoR.
	me.retrieveAndPopulateEvents = function( tableCurrent, execFunc )
	{
		// Step 1. Clear the person/event data table
		me.clearEventList();
		me.eventList = [];
		
		if( me.TabularDEObj.getSelectedCategoryOptionId() == "ALL" )
		{
			var categoryOptions = JSON.parse(JSON.stringify(me.TabularDEObj.getSelectedProgram().categoryOptions));
			categoryOptions.push( _settingForm.defaultCatOption );
			me.catOptionTotal = categoryOptions.length;
			me.catOptionEventIdx = 0;
			
			for( var i in categoryOptions )
			{
				var catOptId = categoryOptions[i].id;
				me.retrieveEvents( catOptId, tableCurrent, execFunc );	
			}
		}
		else
		{
			me.catOptionTotal = 1;
			me.catOptionEventIdx = 0;
			me.retrieveEvents( undefined, tableCurrent, execFunc );	
		}
	}
	
	
	me.retrieveEvents = function( catOptionId, tableCurrent, execFunc )
	{
		var requestUrl = me.getEventsSearchUrl( undefined, catOptionId );
		
		RESTUtil.getAsynchData( requestUrl, function( json_Events )
		{
			if ( Util.checkDataExists( json_Events.events ) )
			{
				me.eventList = me.eventList.concat( json_Events.events );
			}
			
			me.catOptionEventIdx++;
			if( me.catOptionEventIdx == me.catOptionTotal )
			{
				var json_EventList_Sorted = Util.sortByKey( me.eventList, "eventDate" );

				me.populateEvents( undefined, tableCurrent, json_EventList_Sorted );

				var foundNo = json_Events.events.length;
				if ( foundNo == 0 )
				{
					// Create the new event row - simply get basic info
					me.addNewLastRow_Event( undefined, me.mainEventTableTag, me.TabularDEObj.getSelectedProgramId() );
				}

				execFunc( foundNo );
			}

		}
		, function( failed_Message )
		{
			execFunc( "0" );					

			alert( $( 'span.msg_EventRetrievalFailed' ).text() + '\n\n Error: ' + JSON.stringify( failed_Message ) );

		}
		, DialogLoading.open
		, DialogLoading.close					
		);
	}
	
	// =========================================================
	// Populate Event Column Related

	// Move this to populate Layout method section
	me.populateEventColumnsAndData = function( trHead, trCurrent, programStageId, runAfterwards_Func, item_event )
	{
		me.TabularDEObj.dataInMemory.retrieveProgramStageData( programStageId, function( programStageJson )
		{
			// NOTE: 2.30 moved to top
			var selectedProgram = me.TabularDEObj.getSelectedProgram();


			trCurrent.find( "td.added" ).html( "" ).attr( "DEID", "" );

			var count_columnExisting = trHead.find( ".added" ).length;
			//var count_dataElements = programStageJson.programStageDataElements.length;
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


			// TODO: 2.30 - COORDINATE INPUT DISPLAY
			if ( _enableCoordinateCapture && selectedProgram.captureCoordinates )
			{
				// CHECK THE ProgramStage Feature Type ---> if 'captureCoordinates', need to be 'POINT'
				if ( programStageJson.featureType === 'POINT' )
				{
					var coordinateControlTemplate = "<div id='eventCoordinateDiv'><table class='tbNone11'><tr><td><span style='font-size: 11px;'>Lat:</span></td><td><input type='text' class='eventCoorLat' size='7' " + _view + "='" + _view_Yes + "' + style='margin-bottom:1px;'/></td></tr><tr><td><span style='font-size: 11px;'>Long:</span></td><td><input type='text' class='eventCoorLng' size='7' " + _view + "='" + _view_Yes + "'/></td></tr></table></div>";
				}
				else
				{
					var coordinateControlTemplate = "<div id='eventCoordinateDiv'><span style='font-weight: bold; color: Red;' title='The programStage featureType needs to be POINT.'>*</span></div>"
				}

				me.setColumns_AddedPart( count_current++, count_columnExisting, trCurrent, trHead, undefined, "Coordinates", cssTH_DENameDisplay, cssTD_DENameDisplay, coordinateControlTemplate );	
			}
			

			// For each data elements, add column.
			me.getHiddenDataElementsInSettings( function(hiddenDEList){
				$.each( programStageJson.programStageDataElements, function( i, item ) {
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
			// var selectedProgram = me.TabularDEObj.getSelectedProgram();

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
			trCurrent.find( "td[colCount='" + i + "']" ).css("position", "relative").attr( "DEID", deId ).attr("compulsory", compulsory ).append( "<span class='dataElementName' " + cssTD_Name + ">" + titleName + compulsorySpan + ": </span>" + controlsTemplate );
		}
		else
		{
			// create the column
			trHead.append( "<th class='added' colCount='" + i + "'><span class='dataElementName' " + cssTH_Name + ">" + titleName + compulsorySpan + "</span>&nbsp;</th>" );

			trCurrent.append( "<td class='added' style='position:relative' DEID='" + deId + "' compulsory='" + compulsory + "'  colCount='" + i + "'><span class='dataElementName' " + cssTD_Name + ">" + titleName + compulsorySpan + ": </span>" + controlsTemplate + "</td>" );
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
						controlTag = me.setAndGetControlTag( tdTag, ".textbox" );
						
						// For Orgunit Field
						controlTag.click( function(){
							var gpsFieldTag = $(this).closest("tr").find("td[deid='VzOmsEZChev']").find("input,select");
							me.TabularDEObj.dataElementOrguUnitPopup.setInputTags( $(this), gpsFieldTag );
							me.TabularDEObj.dataElementOrguUnitPopup.openForm();
						});
					}
					else if( json_DataElement.optionSetValue || valType == "BOOLEAN" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".dropdown" );

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

								if ( deValue !== undefined ){
									var value = FormUtil.getFormattedAttributeValue( tdTag.attr("valType" ), deValue.value );
									controlTag.val( value );
								} 
							});
						}
					}
					else if( valType == "TEXT" || valType == "LETTER" || valType == "PHONE_NUMBER" 
						|| valType == "EMAIL" || valType == "COORDINATE" || valType == "URL" )
					{
						 controlTag = me.setAndGetControlTag( tdTag, ".textbox" );
					}
					else if( valType == "LONG_TEXT" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".textarea" );
					}
					else if ( valType.indexOf( "INTEGER" ) == 0 || valType == "UNIT_INTERVAL" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".textbox" ).attr( "size", "5" );
					}
					else if ( valType.indexOf( "INTEGER_NEGATIVE" ) == 0 )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".textbox" );
					}
					else if ( valType == "NUMBER" || valType == "PERCENTAGE" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".textbox" ).attr( "size", "8" );
					}
					else if( valType == "DATE" || valType == "AGE" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".datepicker" );
						Util.setupDatePicker( controlTag );
					}
					else if( valType == "TIME" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".datepicker" );
						Util.setTimePicker( controlTag );
					}
					else if( valType == "DATETIME" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".datepicker" );
						Util.setDateTimePicker( controlTag );
					}
					else if( valType == "TRUE_ONLY" ) //|| valType == "TRACKER_ASSOCIATE" )
					{
						controlTag = me.setAndGetControlTag( tdTag, ".checkbox" );
					}
					else
					{
						var textStr = "'" + valType + "' data type not supported";

						//alert( "Unknown Column(DataElement) Type Found.  [Name: " + json_DataElement.displayName + ", ID: " + json_DataElement.id + ", valueType: " + valType + "]" );
						controlTag = me.setAndGetControlTag( tdTag, ".labelMsg" ).html( '<span style="color:Red;">' + textStr + '</span>' );
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
						else if( valType == "DATETIME" )
						{
							controlTag.val( Util.formatDateTimeBack( deValue.value ) );
						}
						else if( valType == "TIME" )
						{
							controlTag.val( Util.formatTimeBack( deValue.value ) );
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
			controlTag = $( '<input class="datepicker" type="text" size="19" />' );
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
		else if ( className == '.labelMsg' )
		{
			controlTag = $( '<span class="labelMsg"></span>' );
		}
		else
		{
			controlTag = $( '<span class="labelMsg"></span>' );
		}

		controlTag.attr( _view, _view_Yes );

		inputTag.append( controlTag );

		return controlTag;
	}


	me.setEventFixedColumnDisable = function( trCurrent )
	{
		// .find( FormUtil.getStr_Views() )
		me.disableRowInputs( trCurrent.find( "td.orig" ) );
	}

	me.setEventDEControlDisable = function( trCurrent )
	{
		// .find( FormUtil.getStr_Views() )
		me.disableRowInputs( trCurrent.find( "td.added" ) );
	}

	// Set Event DataElement Controls
	// =========================================================



	// ==============================================
	// Event Save Related

	me.setEventDataSave = function( trCurrent )
	{
		// // TODO: 2.30 Only on matrix version, this was commented out.  Don't know why.
		// // Maybe we should only edit the date of active date?
		// trCurrent.find( "input.eventDate" ).datepicker( "option", "onSelect", function() 
		// {
		// 	me.setStatusChecking( $( this ), true );

		// 	me.eventUpdate( trCurrent );
		// });


		trCurrent.find( "input.eventCoorLat, input.eventCoorLng" ).change( function () 
		{
			me.eventUpdate( trCurrent );
		});


		// For event data element fields 
	
		trCurrent.find( "td.added input.datepicker" ).focusout( function () 
		{
			var cntrl = $( this );
			setTimeout( function() 
			{ 
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
		
		// var status = eventStatus.attr("status");
		var status = trCurrent.attr("eventStatus");

		if ( Util.checkValue( newStatus ) )
		{
			status = newStatus;
		}
		

		// TODO: 2.30 - WARNING..
		//	THIS SHOULD BE BASED ON LOADING EVENT JSON IN MEMORY!!!!!??		
		me.getEventFromMemeory( eventUid, me.eventsLoadedJson
		, function( eventJson ) 
		{
			//var json_Data = eventJson;		
			eventJson.program = eventProgram.val();
			eventJson.programStage = eventStage.attr( 'selectedprogramstage' );
			eventJson.orgUnit = me.TabularDEObj.getOrgUnitId();
			eventJson.eventDate = eventDateInFormat;
			eventJson.status = status;
			
			me.generateJSON_AllDataColumns( trCurrent );
		

			FormUtil.checkGeoLocation( _enableCoordinateCapture, function( geoLoc )
			{						
				// if ( geoLoc ) FormUtil.setGeometryJson( json_Data, geoLoc.coords );
				if ( geoLoc ) FormUtil.getCoordinateJson( eventJson, geoLoc.coords );


				// TODO: 2.30
				// if coordinates exists, add them.
				//me.setCoordinateData( json_Data.coordinate, eventCoorLat, eventCoorLng );
				me.setGeometryData( eventJson, eventCoorLat, eventCoorLng );

				// TODO: 2.30 - NOT NEEDED ANYMORE..
				// if ( !me.TabularDEObj.isCase_SEwoR() ) eventJson.trackedEntityInstance = personUid;  // <-- Do not need to 
		
		
				// TODO: 2.30 NEW
				var tdContentDivTags = trCurrent.find( 'div.tdContentDiv' );
		
				DivBlock.block( tdContentDivTags, "Updating.." );
				trCurrent.addClass( 'rowInProcess' );
		
		
				RESTUtil.submitData( eventJson, _queryURL_EventSubmit + '/' + eventUid, "PUT"
					, function()
					{	
						me.getEventById_WithSave( eventUid, me.eventsLoadedJson, function( json_Event )
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


							DivBlock.unblock( tdContentDivTags );
							trCurrent.removeClass( 'rowInProcess' );

							if ( successAction !== undefined && json_Event ) successAction( json_Event );
						});

					}
					, function()
					{
						alert( $( 'span.msg_EventUpdateFailed' ).text() );
						DivBlock.unblock( tdContentDivTags );
						trCurrent.removeClass( 'rowInProcess' );
					}
				);
			});
		});
	}

	me.getEventFromMemeory = function( itemId, memoryObj, returnFunc )
	{
		//	THIS SHOULD BE BASED ON LOADING EVENT JSON IN MEMORY!!!!!??		
		var itemJson = memoryObj[ itemId ];

		if ( !itemJson ) 
		{
			console.log( 'WARNING ON getFromMemeory - On Update, Event data not found from memory, thus retrieving manually!' );

			me.getEventById_WithSave( itemId, memoryObj, returnFunc );
		}
		else
		{
			returnFunc( itemJson );
		}
	}

	me.getEventById_WithSave = function( eventId, memoryObj, returnFunc )
	{
		RESTUtil.getAsynchData( me.getEventDataUrl( eventId )
		, function( eventJson )
		{	
			memoryObj[ eventJson.event ] = eventJson;	
			returnFunc( eventJson );		
		}
		, function()
		{
			alert( 'FAILED to retireve event ' + eventId );
			returnFunc();
		});
	}

	me.eventUpdatePartial = function( tag, eventId, successAction )
	{
		// Check the validation
		var passed = me.validateEventDEControlVal( tag );
		if ( passed == 0 ) // SUCCESS
		{
			var dataElementId = tag.closest( "td" ).attr( "DEID" );
			
			if ( Util.checkValue( eventId ) && Util.checkValue( dataElementId ) )
			{
				var dataValue = me.getDataValue_FromTag( tag );
				
				var valType = tag.attr("valtype");
				if( valType == "COORDINATE" )
				{
					dataValue = FormUtil.formatCoordinatorsValue( dataValue );
					tag.val( dataValue );
				}

				var dataElementValue = { "dataElement": dataElementId };

				if ( dataValue != "" ) dataElementValue.value = dataValue;

				var programId = me.TabularDEObj.getSelectedProgram().id;
				var json_Data = { "program": programId, "status": $(tag).closest("tr.trEventData").attr("eventStatus"), "dataValues": [ dataElementValue ] };

				FormUtil.checkGeoLocation( _enableCoordinateCapture, function( geoLoc )
				{						
					// if ( geoLoc ) FormUtil.setGeometryJson( json_Data, geoLoc.coords );
					if ( geoLoc ) FormUtil.getCoordinateJson( json_Data, geoLoc.coords );

					

					var queryUrl = _queryURL_EventSubmit + '/' + eventId + '/' + dataElementId;

					RESTUtil.submitData( json_Data, queryUrl, "PUT"
					, function()
					{
						tag.attr( "status", "updated" );		
						tag.data('val', tag.val());		 
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
				});
			}	
		}
		else if( passed == 1 )
		{
			alert( $( 'span.msg_WarmingMandatoryField' ).text() );
		}
	};


	me.validateEventDEControlVal = function( inputTag )
	{
		// 0: SUCCESS
		// 1: FAIL - COMPLETED Event with empty data for mandatory fields
		// 2: FAIL - Value type is wrong		
		var pass = 0; 

		var eventStatus = inputTag.closest("tr.trEventData").attr( "eventstatus" );
		var compulsory = eval( inputTag.closest("td").attr("compulsory" ) );
		var valType = inputTag.attr( 'valType' );

		if( eventStatus === "COMPLETED" && compulsory && inputTag.val() == "" )
		{
			var oldValue = inputTag.data('val');
			inputTag.val( oldValue );
			Util.paintLightGreen( inputTag );
			pass = 1;
		}
		else if ( valType !== undefined && valType != '' )
		{
			var checkedValueType = FormUtil.validateValueType( inputTag, valType );
			if( !checkedValueType ) pass = 2;
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


	me.generateJSON_AllDataColumns = function( trCurrent, dataValues )
	{
		var updateCase = false;

		if ( dataValues ) updateCase = true;
		else dataValues = new Array();

		trCurrent.find( "td.added" ).find( FormUtil.getStr_Views() ).each( function ( i ) 
		{
			var itemTag = $(this);

			var dataElementUID = itemTag.closest( "td" ).attr( "DEID" );

			if ( Util.checkValue( dataElementUID ) )
			{
				var dataValue = me.getDataValue_FromTag( itemTag );

				FormUtil.addItemJson( dataValues, dataElementUID, "dataElement", dataValue, updateCase
				, function() 
				{
					me.setStatusChecking( itemTag, true );
				}
				, function()
				{
					me.setStatusChecking( itemTag, false );
				});
			}

		});

		return dataValues;
	}


	me.getDataValue_FromTag = function( tag )
	{
		var dataValue = "";

		// Check the class and covert the values
		if( tag.attr("valType") == "DATE" )
		{
			dataValue = Util.formatDate( tag.val() );
		}
		else if( tag.attr("valType") === "TIME" )
		{
			dataValue = Util.formatTime( tag.val() );
		}
		else if( tag.attr("valType") === "DATETIME" )
		{
			dataValue = Util.formatDateTime( tag.val() );
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

	me.setGeometryData = function( json_Data, eventCoorLatTag, eventCoorLngTag )
	{
		me.setStatusChecking( eventCoorLatTag, false );
		me.setStatusChecking( eventCoorLngTag, false );

		var coordinate = {};

		if ( Util.checkValue( eventCoorLatTag.val() ) ) 
		{
			coordinate.latitude = Number( eventCoorLatTag.val() );
			me.setStatusChecking( eventCoorLatTag, true );
		}

		if ( Util.checkValue( eventCoorLngTag.val() ) ) 
		{
			coordinate.longitude = Number( eventCoorLngTag.val() );
			me.setStatusChecking( eventCoorLngTag, true );
		}

		if ( coordinate.latitude && coordinate.longitude )
		{
			FormUtil.setGeometryJson( json_Data, coordinate );
		}
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
	me.getEventsDefaultPopulate_SearchUrl = function( catOptionId )
	{				
		return me.buildSearchURLByParameter( me.TabularDEObj.getEventQueryBaseUrl(), catOptionId );
	}

	
	me.getTEIFromEvents_SearchUrl = function()
	{
		return me.buildSearchURLByParameter( me.TabularDEObj.getTEIFromEventQueryBaseUrl() );
	}


	me.buildSearchURLByParameter = function( baseURL, catOptionId )
	{
		var orgUnitId = me.TabularDEObj.getOrgUnitId();
		var programId = me.TabularDEObj.getSelectedProgramId();
		var startDate = me.TabularDEObj.getDefaultStartDate();
		var endDate = me.TabularDEObj.getDefaultEndDate();
		var catOptionURLParam = me.TabularDEObj.createCatOptionURLParam( catOptionId );
		
		var searchAllProgramStr = "";

		if ( !me.TabularDEObj.isCase_SearchAllProgram() && Util.checkValue( programId ) )
		{
			searchAllProgramStr = '&program=' + programId;
		}

		return baseURL 
		+ '&orgUnit=' + orgUnitId 
		+ '&startDate=' + $.format.date( startDate, _dateFormat_YYYYMMDD_Dash ) 
		+ '&endDate=' + $.format.date( endDate, _dateFormat_YYYYMMDD_Dash )  
		+ '&' + catOptionURLParam 
		+ searchAllProgramStr; 
	}

	
	me.getEventsSearchUrl = function( personId, catOptionId )
	{
		var returnUrl = "";

		if ( Util.checkValue( personId ) )
		{
			var programId = me.TabularDEObj.getSelectedProgramId();
			returnUrl = _queryURL_PersonQuery + "/" + personId + ".json?fields=enrollments[events]&program=" + programId;
		}
		else
		{
			// If list All perosn historical events flag is set, remove the date/program/orgUnit filter.
			if ( me.TabularDEObj.isCase_ListAllPersonHistoricalEvents() && me.TabularDEObj.isCase_MEwR() )
			{
				returnUrl = me.TabularDEObj.getEventQueryBaseUrl();
			}
			else
			{
				returnUrl = me.getEventsDefaultPopulate_SearchUrl( catOptionId );
			}
		}
		

		// if ( Util.checkValue( personId ) )
		// {
		// 	returnUrl += '&trackedEntityInstance=' + personId;
		// }

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
		return _queryURL_Events + '/' + eventId + ".json";	
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
				// Save to memory for using it on 'Update' process.
				me.eventsLoadedJson[ item_event.event ] = item_event;

				// Create the new event row - simply get basic info
				me.addNewLastRow_Event( trPerson, item_EventTable, item_event.program );

				// Populate Event Columns and Data.
				me.populateEventData( item_EventTable, item_event );
				
			});
		}
		

		// TODO: 2.30 - BELOW DISABLES EVENT ROWS		
		// Check if this event should be disabled by expire date - in program/event/relativePeriod ( belongs to the settings )
		me.checkExpiredStatus_Disable( json_Events, item_EventTable );		
	}

	me.checkExpiredStatus_Disable = function( json_Events, item_EventTable )
	{
		for ( var i in json_Events )
		{
			var event = json_Events[i];

			if ( event.eventDate !== undefined )
			{
				var relativePeriod = new RelativePeriod();
				//var eventDate = event.eventDate;
				
				var programSelected = me.TabularDEObj.searchPanel.defaultProgramTag.find("option:selected");
				var expiredPeriodType = programSelected.attr("peType");
				var expiryDays = programSelected.attr("expiryDays");
				var completeEventsExpiryDays = programSelected.attr("completeEventsExpiryDays");
				
				if ( expiryDays === "0" ) expiryDays = "";
				if ( completeEventsExpiryDays === "0" ) completeEventsExpiryDays = "";

				var lockFormSign = relativePeriod.lockDataFormByEventDate( !me.TabularDEObj.isCase_MEwR(), event, expiredPeriodType, expiryDays, completeEventsExpiryDays );
				
				var lockedJson = me.checkEventRowLockCase( lockFormSign );

				if( lockedJson.locked )
				{							
					var trTag = item_EventTable.find( "tr[uid='" + event.event + "']" );

					me.disableRowInputs( trTag, trTag, "EventRow Disabled: " + lockedJson.lockedMsg, "expired" );
				}
			}
		}
	}

	me.checkEventRowLockCase = function( lockFormSign )
	{
		var lockedJson = {};
		lockedJson.locked = false;
		lockedJson.lockedMsg = "";

		//console.log( ' ==> checkExpiredStatus_Disable, lockFormSign: ' + lockFormSign );

		switch ( lockFormSign ) {
			case EventStatus.SIGN_SEwoR_EVENT_FUTURE_LOCKED:
			case EventStatus.SIGN_SEwoR_EVENT_COMPLETED_EXPIRED:
			case EventStatus.SIGN_SEwoR_EVENT_COMPLETED_LOCKED:
				lockedJson.locked = true;
				lockedJson.lockedMsg = EventStatus.SEwoR_EVENT_STATUS[lockFormSign];
				break;

			case EventStatus.SIGN_SEwR_PROGRAM_COMPLETED:
			case EventStatus.SIGN_SEwR_PROGRAM_INACTIVE:
			case EventStatus.SIGN_SEwR_EVENT_FUTURE_LOCKED:
			case EventStatus.SIGN_SEwR_EVENT_COMPLETED_EXPIRED:
			case EventStatus.SIGN_SEwR_EVENT_EXPIRED:
			case EventStatus.SIGN_SEwR_EVENT_COMPLETED_LOCKED:
				lockedJson.locked = true;
				lockedJson.lockedMsg = EventStatus.SEwR_EVENT_STATUS[lockFormSign];
				break;
		}

		return lockedJson;
	}

	me.populateEventData = function( tableCurrent, item_event )
	{
		var trHead = tableCurrent.find( "tr.trEventHead:first" );
		var trCurrent = tableCurrent.find( "tr.trEventData:last" );

		// -----------------------------------------------
		// --- STEP 1. Populate first 3 row - Event date, program, stage
		
		var eventCatOption = trCurrent.find( "select.catOption" );
		var eventDate = trCurrent.find( "input.eventDate" );
		var eventOrgUnit = trCurrent.find( "span.eventOrgUnit" );
		var eventProgram = trCurrent.find( "select.eventProgram" );
		var eventStage = trCurrent.find( "select.eventStage" );
		var eventStatus = trCurrent.find( "span.eventStatus" );
		var eventDel = trCurrent.find( "input.eventDelete" );

		if ( item_event.eventDate !== undefined )
		{
			// Check if the selected event date is in the range			
			eventDate.val( Util.formatDateBack( item_event.eventDate ) );			
			me.checkDateEventOutOfDateRange( eventDate );
		}
		
		// Add default catOption for existing event 
		// , just in case a default event created before a catOptionCombo is added for program 
		eventCatOption.append( "<option value='" + _settingForm.defaultCatOption.id + "'>" + _settingForm.defaultCatOption.displayName + "</option>" );
		eventCatOption.val( item_event.attributeCategoryOptions );
		Util.disableTag( eventCatOption, true );
		
		// Select Program/ProgramStages <-- if not in select option, add one.
		Util.selectOption_WithOptionalInsert( eventProgram, item_event.program, me.TabularDEObj.getProgramList_Full(), "displayName" );
		
		Util.selectOption_WithOptionalInsert( eventStage, item_event.programStage, me.TabularDEObj.getProgramStageList_Full(), "displayName" );
		//eventProgram.val( item_event.program );
		//eventStage.val( item_event.programStage );

		eventStage.attr( "selectedProgramStage", item_event.programStage ); 

		// Disable 3 rows
		// put event id, status
		trCurrent.attr( "uid", item_event.event );	
		trCurrent.attr( "eventStatus", item_event.status );	
		
		

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


		// -----------------------------------------------
		// --- STEP 3. CHECK EVENT DATE AND Check Against orgUnit open/close date.
		// 		If event date is out of orgUnit date range, disable editing
		if ( item_event.eventDate !== undefined )
		{
			// TODO: 2.30 - eventDate check against orgUnit
			// Disable editing if eventDate is outOfRange of orgUnit
			var orgUnitJson = me.TabularDEObj.getOrgUnitJson();
			var eventDateInFormat = Util.formatDate( item_event.eventDate );
	
			if ( !me.checkOrgUnitOpenCloseDate( orgUnitJson, eventDateInFormat, false ) )
			{
				me.setEventDEControlDisable( trCurrent );
				//me.setEventFixedColumnDisable = function( trCurrent )

				me.appendWarningMsg( eventDate.closest("td"), "EventEntry Blocked: Out of orgUnit open/close date range", "ouDateRange" );
			}
		}
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


	// -------------------------------------
	// ----- WarningMsg Show & Disable Row/Data Entry/Partial Disable ----------
	me.appendWarningMsg_Tr = function( trTag, msgStr, type )
	{
		var eventDateTdTag = trTag.find( 'input.eventDate' ).closest( 'td' );

		me.appendWarningMsg( eventDateTdTag, msgStr, type );
	}

	//eventDateColTag.find( "div.warningMsg[type='eventDateRange']" ).remove();
	me.appendWarningMsg = function( tdTag, msgStr, type )
	{
		tdTag.append( '<div class="warningMsg" type="' + type + '" title="' + msgStr + '">**' + msgStr + '</div>' );
	}

	me.disableAllEventsRow_inTei = function( divPersonDetailTag, msg, type )
	{
		divPersonDetailTag.find("button").hide();
		divPersonDetailTag.find("span.eventStatus").html( statusMsg );		
		me.disableRowInputs( divPersonDetailTag, divPersonDetailTag.find( "tr.trEventData" ), msg, type );		
	};

	me.disableRowInputs = function( disableTags, trTag, warningMsg, type )
	{
		if ( trTag && warningMsg ) me.appendWarningMsg_Tr( trTag, warningMsg, type );

		Util.disableTag( disableTags.find( "input,select,textarea" ), true );
	}

	// ------------------------------------------


	me.retreivePersonListWithEvents = function( returnFunc, failedFunc, noLoadingMsg )
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
			if ( failedFunc ) failedFunc( personEventList );
		} 
		, function() {
			if ( !noLoadingMsg ) DialogLoading.open();
		}
		, function() {
			if ( !noLoadingMsg ) DialogLoading.close();
		});

	}


	me.createPersonEventList = function( eventTEIs )
	{
		var personList = new Array();

		$.each( eventTEIs, function( i_eventTEI, item_eventTEI ) 
		{
			var personObj = me.getPersonObject( personList, item_eventTEI );
									
			personObj.eventRows.push( item_eventTEI );
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
