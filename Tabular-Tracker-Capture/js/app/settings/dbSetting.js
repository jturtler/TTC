
function DBSetting() {}

DBSetting._queryURL_SystemSettings_DHIS225 = _queryURL_api + "systemSettings/";
DBSetting._queryURL_SystemSettings_DHIS228 = _queryURL_api + "dataStore/TTC/";
// DBSetting._queryURL_SystemSettings_DHIS228 = _queryURL_api + "dataStore/";

DBSetting.getQueryURL_SystemSettings = function()
{
	var url = DBSetting._queryURL_SystemSettings_DHIS228;
	if( _settingForm.DHISVersion == "2.25" || _settingForm.DHISVersion == "2.26" )
	{
		url = DBSetting._queryURL_SystemSettings_DHIS225;
	}

	return url;
};

DBSetting.getSettingValue = function( settingName, successFunc, failFunc )
{
	var url = DBSetting.getQueryURL_SystemSettings() + settingName;
	RESTUtil.getAsynchData( url
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
	var url = DBSetting.getQueryURL_SystemSettings() + settingName;
	if( _settingForm.DHISVersion == "2.25" || _settingForm.DHISVersion == "2.26" 
		|| _settingForm.DHISVersion == "2.27" )
	{
		RESTUtil.submitData_Text( submitType, url, jsonData
			,successFunc, failFunc );
	}
	else
	{
		RESTUtil.submitData_JSON( submitType, url, jsonData
			,successFunc, failFunc );
	}
	
}

