
function DBSetting() {}

DBSetting._queryURL_SystemSettings = _queryURL_api + "systemSettings/";

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

DBSetting.saveSettingValue = function( settingName, jsonData, successFunc, failFunc )
{
	RESTUtil.submitData_Text( DBSetting._queryURL_SystemSettings + settingName, jsonData
	,successFunc, failFunc );
}
