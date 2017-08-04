
function RESTUtil() {}

RESTUtil.getAsynchData = function( url, actionSuccess, actionError, loadingStart, loadingEnd ) 
{
	return $.ajax({
		type: "GET"
		,dataType: "json"
		,url: url
		,async: true
		,success: actionSuccess
		,error: actionError
		,beforeSend: function( xhr ) {
			if ( loadingStart !== undefined ) loadingStart();
		}
	})
	.always( function( data ) {
		if ( loadingEnd !== undefined ) loadingEnd();
	});
}


RESTUtil.getSynchData = function( url ) {
	return $.ajax({
		type: "GET",
		dataType: "json",
		url: url,
		async: false
	}).responseText;
}

/*
RESTUtil.submitData_Text = function( settingName, data )
{
	RESTUtil.submitData_URL( _queryURL_SystemSettings + settingName, data
		, function() { alert( 'Saved Successfully!' ); }
		, function() { alert( 'Failed to Save the value.' ); } );
}
*/


RESTUtil.submitData_Text = function( url, jsonData, successFunc, failFunc )
{		
	$.ajax({
	  type: "POST",
	  url: url,
	  data: JSON.stringify( jsonData ),
	  contentType: "text/plain; charset=utf-8",
	  success: function( msg ) {
		  successFunc();
		},
	  error: function( msg ) {
		  failFunc();
		}			   
	});
}

RESTUtil.submitData_URL = function( url, successFunc, failFunc )
{		
	$.ajax({
	  type: "POST",
	  url: url,
	  //data: JSON.stringify( jsonData ),
	  contentType: "text/plain; charset=utf-8",
	  success: function( msg ) {
		  successFunc();
		},
	  error: function( msg ) {
		  failFunc();
		}			   
	});
}


RESTUtil.submitData = function( jsonData, url, submitType, actionSuccess, actionError, loadingStart, loadingEnd)
{
	var jsonDataStr = "";

	if ( jsonData !== undefined )
	{
		jsonDataStr = JSON.stringify( jsonData );
	}
	
	return $.ajax({
		type: submitType
		,url: url
		,data: jsonDataStr
		,datatype: "text"
		,contentType: "application/json; charset=utf-8"
		,async: true
		,success: function( returnData)
		{
			var returnData_Json = {};
			
			try
			{
				if ( typeof returnData === "string" )
				{
					//console.log( 'submitData return string: ' + returnData );
					returnData_Json = $.parseJSON( returnData );
				}
				else if ( typeof returnData === "object" )
				{
					//console.log( 'submitData return object: ' + JSON.stringify( returnData ) );
					returnData_Json = returnData;
				}
			}
			catch(err) { }

			if ( actionSuccess !== undefined ) actionSuccess( returnData_Json );
		}
		,error: function( returnData )
		{
			if ( actionError !== undefined ) actionError( returnData );
		}
		,beforeSend: function( xhr ) {
			if ( loadingStart !== undefined ) loadingStart();
		}
	})
	.always( function( data ) {
		if ( loadingEnd !== undefined ) loadingEnd();
	});		
}


// ------------------------------------------------------------
// Data Retrieval Manager Class
//  - Helps us to load the data only once and reuse it for same request url
//  - Handles multiple request simultaneously.

// Data in memory access
RESTUtil.retrieveManager = new RetrieveManager();


function RetrieveManager() 
{
	var me = this;

	me.dataMemoryList = [];
	me._queryIdStr = "queryId";

	// The Main Retrieval method
	me.retrieveData = function( requestQuery, runFunc, failFunc, loadingStart, loadingEnd )
	{

		// Check if the request query was already been requested before
		var json_Data = Util.getFromList( me.dataMemoryList, requestQuery, me._queryIdStr );

		if ( json_Data === undefined )
		{
			// For the first time requesting, create a queue and run Async..

			var dataMemoryNew = {};
			
			dataMemoryNew[ me._queryIdStr ] = requestQuery;
			dataMemoryNew.data = null;
			dataMemoryNew.requestQueue = new Array();
			dataMemoryNew.requestQueue.push( { 'run': runFunc } ); //, 'loadingEnd': loadingEnd } );
			//dataMemoryNew.requestQueue.push( { 'run': runFunc, 'loadingEnd': loadingEnd } );

			me.dataMemoryList.push( dataMemoryNew );


			// Retrieve it
			RESTUtil.getAsynchData( requestQuery, function( dataObj ) 
			{
				// Once it gets data, run all the return functions..
				dataMemoryNew.data = dataObj;

				$.each( dataMemoryNew.requestQueue, function( i_func, item_func )
				{
					if ( item_func.run !== undefined ) item_func.run( dataObj );
				});

				// clear the queue.
				//dataMemoryNew.requestQueue = new Array();
			}
			, function( data )
			{
				if ( failFunc !== undefined ) failFunc( data );
				dataMemoryNew.data = '';	// So, that we can mark this request as 'already retrieved before' case.
			}
			, loadingStart
			, function()
			{
				if ( loadingEnd !== undefined ) loadingEnd();

				$.each( dataMemoryNew.requestQueue, function( i_func, item_func )
				{
					if ( item_func.loadingEnd !== undefined ) item_func.loadingEnd();
				});

				// clear the queue.
				dataMemoryNew.requestQueue = new Array();
			}
			);
		}
		else
		{
			// For already existing query or existing data:
			if ( loadingStart !== undefined ) loadingStart();
			
			// If the data is already retrieved before, return the data.
			if ( Util.checkDefined( json_Data.data ) )
			{
				runFunc( json_Data.data );
				if ( loadingEnd !== undefined ) loadingEnd();
			}
			else
			{
				// If the data is still in process, add the function to the request queue.
				// Add return fucntions to the queue.
				var newRequest = { 'run': runFunc };
				if ( loadingEnd !== undefined ) newRequest.loadingEnd = loadingEnd;

				json_Data.requestQueue.push( newRequest );
			}
		}
	}


	// Not Used for now.
	me.insertDirectToMemory = function( dataList, idName, idValue, data )
	{
		var dataNew = {};
		
		dataNew[ idName ] = idValue;
		dataNew.data = data;
		dataNew.requestQueue = new Array();

		dataMemoryList.push( dataNew );
	}
	
	me.clearMemory = function()
	{
		me.dataMemoryList = [];
	}

	me.removeFromMemory = function( requestQuery )
	{
		Util.RemoveFromArray( me.dataMemoryList, me._queryIdStr, requestQuery );
	}

}

// End of Data Retrieval Manager Class
// ------------------------------------------------------------
