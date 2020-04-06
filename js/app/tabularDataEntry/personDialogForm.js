//		- Used for popup Person Add/Edit Form

function PersonDialogForm( TabularDEObj )
{
	var me = this;

	me.TabularDEObj = TabularDEObj;

	me.type_New = "New";
	me.type_Exist = "Exist";

	me.personDialogFormTag = $( "#personDialogForm" );

	me.personDialogTableTag = me.personDialogFormTag.find( "#person_Table" );

	me.currentPersonTr;

	me.json_PersonAttributes;

	me.trackedEntityId_Person;

	me.afterSaveAction;

	me.enrollmentTableTag = $("#enrollment_Table");
	me.enrolmentDateLabelTag = $("#enrolmentDateLabel");
	me.incidentDateLabelTag = $("#incidentDateLabel");
	me.enrolmentDateTag = $("#enrolmentDate");
	me.incidentDateTag = $("#incidentDate");
	me.incidentDateRowTag = $( "#incidentDateRow" );

	me.personLoadedJson = undefined;

	// -------------------------------------------
	// Methods

	me.openForm = function( currentTr, formType, returnFunc, afterSaveAction )
	{
		me.currentPersonTr = currentTr;

		me.afterSaveAction = afterSaveAction;
	
		if( formType == "Exist" )
 		{	
			var personId = currentTr.attr( 'uid' );

			me.TabularDEObj.checkProgramEnroll( personId, me.TabularDEObj.getSelectedProgramId(), me.TabularDEObj.getOrgUnitId(), function( enrollmentData ) // has ACTIVE program
			{
				me.enrollmentTableTag.hide();
				Util.disableTag( me.enrolmentDateTag, true );
				Util.disableTag( me.incidentDateTag, true );

			}, function()
			{
				
				me.enrollmentTableTag.show();
				Util.disableTag( me.enrolmentDateTag, false );	

				// TODO: 2.30
				// NEED TO CHECK
				//console.log( 'incidentDate showing' );
				Util.disableTag( me.incidentDateTag, false );

				me.initFormBeforeOpen( currentTr, formType, returnFunc );
				
			}, function()
			{
				me.initFormBeforeOpen( currentTr, formType, returnFunc );
			});
		 }
		 else
		 {
			 // TODO: 2.30
			 // NEED TO CHECK
			 //console.log( 'new enrollment - incidentDate showing' );

			 me.enrollmentTableTag.show();
			 Util.disableTag( me.enrolmentDateTag, false );
			 Util.disableTag( me.incidentDateTag, false );

			 me.initFormBeforeOpen( currentTr, formType, returnFunc );
		 }
	}

	// ----------------------------------------------


	me.initFormBeforeOpen = function( currentTr, formType, returnFunc )
	{
		var selectedProgram = me.TabularDEObj.getSelectedProgram();
		
		// TODO: 2.30
		// Display incidentDate only if 'displayIncidentDate is available and true on program.
		( selectedProgram.displayIncidentDate ) ? me.incidentDateRowTag.show(): me.incidentDateRowTag.hide();


		// Set date picker for Enrollment Date and Incident Date fields
		Util.setDatePickerInRange( "incidentDate", "enrolmentDate", function(){
			if( !eval( selectedProgram.selectIncidentDatesInFuture ) )
			{
				Util.datePicker_SetMaxDate( me.incidentDateTag, new Date() );
			}
		}, true );

		// Set Current date for [Enrollment Date] field and [Incident Date] field
		me.enrolmentDateTag.val( Util.getCurrentDate() );
		me.incidentDateTag.val("");
		
		// Set the Enrollment date in future if any
		if( eval( selectedProgram.selectEnrollmentDatesInFuture ) )
		{
			var futureDate = new Date();
			futureDate.setFullYear( futureDate.getFullYear() + 100 );
			Util.datePicker_SetMaxDate( me.enrolmentDateTag, futureDate );
		}


		if( formType == "New" )	
		{
			// TODO: IF OPENING FOR NEW ENROLLMENT, THIS SHOULD ALSO BE TOUCHED?
			me.enrolmentDateTag.val( Util.getCurrentDate() );
			me.incidentDateTag.val( Util.getCurrentDate() );
		}
		

		// Set lable for [Enrollment Date and IncidentDate]
		me.enrolmentDateLabelTag.html( selectedProgram.enrollmentDateLabel );
		me.incidentDateLabelTag.html( selectedProgram.incidentDateLabel );
		

		// TODO: THIS MIGHT BE TOO EXPENSIVE....
		// Make sure the attribute list is loaded first.
		me.checkAndLoadPersonAttributeData( function()
		{
			if ( me.setupForm( currentTr, formType ) )
			{
				var personId = currentTr.attr( 'uid' );

				// Clear Memory Stored Event data.
				EventUtil.clearLatestEvent_Reuse( me.TabularDEObj, personId );

				// Add Program Rules (with events?)
				me.TabularDEObj.programRule.setUp_ProgramRules( 'TEI_Attribute', personId, me.personDialogTableTag, me.personDialogTableTag.find( 'td[type="attribute"]' ), selectedProgram.rules, selectedProgram.ruleVariables );


				me.personDialogFormTag.dialog( "open" );
			}

			if ( returnFunc !== undefined ) returnFunc();
		});
	};

	me.setupForm = function( trCurrent, type )
	{
		var setupStatus = false;
		var orgUnitId = me.TabularDEObj.getOrgUnitId();
		var defaultProgramId = me.TabularDEObj.getSelectedProgramId();

		me.personLoadedJson = undefined;


		if ( !Util.checkValue( defaultProgramId ) )
		{
			alert( $( 'span.msg_SelectDefaultProgram' ).text() );
		}
		else
		{

			// Clear Table
			me.personDialogTableTag.find( "tr" ).remove();


			var button_Create = $( ".ui-dialog-buttonpane button:contains('Create')" ).button();
			var button_Update = $( ".ui-dialog-buttonpane button:contains('Update')" ).button();

			button_Create.hide();
			button_Update.hide();


			me.personDialogFormTag.find( "#person_formType" ).val( type );
			

			// Render Attributes
			// Step 2. Add template row to the table <-- via append
			var programTrackedEntityAttributes = me.TabularDEObj.getProgramTrackedEntityAttributes();

			
			me.personDialogTableTag.append("<tr><th colspan='2' style='font-weight:bold; color: #555;'>" + l10n.get('attributes') + "</th></tr>");
			me.RenderPersonElements( programTrackedEntityAttributes, me.SetRowControls_Attribute );


			// Depending on 'New' or 'Existing' person data, populate the existing data.
			if( type == me.type_New ) 
			{
				// Load the suggested value
				var person_SuggestedTd = trCurrent.find( "td[type='attribute_0']" );
				var person_SuggestedVal = person_SuggestedTd.find( ".personSelect" ).val();
				var person_SuggestedAttrbuiteId = person_SuggestedTd.attr( 'attributeid' );

				me.SetRowControls_Attribute( person_SuggestedAttrbuiteId, false, person_SuggestedVal, true );

				button_Create.show();
			}					
			else if ( type == me.type_Exist )
			{

				button_Update.show();
				
				var programId = me.TabularDEObj.searchPanel.programManager.selectedProgramId;
				var personId = trCurrent.attr( 'uid' );
				me.personDialogFormTag.find( "#person_id" ).val( personId );


				// TODO: 2.30 - 

				// Clear the memory data - so that new data gets
				PersonUtil.clearPersonByID_Reuse( personId, programId );




				// ?? TODO: Question: Why is this done by Synch??
				var item_Person = PersonUtil.getPersonByID( personId, programId );
				me.personLoadedJson = item_Person;


				// For person attributes, add value, and if not in program, hide them.
				PersonUtil.addIDtypeToID( item_Person );
				


				// TODO: For new Enrollment, this should not do!!!!!
				// We should only populate the right enrollment for the tei...
				// DO WE EVER NEED TO UPDATE THE ENROLLMENT DATE?  ON TEI UPDATE?
				// Populate [Enrollment date] and [Incident Date]
				var enrollments = item_Person.enrollments;
				for( var i in enrollments )
 				{
					var enrollmentJson = enrollments[i];
					if( enrollmentJson.program == programId && enrollmentJson.status == _status_ACTIVE )
					{
						me.enrolmentDateTag.val( Util.formatDateBack( enrollmentJson.enrollmentDate ) );
						me.incidentDateTag.val( Util.formatDateBack( enrollmentJson.incidentDate ) );
					}
				}
				
				//Util.write( " ID create: " + JSON.stringify( item_Person ) );

				if ( Util.checkDefined( item_Person ) )
				{
					// This also renders non-program specific attributes as hidden.
					me.RenderPersonElements( item_Person.attributes, me.SetRowControls_Attribute, true );
				}
				else
				{
					alert( $( 'span.msg_PersonNotFound' ).text() );
				}
								
				// View Only
				//Util.disableTag( me.personDialogFormTag.find( "#person_Table" ).find( "input,select" ), true )

			}
				

			Util.setupDatePicker( me.personDialogTableTag.find( ".datepicker[caltype='none']" ), undefined, _dateFormat_Picker_YYMMDD_Dash );

			Util.setupDatePicker( me.personDialogTableTag.find( ".datepicker[caltype='birth']" ), undefined, _dateFormat_Picker_YYMMDD_Dash, "birthdate" );

			setupStatus = true;
		}

		return setupStatus;
	}


	me.validateTEAControlVal = function()
	{
		var checkedValueType = true;
		me.personDialogFormTag.find("input,select").each(function(){
			var checked = FormUtil.validateValueType( $(this), $(this).attr("valType") );
			if( !checked ) checkedValueType = false;
		});
		
		return checkedValueType;
	}

	me.FormPopupSetup = function()
	{
		// -- Set up the form -------------------
		me.personDialogFormTag.dialog({
		  autoOpen: false,
		  dialogClass: "noTitleStuff",
		  width: 630,
		  height: 500,
		  modal: true,
		  buttons: {
			"Create": function() {

				if( me.validateTEAControlVal() )
				{
						
					var dialogForm = $( this );

					// Perform the mandatory filled check first.
					if ( me.checkFieldsData() && ProgramRuleUtil.checkProgramRuleData( me.personDialogTableTag ) )
					{
						var orgUnitId = me.TabularDEObj.getOrgUnitId();
						var defaultProgramId = me.TabularDEObj.getSelectedProgramId();
						var defaultDateInFormat = $.format.date( me.TabularDEObj.getDefaultStartDate(), _dateFormat_YYYYMMDD_Dash );
						var enrollementDateInFormat = $.format.date( Util.getDate_FromYYYYMMDD( me.enrolmentDateTag.val() ), _dateFormat_YYYYMMDD_Dash );
						var incidentDateInFormat = $.format.date( Util.getDate_FromYYYYMMDD( me.incidentDateTag.val() ), _dateFormat_YYYYMMDD_Dash );

						// duplicate check not working anymore..
						me.checkDuplicateData( orgUnitId, defaultProgramId, undefined, function()
						{
							// Create json object for Tracked Entity Instance
							var personData = me.setupPersonDataNew( orgUnitId );
							
							FormUtil.checkGeoLocation( _enableCoordinateCapture, function( geoLoc )
							{						
								// if ( geoLoc ) FormUtil.setGeometryJson( personData, geoLoc.coords );
				

								// // Add Enrollment information
								// personData.enrollments = [];
								// var enrollment = {
								// 	"orgUnit": orgUnitId,
								// 	"program": defaultProgramId,
								// 	"enrollmentDate": enrollementDateInFormat,
								// 	"incidentDate": incidentDateInFormat
								// };
								// personData.enrollments.push( enrollment );

								
								
								RESTUtil.submitData( personData, _queryURL_PersonSubmit, "POST", function( returnData )
								{
									if ( returnData.response === undefined || returnData.response.status != 'SUCCESS' )
									{
										me.personCreateUpdate_Fail_Handle( returnData );
									}
									else
									{	
										var personId;
										if( _settingForm.DHISVersion == "2.25" || _settingForm.DHISVersion == "2.26" )
										{
											personId = returnData.response.reference;
										}
										else
										{
											personId = returnData.response.importSummaries[0].reference;
										}

										if ( Util.checkDefined( personId ) )
										{
											MsgManager.msgAreaShow( $( 'span.msg_PersonCreated' ).text() );
											

											// Enroll
											me.TabularDEObj.checkProgramEnroll( personId, defaultProgramId, orgUnitId
											, function() 
											{
												if ( me.afterSaveAction !== undefined ) me.afterSaveAction();
											}
											, function()
											{ 
												me.TabularDEObj.programEnroll( personId, undefined, defaultProgramId, orgUnitId, enrollementDateInFormat, incidentDateInFormat, false, "POST"
												, function( returnData )
												{
													MsgManager.msgAreaShow( $( 'span.msg_ProgramEnrolled' ).text() );
													if ( me.afterSaveAction !== undefined ) me.afterSaveAction();
												}
												, function( returnData )
												{
													alert( $( 'span.msg_ProgramEnrollFailed' ).text() + '\n\n Error: ' + JSON.stringify( returnData ) );
												});
											});
											
											
											if ( me.afterSaveAction !== undefined ) me.afterSaveAction();
											
											var programId = me.TabularDEObj.searchPanel.programManager.selectedProgramId;
											PersonUtil.getPersonByID_Reuse( personId, programId, function( item_Person )
											{
												me.TabularDEObj.setPersonInfoRow( me.currentPersonTr, item_Person );

												// Auto Close after Create New
												dialogForm.dialog( "close" );
												me.currentPersonTr.find( '.personInfo' ).focus();
											});
										}
									}
								}
								, me.personCreateUpdate_Fail_Handle );
							});
						});
					}
				}
			},
			"Update": function() {

				if( me.validateTEAControlVal() )
				{	
					var dialogForm = $( this );

					// Perform the mandatory filled check first.
					if ( me.checkFieldsData() && ProgramRuleUtil.checkProgramRuleData( me.personDialogTableTag ) )
					{
						var orgUnitId = me.TabularDEObj.getOrgUnitId();
						var defaultProgramId = me.TabularDEObj.getSelectedProgramId();
						var defaultDateInFormat = $.format.date( me.TabularDEObj.getDefaultStartDate(), _dateFormat_YYYYMMDD_Dash );
						var enrollementDateInFormat = $.format.date( Util.getDate_FromYYYYMMDD( me.enrolmentDateTag.val() ), _dateFormat_YYYYMMDD_Dash );
						var incidentDateInFormat = $.format.date( Util.getDate_FromYYYYMMDD( me.incidentDateTag.val() ), _dateFormat_YYYYMMDD_Dash );

						var personId = me.personDialogFormTag.find( "#person_id" ).val();

						me.checkDuplicateData( orgUnitId, defaultProgramId, personId, function()
						{
							me.setupPersonDataUpdate( me.personLoadedJson );

							RESTUtil.submitData( me.personLoadedJson, _queryURL_PersonSubmit + '/' + personId, "PUT"
								, function( returnData )
								{

									if ( returnData.response === undefined || returnData.response.status != 'SUCCESS' )
									{
										me.personCreateUpdate_Fail_Handle( returnData );
									}
									else
									{

										MsgManager.msgAreaShow( $( 'span.msg_PersonInfoUpdated' ).text() );


										// Enroll
										me.TabularDEObj.checkProgramEnroll( personId, defaultProgramId, orgUnitId
										, function(activeEnrollment) 
										{
											if ( activeEnrollment === undefined ){
												// DHIS 2.28 doesnt allow to change [EnrolmentDate] and [IncidentDate] after enrollmenent
												me.TabularDEObj.programEnroll( personId, undefined, defaultProgramId, orgUnitId, enrollementDateInFormat, incidentDateInFormat, false, "POST"
													, function( returnData )
													{
														me.afterSaveAction();
													}
													, function( returnData )
													{
														alert( $( 'span.msg_ProgramEnrollFailed' ).text() + '\n\n Error: ' + JSON.stringify( returnData ) );
													});
													
												// me.afterSaveAction();
											}
											else {
												me.afterSaveAction();
											}
										}
										, function()
										{
											me.TabularDEObj.programEnroll( personId, undefined, defaultProgramId, orgUnitId, enrollementDateInFormat, incidentDateInFormat, false, "POST"
											, function( returnData )
											{
												MsgManager.msgAreaShow( $( 'span.msg_ProgramEnrolled' ).text() );
												if ( me.afterSaveAction !== undefined ) me.afterSaveAction();
											}
											, function( returnData )
											{
												alert( $( 'span.msg_ProgramEnrollFailed' ).text() + '\n\n Error: ' + JSON.stringify( returnData ) );
											});
										});


										// Save the item_Person data into memory - for reuse (by queryStr id)
										PersonUtil.getPersonByID_Reuse_ManualInsert( personId, defaultProgramId, me.personLoadedJson );

										// Re-Populate Data to the form <-- Do we need it?
										me.TabularDEObj.populatePersonAttirbutesToRow( me.currentPersonTr, me.personLoadedJson.attributes );

										// Re-Run the ProgramRules on Event Rows
										me.reRun_EventRowProgramRules( me.currentPersonTr, personId );

										// Auto Close after Update
										dialogForm.dialog( "close" );
										me.currentPersonTr.find( '.personInfo' ).focus();
									}

								}
								, me.personCreateUpdate_Fail_Handle
							);
						});
					}
				}

			},
			"Close": function() {
				$( this ).dialog( "close" );

				me.currentPersonTr.find( '.personInfo' ).focus();
			}
		  }
		});		
	};

	
	// Re-Run the ProgramRules on Event Rows
	me.reRun_EventRowProgramRules = function( currentPersonTr, personId )
	{
		var selectedProgram = me.TabularDEObj.getSelectedProgram();

		var personEventsTag = currentPersonTr.closest( 'tbody' ).find( 'tr.trPersonDetail[uid="' + personId + '"]' );
		var eventRowTags = personEventsTag.find( 'table.tbStyle_PersonDetail tr.trEventData' );

		me.TabularDEObj.programRule.reRun_AllProgramRules( 'Event_DE', personId, eventRowTags, selectedProgram.rules, selectedProgram.ruleVariables );
	};


	// ----------------------------------------------

	me.getTrackedEntityId_Person = function()
	{
		if ( me.trackedEntityId_Person === undefined )
		{
			var json_TrackedEntities = $.parseJSON( RESTUtil.getSynchData( _queryURL_TrackedEntities + '.json?query=Person' ) );

			// Lower DHIS 2.30
			// var trackedEntities = json_TrackedEntities.trackedEntities;
			// DHIS 2.30
			var trackedEntities = json_TrackedEntities.trackedEntityTypes;
			
			for ( i = 0; i < trackedEntities.length ; i++ )
			{
				var trackedEntity = trackedEntities[i];

				if ( trackedEntity.displayName == "Person" )
				{
					me.trackedEntityId_Person = trackedEntity.id;
					break;
				}
			}
		}

		if ( me.trackedEntityId_Person === undefined )
		{
			alert( $( 'span.msg_PersonNotFoundDHIS' ).text() );
		}

		return me.trackedEntityId_Person;
	}


	me.checkAndLoadPersonAttributeData = function( returnFunc )
	{
		if ( me.json_PersonAttributes !== undefined )
		{
			returnFunc( me.json_PersonAttributes );
		}
		else
		{
			me.retrievePersonAttributeList( function( json_teAttrs )
			{
				me.json_PersonAttributes = json_teAttrs;

				returnFunc( me.json_PersonAttributes );
			});
		}
	}

	me.retrievePersonAttributeList = function( returnFunc )
	{
		RESTUtil.retrieveManager.retrieveData( _queryURL_PersonAttributes
		, function( json_data ) 
		{
			if ( json_data.trackedEntityAttributes !== undefined ) returnFunc( json_data.trackedEntityAttributes );
			else alert( 'Failed to get "trackedEntityAttributes" from retrieved data.' );
		}
		, function()
		{
			alert( 'Failed to retrieve TEI attribute lists' );	
		});	
	}


	me.getAttributeInfoInMsg = function( inputStr )
	{
		var attributeInfo = {};

		$.each( me.json_PersonAttributes, function( i_attr, item_attr )
		{
			if ( inputStr.indexOf( item_attr.id ) >= 0 )
			{
				attributeInfo = item_attr;
				return false;
			}
		});

		return attributeInfo;
	}


	me.getErrorMessageFormatted = function( inputStr )
	{
		var errorMessage = inputStr.substring( 0, inputStr.indexOf( ':' ) );

		var valueStrIndexStart = inputStr.indexOf( ", value='" ) + 9;
		var valueStrIndexEnd = inputStr.indexOf( "'", valueStrIndexStart );

		var errorValue = inputStr.substring( valueStrIndexStart, valueStrIndexEnd );

		var attributeInfo = me.getAttributeInfoInMsg( inputStr );
		
		return '"' + attributeInfo.displayName + '", ' + errorValue + " - " + errorMessage;
	}

	me.getPersonAttributeById = function( json_PersonAttributes, attributeId )
	{
		var personAttribute;

		if ( Util.checkValue( attributeId ) && json_PersonAttributes !== undefined )
		{
			personAttribute = Util.getFromList( json_PersonAttributes, attributeId, "id" );
		}

		return personAttribute;
	}
	

	me.SetRowControls_Attribute = function( attributeId, mandatory, value, existingData )
	{
		var trCurrent;

		if ( existingData )
		{
			me.personDialogTableTag.find( "td[attributeid='" + attributeId + "']" ).each( function( index ) 
			{
				trCurrent = $( this ).closest( "tr" );
			});
		}


		// Step 1. Retrieve person attribute properties and display at here.
		var personAttribute = me.getPersonAttributeById( me.json_PersonAttributes, attributeId );
		

		if ( Util.checkDefined( personAttribute ) )
		{

			if ( trCurrent === undefined )
			{
				// Render the control and set value if availble
				var visibleInfo = "";

				// If this is from person, not from program, hide visibly, so that, for saveing/updating, it gets added. <-- even though it is not part of program info.
				if ( existingData )
				{
					visibleInfo = "style='display:none;'";
				}

				var mandatorySpan = "";
				var mandatoryAttribute = "";

				if ( mandatory )
				{
					mandatorySpan = "<span title='Mandatory' class='mandatory'>*</span>";
					mandatoryAttribute = "mandatory='true'";
				}

				var displayNameSpanTagStr = "<span class='attrname' attributeId='" + attributeId + "'>" + personAttribute.displayName + "</span>";
				var hiddenNameSpanTagStr = "<span class='hiddenName' style='display:none;'>" + personAttribute.name + "</span>";

				// Step 2. Add template row to the table <-- via append
				me.personDialogTableTag.append("<tr " + visibleInfo + "><td>" + displayNameSpanTagStr + mandatorySpan + hiddenNameSpanTagStr + "</td>"
					+ "<td type='attribute' " + mandatoryAttribute + " attributeId='" + attributeId + "'>" + me.TabularDEObj.getAttrControlsTemplate() + "</td>"
					+ "</tr>");

				// Step 3. Show the proper control for the data type + value.
				var trCurrent = me.personDialogTableTag.find( "tr:last" );

				var controlTag = me.setAttributeControlType( trCurrent, personAttribute, value );

				controlTag.show();
			}
			else
			{
				me.setAttributeControlType( trCurrent, personAttribute, value );
			}
		}
		else
		{
			Util.write( 'Person Attributes not found - id:', attributeId );
		}
	};


	me.setAttributeControlType = function( trCurrent, personAttribute, value )
	{	
		var attributeControl;
		if ( !Util.checkDefined( value ) ) value = '';

		var valueType = personAttribute.valueType;

		if ( personAttribute.optionSetValue && personAttribute.optionSet !== undefined )
		{
			var optionSet = personAttribute.optionSet;
			var cntrDropdown = trCurrent.find( ".dropdown" );

			attributeControl = cntrDropdown.attr( _view, _view_Yes );

			cntrDropdown.empty();
			cntrDropdown.append( "<option value=''>" + l10n.get('selectValue') + "</option>" );

			if ( optionSet.options !== undefined )
			{
				$.each( optionSet.options, function( i_Option, item_Option ) 
				{   
					EventUtil.appendSelectOption_Option( cntrDropdown, item_Option );
				});
			}
			
			Util.selectOption_WithOptionalInsert( cntrDropdown, value );
		}
		else if( valueType == "BOOLEAN" )
		{
			var cntrDropdown = trCurrent.find( ".dropdown" );

			attributeControl = cntrDropdown.attr( _view, _view_Yes );

			cntrDropdown.empty();
			
			FormUtil.setSelectTagOptions_YesNo( cntrDropdown );

			cntrDropdown.val( value );
		}
		else if( valueType == "TEXT" || valueType == "LONG_TEXT" || valueType == "UNIT_INTERVAL"
			|| valueType == "NUMBER" || valueType == "INTEGER_ZERO_OR_POSITIVE" || valueType == "INTEGER_NEGATIVE"
			|| valueType == "INTEGER_POSITIVE" || valueType == "INTEGER" || valueType == "PERCENTAGE"
			|| valueType == "LETTER" || valueType == "PHONE_NUMBER" || valueType == "EMAIL"  ) //|| valueType == "USERNAME" )
		{
			// TODO: For now, have 'username' display as textbox <-- should be user listing
			attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes );

			// if ( valueType == "NUMBER" || valueType == "INTEGER_ZERO_OR_POSITIVE" 
			// 	|| valueType == "INTEGER_POSITIVE" || valueType == "INTEGER" || valueType == "PERCENTAGE")
			// {
			// 	PersonUtil.setTagTypeValidation( attributeControl, "NUMBER" );
			// }
			// else if ( valueType == "LETTER" )
			// {
			// 	PersonUtil.setTagTypeValidation( attributeControl, "LETTER" );
			// }
			/* //else if( valueType == "COORDINATE" )
			//{
			//	PersonUtil.setTagTypeValidation( attributeControl, "COORDINATE" );
			//} */
		}
		// else if( valueType == "INTEGER_NEGATIVE" )
		// {
		// 	// TODO: For now, have 'username' display as textbox <-- should be user listing
		// 	attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes );
		// 	// PersonUtil.setTagTypeValidation( attributeControl, "INTEGER_NEGATIVE" );
		// }
		// else if( valueType == "UNIT_INTERVAL" )
		// {
		// 	// TODO: For now, have 'username' display as textbox <-- should be user listing
		// 	attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes );
		// 	// PersonUtil.setTagTypeValidation( attributeControl, "UNIT_INTERVAL" );
		// }
		else if( valueType == "DATE" || valueType == "AGE" )
		{
			attributeControl = trCurrent.find( ".datepicker" ).val( value ).attr( _view, _view_Yes ).attr('valType', valueType );

			var nameStr = trCurrent.find( 'span.hiddenName' ).text();

			// If it is birth date, set attribute for that, so that start/end year can be set appropriately.
			if ( Util.stringSearch( nameStr, "birth" )
				|| Util.stringSearch( nameStr, "age" ) )
			{
				attributeControl.attr( 'caltype', 'birth' );
			}
			else
			{
				attributeControl.attr( 'caltype', 'none' );
			}
		}
		else if( valueType == "TIME" )
		{
			attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes ).attr('valType', valueType );
			Util.setTimePicker( attributeControl );
		}
		else if( valueType == "DATETIME" )
		{
			attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes ).attr('valType', valueType );
			Util.setDateTimePicker( attributeControl );
		}
		// 'COORDINATE' is hard to update in Tei since 'feature' type need to be 'POINT' and we need to change to geometry type json..
		else if( valueType == "COORDINATE" )
		{
			attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes ).attr('valType', valueType );
			// PersonUtil.setTagTypeValidation( attributeControl, "COORDINATE" );
		}
		else if( valueType == "TRUE_ONLY" ) //|| valueType == "TRACKER_ASSOCIATE" )
		{
			attributeControl = trCurrent.find( ".checkbox" ).attr( _view, _view_Yes ).prop( 'checked', value );
		}
		// else if( valueType == "AGE" )
		// {
		// 	attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes );
		// 	PersonUtil.setTagTypeValidation( attributeControl, "NUMBER" );
		// }
		else if( valueType == "URL" )
		{
			attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes );
			PersonUtil.setTagTypeValidation( attributeControl, "URL" );
		}
		else
		{
			attributeControl = trCurrent.find( ".labelMsg" ).html( "'" + valueType + "' data type not supported" ).attr( _view, _view_Yes );
		}

		attributeControl.attr("valType", valueType);

		return attributeControl;
	}

	
	me.RenderPersonElements = function( programTrackedEntityAttributes, setRowControlsFunc, existingData )
	{
		
		if ( programTrackedEntityAttributes !== undefined )
		{
			$.each( programTrackedEntityAttributes, function( i_element, item_element ) 
			{
				if ( Util.checkDefined( existingData ) )
				{
					var elementValue = FormUtil.getFormattedAttributeValue( item_element.valueType, item_element.value  );

					setRowControlsFunc( item_element.id, item_element.mandatory, elementValue, true );
				}
				else
				{
					setRowControlsFunc( item_element.id, item_element.mandatory );
				}
			});
		}
	}



	me.setupPersonDataNew = function( orgUnitId )
	{
		var newPersonObj = {};

		newPersonObj.orgUnit = orgUnitId;
		// TODO: 2.30
		// newPersonObj[ "trackedEntity" ] = me.getTrackedEntityId_Person();
		newPersonObj.trackedEntityType = me.getTrackedEntityId_Person();
		newPersonObj.attributes = me.constructAttributes();

		return newPersonObj;
	}


	me.setupPersonDataUpdate = function( teiJson )
	{
		if ( !teiJson ) alert( 'ERROR - On Update, loaded Tei does not exist!' );
		else me.constructAttributes( teiJson.attributes );

		// 2.30 - On Tei update, we need to remove 'events' to pass the geometry json validation..
		if ( teiJson.enrollments )
		{
			for ( i = 0; i < teiJson.enrollments.length; i++ )
			{
				var enrollmentJson = teiJson.enrollments[i];

				if ( enrollmentJson.events ) delete enrollmentJson.events;
			}	
		}			
	}


	me.checkFieldsData = function()
	{
		var pass = true;

		// Check Mandatory Fields and Number/Letter Only fields
		
		// Check Number/Letter highlightedness
		if ( me.personDialogTableTag.find( "td[type='attribute']" ).find( FormUtil.getStr_Views() ).filter( "[notvalid='Y']" ).length > 0 )
		{
			alert( $( 'span.msg_ValidFill' ).text() );
			return false;
		}

		// Check Mandatory
		me.personDialogTableTag.find( "td[type='attribute'][mandatory='true']" ).find( FormUtil.getStr_Views() ).each( function( index ) 
		{
			var item = $( this );
			
			var dataValue;

			// Check the class and covert the values
			if( item.hasClass( "datepicker" ) )
			{
				dataValue = Util.formatDate( item.val() );
			}
			else if( item.hasClass( "checkbox" ) )
			{
				dataValue = item.is( ":checked" ) ? "true" : "" ;
			}
			else
			{
				dataValue = item.val();
			}

			if( !Util.checkValue( dataValue ) )
			{	
				Util.paintWarning( item );
				pass = false;
			}
			else
			{
				Util.paintClear( item );
			}

		});

		if ( !pass )
		{
			alert( $( 'span.msg_MandatoryFill' ).text() );
		}

		return pass;
	}


	me.checkDuplicateData = function( orgUnitId, defaultProgramId, personId, runFunc )
	{
		// Prepare the data
		var paramData = 'orgUnitId=' + orgUnitId + '&programId=' + defaultProgramId;

		// determines update vs create
		if ( personId !== undefined ) paramData += '&uid=' + personId;

		var attributes = me.constructAttributes();

		$.each( attributes, function( i, item )
		{
			paramData += '&attr' + item.attribute + '=' + item.value;
		});


		runFunc();
		// Need to perform this via WebAPI version!!!


		/*
		$.ajax({
			type: "POST"
			,url: _queryURL_PersonDataValidate
			,data: paramData
			,datatype: "json"
			,async: true
			,success: function( returnData )
			{
				if ( returnData.response == 'success' && returnData.message == "" )
				{
					runFunc();
				}
				else
				{
					alert( 'Failed.  Reason: ' + returnData.message );
				}
			}
		});
		*/
	}


	me.constructAttributes = function( attributes )
	{
		var updateCase = false;

		if ( attributes ) updateCase = true;
		else attributes = new Array();


		me.personDialogTableTag.find( "td[type='attribute']" )
			.find( FormUtil.getStr_Views() ).each( function( index ) 
		{
			// Go through only 'input,select,textbox' with view="y"
			// NOTE: If form entry were not filled in (empty case), it will not be part
			//		of sending json.  Unless existing json had some value and emptied out case.

			var item = $( this );
			
			var attributeId = item.closest( "td" ).attr( "attributeId" );

			var dataValue;

			// Check the class and covert the values
			if( item.attr("valType") === "DATE" )
			{
				dataValue = Util.formatDate( item.val() );
			}
			else if( item.attr("valType") === "TIME" )
			{
				dataValue = Util.formatTime( item.val() );
			}
			else if( item.attr("valType") === "DATETIME" )
			{
				dataValue = Util.formatDateTime( item.val() );
			}
			else if( item.hasClass( "checkbox" ) )
			{
				dataValue = item.is( ":checked" ) ? "true" : "" ;
			}
			else
			{
				dataValue = item.val();
			}


			FormUtil.addItemJson( attributes, attributeId, "attribute", dataValue, updateCase );
		});

		return attributes;
	}


	me.getActiveControlById = function( attributeId )
	{
		return me.personDialogTableTag.find( "td[type='attribute'][attributeid='" + attributeId + "']" ).find( FormUtil.getStr_Views() );
	}


	me.personCreateUpdate_Fail_Handle = function( returnData )
	{
		$( "#person_Result" ).val( "Fail" );

		var errorMsg = "";

		// Try to parse the error Message and highLight the fields
		if ( returnData.responseJSON !== undefined && returnData.responseJSON.response !== undefined && returnData.responseJSON.response.conflicts !== undefined )
		{
			var conflicts = returnData.responseJSON.response.conflicts;

			$.each( conflicts, function( i_conflict, item_conflict )
			{
				var issueNumber = i_conflict + 1;

				errorMsg += "Issue " + issueNumber + ": " + me.getErrorMessageFormatted( item_conflict.value ) + "\n";

				var attribute = me.getAttributeInfoInMsg( item_conflict.value );
				
				Util.paintWarning( me.getActiveControlById( attribute.id ) );
			});					
		}
		else
		{
			errorMsg = JSON.stringify( returnData );
		}

		alert( $( 'span.msg_PersonCreateUpdateFailed' ).text() + '\n\n' + errorMsg );

		me.personDialogFormTag.find( 'button' ).filter( ':visible' ).first().focus();
	}


	// Initial Setup Call
	me.initialSetup = function()
	{				
		me.FormPopupSetup();
	}


	// Initial Setup Call
	me.initialSetup();

}
