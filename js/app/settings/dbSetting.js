
function DBSetting() {}

// DBSetting._queryURL_SystemSettings = _queryURL_api + "systemSettings/";
DBSetting._queryURL_SystemSettings = _queryURL_api + "dataStore/TTC/";

DBSetting.getSettingValue = function( settingName, successFunc, failFunc )
{
	RESTUtil.getAsynchData( DBSetting._queryURL_SystemSettings + settingName
	, function( data )
	{
		successFunc( data );
	}
	, function( failMsg )
	{
		console.log( '[DBSetting.getSettingValue] Failed to get data from systemSettings/' + settingName + '.  Info: ' + JSON.stringify( failMsg ) );
		failFunc( failMsg );
	});
}

DBSetting.saveSettingValue = function( submitType, settingName, jsonData, successFunc, failFunc )
{
	RESTUtil.submitData_Text( submitType, DBSetting._queryURL_SystemSettings + settingName, jsonData
	,successFunc, failFunc );
}

