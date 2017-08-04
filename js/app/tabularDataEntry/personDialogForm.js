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


	// -------------------------------------------
	// Methods

	me.openForm = function( currentTr, formType, returnFunc, afterSaveAction )
	{
		me.currentPersonTr = currentTr;

		me.afterSaveAction = afterSaveAction;


		// Make sure the attribute list is loaded first.
		me.checkAndLoadPersonAttributeData( function()
		{
			if ( me.setupForm( currentTr, formType ) )
			{
				// Set Program Rules - Attribute ones..
				var selectedProgram = me.TabularDEObj.getSelectedProgram();
				var personId = currentTr.attr( 'uid' );

				// Clear Memory Stored Event data.
				EventUtil.clearLatestEvent_Reuse( me.TabularDEObj, personId );

				// Add Program Rules (with events?)
				me.TabularDEObj.programRule.setUp_ProgramRules( 'TEI_Attribute', personId, me.personDialogTableTag, me.personDialogTableTag.find( 'td[type="attribute"]' ), selectedProgram.rules, selectedProgram.ruleVariables );


				me.personDialogFormTag.dialog( "open" );
			}

			if ( returnFunc !== undefined ) returnFunc();
		});
	}

	// ----------------------------------------------


	me.setupForm = function( trCurrent, type )
	{
		var setupStatus = false;
		var orgUnitId = me.TabularDEObj.getOrgUnitId();
		var defaultProgramId = me.TabularDEObj.getSelectedProgramId();


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
				

				var personId = trCurrent.attr( 'uid' );
				me.personDialogFormTag.find( "#person_id" ).val( personId );



				// Clear the memory data - so that new data gets
				PersonUtil.clearPersonByID_Reuse( personId );

				// ?? TODO: Question: Why is this done by Synch??
				var item_Person = PersonUtil.getPersonByID( personId );



				// For person attributes, add value, and if not in program, hide them.
				PersonUtil.addIDtypeToID( item_Person );
				
				
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


	me.FormPopupSetup = function()
	{

		// -- Set up the form -------------------
		me.personDialogFormTag.dialog({
		  autoOpen: false,
		  dialogClass: "noTitleStuff",
		  width: 430,
		  height: 400,
		  modal: true,
		  buttons: {
			"Create": function() {

				var dialogForm = $( this );

				// Perform the mandatory filled check first.
				if ( me.checkFieldsData() && ProgramRuleUtil.checkProgramRuleData( me.personDialogTableTag ) )
				{
					var orgUnitId = me.TabularDEObj.getOrgUnitId();
					var defaultProgramId = me.TabularDEObj.getSelectedProgramId();
					var defaultDateInFormat = $.format.date( me.TabularDEObj.getDefaultStartDate(), _dateFormat_YYYYMMDD_Dash );

					me.checkDuplicateData( orgUnitId, defaultProgramId, undefined, function()
					{
						var personData  = me.setupPersonData( orgUnitId );

						RESTUtil.submitData( personData, _queryURL_PersonSubmit, "POST"
							, function( returnData )
							{
								if ( returnData.response === undefined || returnData.response.status != 'SUCCESS' )
								{
									me.personCreateUpdate_Fail_Handle( returnData );
								}
								else
								{																					
									var personId = returnData.response.reference;

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
											me.TabularDEObj.programEnroll( personId, defaultProgramId, orgUnitId, defaultDateInFormat
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

										
										PersonUtil.getPersonByID_Reuse( personId, function( item_Person )
										{
											me.TabularDEObj.setPersonInfoRow( me.currentPersonTr, item_Person );

											// Auto Close after Create New
											dialogForm.dialog( "close" );
											me.currentPersonTr.find( '.personInfo' ).focus();
										});
									}
								}
							}
							, me.personCreateUpdate_Fail_Handle
						);
					});
				}

			},
			"Update": function() {

				var dialogForm = $( this );

				// Perform the mandatory filled check first.
				if ( me.checkFieldsData() && ProgramRuleUtil.checkProgramRuleData( me.personDialogTableTag ) )
				{
					var orgUnitId = me.TabularDEObj.getOrgUnitId();
					var defaultProgramId = me.TabularDEObj.getSelectedProgramId();
					var defaultDateInFormat = $.format.date( me.TabularDEObj.getDefaultStartDate(), _dateFormat_YYYYMMDD_Dash );

					var personId = me.personDialogFormTag.find( "#person_id" ).val();

					me.checkDuplicateData( orgUnitId, defaultProgramId, personId, function()
					{

						var personData  = me.setupPersonData( orgUnitId );

						RESTUtil.submitData( personData, _queryURL_PersonSubmit + '/' + personId, "PUT"
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
									, function() 
									{
										if ( me.afterSaveAction !== undefined ) me.afterSaveAction();
									}
									, function()
									{
										me.TabularDEObj.programEnroll( personId, defaultProgramId, orgUnitId, defaultDateInFormat
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


									// Clear the memory data
									PersonUtil.clearPersonByID_Reuse( personId );

									PersonUtil.getPersonByID_Reuse( personId, function( item_Person )
									{
										me.TabularDEObj.populatePersonAttirbutesToRow( me.currentPersonTr, item_Person.attributes );


										// Re-Run the ProgramRules on Event Rows
										me.reRun_EventRowProgramRules( me.currentPersonTr, personId );


										// Auto Close after Update
										dialogForm.dialog( "close" );
										me.currentPersonTr.find( '.personInfo' ).focus();

									});
								}

							}
							, me.personCreateUpdate_Fail_Handle
						);
					});
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

			for ( i = 0; i < json_TrackedEntities.trackedEntities.length ; i++ )
			{
				var trackedEntity = json_TrackedEntities.trackedEntities[i];

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
		
		return '"' + attributeInfo.name + '", ' + errorValue + " - " + errorMessage;
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


				// Step 2. Add template row to the table <-- via append
				me.personDialogTableTag.append("<tr " + visibleInfo + "><td><span class='attrname' attributeId='" + attributeId + "'>" + personAttribute.name + "</span>" + mandatorySpan + "</td><td type='attribute' " + mandatoryAttribute + " attributeId='" + attributeId + "'>" + me.TabularDEObj.getAttrControlsTemplate() + "</td></tr>");

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
			cntrDropdown.append( "<option value=''>Select Value</option>" );

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
		else if( valueType == "TEXT" || valueType == "LONG_TEXT" || valueType == "NUMBER" || valueType == "LETTER" || valueType == "PHONE_NUMBER" || valueType == "EMAIL"  || valueType == "USERNAME" )
		{
			// TODO: For now, have 'username' display as textbox <-- should be user listing
			attributeControl = trCurrent.find( ".textbox" ).val( value ).attr( _view, _view_Yes );

			if ( valueType == "NUMBER" )
			{
				PersonUtil.setTagTypeValidation( attributeControl, "NUMBER" );
			}
			else if ( valueType == "LETTER" )
			{
				PersonUtil.setTagTypeValidation( attributeControl, "LETTER" );
			}
		}
		else if( valueType == "DATE" )
		{
			attributeControl = trCurrent.find( ".datepicker" ).val( value ).attr( _view, _view_Yes );

			// If it is birth date, set attribute for that, so that start/end year can be set appropriately.
			if ( Util.stringSearch( trCurrent.find( 'span.attrname' ).text(), "birth" ) )
			{
				attributeControl.attr( 'caltype', 'birth' );
			}
			else
			{
				attributeControl.attr( 'caltype', 'none' );
			}
		}
		else if( valueType == "TRUE_ONLY" || valueType == "TRACKER_ASSOCIATE" )
		{
			attributeControl = trCurrent.find( ".checkbox" ).attr( _view, _view_Yes ).prop( 'checked', value );
		}
		else
		{
			attributeControl = trCurrent.find( ".label" ).html( 'Currently Not Supported TEI Attribute valueType: ' + valueType ).attr( _view, _view_Yes );
		}

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
					var elementValue = FormUtil.getFormattedAttributeValue( item_element );

					setRowControlsFunc( item_element.id, item_element.mandatory, elementValue, true );
				}
				else
				{
					setRowControlsFunc( item_element.id, item_element.mandatory );
				}
			});
		}
	}


	me.setupPersonData = function( orgUnitId )
	{
		var newPersonObj = {};

		newPersonObj[ "orgUnit" ] = orgUnitId;

		newPersonObj[ "trackedEntity" ] = me.getTrackedEntityId_Person();

		newPersonObj[ "attributes" ] = me.constructAttributes();

		return newPersonObj;
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


	me.constructAttributes = function()
	{
		var attributes = new Array();

		me.personDialogTableTag.find( "td[type='attribute']" ).find( FormUtil.getStr_Views() ).each( function( index ) 
		{
			//Util.write( "In each list.. " );

			var item = $( this );
			
			var attributeId = item.closest( "td" ).attr( "attributeId" );

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

			if( Util.checkValue( dataValue ) )
			{					
				attributes.push( { "attribute": attributeId, "value": dataValue } );
			}
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
