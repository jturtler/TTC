
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
