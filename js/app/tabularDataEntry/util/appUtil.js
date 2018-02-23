
function DHISUtil() {}

DHISUtil.data = { version: "" };

DHISUtil.retrieveAndSet_DHISData = function()
{
	// Only version info for now.
	RESTUtil.getAsynchData( _queryURL_systemInfo
	, function( json_data ) 
	{
		DHISUtil.data.version = json_data.version;
	});

	selectionTree.clearSelectedOrganisationUnits();
}

DHISUtil.getDHISVersion = function()
{
	return DHISUtil.data.version;
}

// --------------------------------------------------------------------------------
// DHIS Util
// --------------------------------------------------------------------------------

DHISUtil.preRetrieve_UserInfo = function()
{
	// pre retrieve user info by using 'retrieveManager', which saves/reuse the retrieval.
	DHISUtil.retrieveUserInfo();
}

DHISUtil.retrieveUserInfo = function( runFunc )
{
	RESTUtil.retrieveManager.retrieveData( _queryURL_me + '.json?fields=*,userCredentials[*,userRoles[id,name]],organisationUnits[id,name]'
	, function( json_data ) 
	{
		if ( runFunc !== undefined ) runFunc( json_data );
	});			
}

DHISUtil.retrieveUserAccount = function( runFunc )
{
	RESTUtil.retrieveManager.retrieveData( _queryURL_me + '/user-account.json'
	, function( json_data ) 
	{
		if ( runFunc !== undefined ) runFunc( json_data );
	});			
}


// --------------------------------------------------------------------------------
// App Util
// --------------------------------------------------------------------------------

function AppUtil() {}

AppUtil.CheckCachedFileSynch = function()
{
	var outOfSynch = false;
	var msg = "";

	if ( RESTUtil.retrieveManager === undefined )
	{
		outOfSynch = true;
		msg += "RESTUtil.retrieveManager not found";
	}

	if ( outOfSynch )
	{
		alert( $( 'span.msg_CacheClear' ).text() );
	}
}


AppUtil.copyAncestorsToParents = function( ouList )
{
	if ( ouList.length > 0 
		&& ouList[0].parents === undefined 
		&& ouList[0].ancestors !== undefined 
		)
	{
		$.each( ouList, function( i_ou, item_ou )
		{
			item_ou.parents = item_ou.ancestors;
		});
	}
}

AppUtil.pageHScroll = function( option )
{
	if ( option === "Right" )
	{
		// Scroll to right end
		var left = $(document).outerWidth() - $(window).width();
		$('body, html').scrollLeft( left );
	}
	else
	{
		$('body, html').scrollLeft( 0 );
	}
}


// --------------------------------------------------------------------------------
// FormUtil
// --------------------------------------------------------------------------------

function FormUtil() {}

FormUtil.setTagAsWait_SetRows = function( tagRows )
{
	tagRows.each( function( i )
	{
		me.setTagAsWait( $( this ) );
	});
}

FormUtil.setTagAsWait = function( tag, classNameInput )
{
	var className = ( classNameInput !== undefined ) ? classNameInput : 'waitRow' ;
	tag.addClass( className );
	
	Util.disableTag( tag, true );
}

FormUtil.setTagAsWait_Clear = function( tag, classNameInput )
{
	var className = ( classNameInput !== undefined ) ? classNameInput : 'waitRow' ;
	tag.removeClass( className );
	
	Util.disableTag( tag, false );
}

FormUtil.setSelectTagOptions_YesNo = function( ctrlTag )
{
	ctrlTag.append('<option value="">[Please select]</option>');
	ctrlTag.append('<option selected="selected" value="true">Yes</option>');
	ctrlTag.append('<option value="false">No</option>');
}

FormUtil.getStr_Views = function()
{
	return "input[" + _view + "='" + _view_Yes + "'],select[" + _view + "='" + _view_Yes + "'],textarea[" + _view + "='" + _view_Yes + "']";
}

FormUtil.setTabBackgroundColor_Switch = function( ctrlTags )
{
	ctrlTags.focus( function()
	{
		$( this ).closest( 'td' ).css('background-color', '#F7F7F7');
	});

	ctrlTags.focusout( function()
	{
		$( this ).closest( 'td' ).css('background-color', 'white');
	});

}

FormUtil.getFormattedAttributeValue = function( attributeObj )
{
	var attributeValue = attributeObj.value;

	if ( attributeObj.type == "date" )
	{
		attributeValue = attributeValue.substring( 0, 10 );
	}

	return attributeValue;
}

FormUtil.abortAndClear_XhrRequest = function( xhrRequests )
{
	$.each( xhrRequests, function( i_xhr, item_xhr )
	{
		item_xhr.abort();
	});

	return [];
}

FormUtil.validateValueType = function( tag, inputType )
{
	var pass = true;

	// Clear
	Util.paintClear( tag );
	tag.attr( 'title', '' );
	tag.attr( 'notvalid', '' );

	if ( inputType == "NUMBER" )
	{
		var reg = new RegExp( '^[0-9]*$' );

		if ( !reg.test( tag.val() ) )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'This field is Number Only field.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}
	else if ( inputType == "LETTER" )
	{
		var reg = new RegExp( '^[a-zA-Z]*$' );

		if ( !reg.test( tag.val() ) )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'This field is Letter Only field.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}
	else if ( inputType == "DATE" )
	{
		// Due to '/' not doing date check properly, change to '-'
		var dateStr = tag.val().replace( /\//ig, '-' );

		if ( !moment( dateStr ).isValid() )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'The date is not valid date.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}

	return pass;
};


// --------------------------------------------------------------------------------
// PersonUtil
// --------------------------------------------------------------------------------

function PersonUtil() {}

PersonUtil.primaryAttributeVal = "PrimaryAttributeVal";

PersonUtil.getPersonByID = function( personId )
{
	return $.parseJSON( RESTUtil.getSynchData( _queryURL_PersonQuery + "/" + personId + ".json?fields=*" ) );			
}

PersonUtil.clearPersonByID_Reuse = function( personId )
{
	var queryUrl = _queryURL_PersonQuery + "/" + personId + ".json?fields=*";
	
	// remove any saved data from memory
	RESTUtil.retrieveManager.removeFromMemory( queryUrl );
};

PersonUtil.getPersonByID_Reuse = function( personId, successFunc, finalFunc )
{			
	var queryUrl = _queryURL_PersonQuery + "/" + personId + ".json?fields=*";

	RESTUtil.retrieveManager.retrieveData( queryUrl
	, successFunc
	, function()
	{
		console.log( "FAILED -- PersonUtil getPersonByID_Async(), personId: " + personId ); 
	}
	, function() {}
	, function() { if ( finalFunc !== undefined ) finalFunc(); } 
	);	
}
//RESTUtil.getAsynchData( _queryURL_PersonQuery + "/" + personId + ".json"
//PersonUtil.getPersonByID_Reuse = function( personId, actionSuccess, actionError, loadingStart, loadingEnd )


PersonUtil.addIDtypeToID = function( item_Person )
{
	if ( Util.checkDefined( item_Person ) )
	{
		// Set attributeID as ID
		if( Util.checkDefined( item_Person.attributes ) )
		{
			$.each( item_Person.attributes, function( i_attribute, item_attribute ) 
			{
				item_attribute.id = item_attribute.attribute;
			});
		}
	}
}


PersonUtil.setPersonWithFirstAttributeData = function( personObjList, firstAttributeId )
{
	$.each( personObjList, function( i_person, item_person )
	{
		var attritubeValue = "";

		if ( item_person.attributes === undefined )
		{
			item_person[ PersonUtil.primaryAttributeVal ] =  "";
		}
		else
		{
			// look for attribute value with id
			$.each( item_person.attributes, function( i_attribute, item_attribute )
			{
				if ( item_attribute.attribute == firstAttributeId )
				{
					attritubeValue = item_attribute.value;
					return false;
				}
			});

			item_person[ PersonUtil.primaryAttributeVal ] =  attritubeValue;

		}
	});
}


PersonUtil.setTagTypeValidation = function( inputTags, inputType )
{			
	inputTags.off( "change" ).on( "change", function ( event ) 
	{
		var tag = $( this );

		FormUtil.validateValueType( tag, inputType );
	});
}



// --------------------------------------------------------------------------------
// EventUtil
// --------------------------------------------------------------------------------

function EventUtil() {}

EventUtil.varSrcType_TEI_Attribute = "TEI_ATTRIBUTE";
EventUtil.varSrcType_DE_CurrentEvent = "DATAELEMENT_CURRENT_EVENT";
EventUtil.varSrcType_DE_NewestEventInProgram = "DATAELEMENT_NEWEST_EVENT_PROGRAM";
EventUtil.varSrcType_DE_NewestEventInProgStage = "DATAELEMENT_NEWEST_EVENT_PROGRAM_STAGE";
EventUtil.varSrcType_DE_PreviousEvent = "DATAELEMENT_PREVIOUS_EVENT";


EventUtil.getProgramStageId_FromRow = function( trEventRow )
{
	return trEventRow.find( "select.eventStage" ).attr( "selectedProgramStage" );
}

EventUtil.getEventId_FromRow = function( trEventRow )
{
	return trEventRow.attr( "uid" );
}


EventUtil.clearLatestEvent_Reuse = function( TabularDEObj, personId )
{			
	var orgUnitId = TabularDEObj.getOrgUnitId();
	var programId = TabularDEObj.getSelectedProgramId();

	var queryUrl = _queryURL_EventQuery + "&orgUnit=" + orgUnitId + "&program=" + programId + "&trackedEntityInstance=" + personId;

	// remove any saved data from memory
	RESTUtil.retrieveManager.removeFromMemory( queryUrl );
};

EventUtil.getLatestEvent_Reuse = function( TabularDEObj, personId, successFunc, finalFunc )
{
	var orgUnitId = TabularDEObj.getOrgUnitId();
	var programId = TabularDEObj.getSelectedProgramId();

	var queryUrl = _queryURL_EventQuery + "&orgUnit=" + orgUnitId + "&program=" + programId + "&trackedEntityInstance=" + personId;
	

	RESTUtil.retrieveManager.retrieveData( queryUrl
	, successFunc
	, function()
	{
		console.log( "FAILED -- EventUtil getLatestEvent_Reuse(), queryUrl: " + queryUrl ); 
	}
	, function() {}
	, function() { if ( finalFunc !== undefined ) finalFunc(); } 
	);	
}


EventUtil.getEventBySrcType = function( reuse, orgUnitId, programId, personId, srcType, programStageId, currEventId, successFunc, finalFunc )
{
	var retrievalFunc = ( reuse ) ? RESTUtil.retrieveManager.retrieveData : RESTUtil.getAsynchData;

	var queryUrl = _queryURL_EventQuery + "&orgUnit=" + orgUnitId + "&program=" + programId + "&trackedEntityInstance=" + personId;
	
	retrievalFunc( queryUrl
	, function( item_Events )
	{
		var foundEvent;

		if ( item_Events !== undefined && item_Events.events !== undefined && item_Events.events.length > 0 )
		{
			var events_InReverse = Util.sortByKey_Reverse( item_Events.events, "eventDate" );				

			if ( srcType == EventUtil.varSrcType_DE_NewestEventInProgram )
			{
				foundEvent = events_InReverse[0];
			}
			else if ( srcType == EventUtil.varSrcType_DE_NewestEventInProgStage )
			{
				foundEvent = ( programStageId ) ? ( Util.getMatchesFromList( events_InReverse, programStageId, "programStage" ) )[0] : events_InReverse[0];
			}
			else if ( srcType == EventUtil.varSrcType_DE_PreviousEvent && currEventId )
			{

				console.log( 'DATAELEMENT_PREVIOUS_EVENT case' );

				var lastWasCurrentEvent = false;

				$.each( events_InReverse, function( i_event, item_event )
				{

					console.log( 'events' );

					if ( lastWasCurrentEvent )
					{
						lastWasCurrentEvent = false;
						foundEvent = item_event;
						return false;
					}

					if ( item_event.event == currEventId ) lastWasCurrentEvent = true;

				});

				console.log( 'foundEvent: ' + JSON.stringify( foundEvent ) );

			}
		}

		// Do not need to run 'successFunc' if no result found
		if ( foundEvent !== undefined ) successFunc( foundEvent );
	}
	, function()
	{
		console.log( "FAILED -- EventUtil getEventBySrcType_Reuse(), queryUrl: " + queryUrl ); 
	}
	, function() {}
	, function() { if ( finalFunc !== undefined ) finalFunc(); } 
	);	
}

// (Functions not yet populated much - move from PersonEvent class)
EventUtil.appendSelectOption_Option = function( selectTag, item_Option )
{
	if ( typeof item_Option === "string" )
	{
		selectTag.append( "<option>" + item_Option + "</option>" );
	}
	else if ( typeof item_Option === "object" )
	{
		selectTag.append( "<option value='" + item_Option.code  + "'>" + item_Option.displayName + "</option>" );
	}
}

EventUtil.getNextRowFocus_Event = function( trCurrent )
{
	var nextRowEventTag;

	var trTable = trCurrent.closest( 'table' );
	var trCurrent_EventRowNo = parseInt( trCurrent.attr( 'eventrowno' ) );

	
	trTable.find( 'tr.trEventData' ).each( function()
	{
		var eventRowNo = parseInt( $( this ).attr( 'eventrowno' ) );

		if( eventRowNo > trCurrent_EventRowNo )
		{
			var list = $( this ).find( 'input,select' ).filter( ':visible' ).filter( ':enabled' );
			if ( list.length > 0 )
			{
				nextRowEventTag = list.first();
				return false;
			}
		}
	});

	
	// If next row active tags were not found, focus on the button.
	if ( nextRowEventTag === undefined )
	{
		var buttonTag = trTable.parent().find( '.personEvent_addNewRow' );

		if ( buttonTag.length == 1 )
		{
			nextRowEventTag = buttonTag;
		}
	}


	return nextRowEventTag;
}
