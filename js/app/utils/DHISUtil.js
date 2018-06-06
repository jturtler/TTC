
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

