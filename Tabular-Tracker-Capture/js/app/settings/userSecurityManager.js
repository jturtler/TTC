
function UserSecurityManager()
{
	var me = this;
	
	me.userInfo;
	me.userGroups = [];

	me.queryURL_me = _queryURL_api + "me.json?fields=*,userGroups[id,name],userCredentials[username,userRoles[name,authorities,programs]]";
	me.queryURL_createUserGroup = _queryURL_api + "userRoles";
	me.queryURL_userRoleList = _queryURL_api + "userRoles.json?paging=false&fields=id,name,authorities";
	
	me.roleName_EditSettings = "_App_TTC_Admin";
	me.roleJson = { "name": me.roleName_EditSettings, authorities:["F_SYSTEM_SETTING"], "description":"Controls access to TTC setting menu - role automatically created by TTC on first run" };
	me.usernameTag = $("#username");
	
	// -----------------------------------------------------

	me.getUserId = function()
	{
		return me.userInfo.id;
	};

	me.getUserName = function()
	{
		return me.userInfo.name;
	};

	me.getUserLoginId = function()
	{
		return me.userInfo.userCredentials.username;
	};
	
	me.isDhisSuperUser = function()
	{
		var roleAuthorities = me.getRoleAuthorities();
		
		return ( roleAuthorities.indexOf( "ALL" ) >= 0 ) || me.isAppSuperUser();
	};
	
	me.isAppSuperUser = function()
	{
		var userLoginId = me.getUserLoginId();

		return ( userLoginId == "jamesc" || userLoginId == "rmelia" || userLoginId == "tranc"	);
	};

	me.isSecretUser = function()
	{
		var userLoginId = me.getUserLoginId();

		return ( userLoginId == "jamesc" || userLoginId == "tranc"  );
	};

	me.getInitialSecurity = function()
	{
		return { "owner": { "id": me.getUserId(), "name": me.getUserName()}, "permissions": [] };
	};

	me.existsInUserGroups = function( userGroupId )
	{
		return Util.checkExistInList( me.userGroups, userGroupId );
	};

	me.existsInUserGroupsWithList = function( permissions )
	{
		var editPermit = false;

		$.each( permissions, function( i_pm, item_pm )
		{
			if ( item_pm.type == 'Edit' && Util.checkExistInList( me.userGroups, item_pm.id ) )
			{
				editPermit = true;
				return false;
			}
		});

		return editPermit;
	};


	me.getUserPermission_OrgUnitAccess = function()
	{
		return { "Editable" : me.userInfo.organisationUnits, "Viewable" : me.userInfo.dataViewOrganisationUnits };
	}


	me.getUserPermission_Authorities = function()
	{
		var authorities = { "Settings_Edit": false };

		var roleAuthorities = me.getRoleAuthorities();
		
		var hasSuperUserRole = ( roleAuthorities.indexOf( "ALL" ) >= 0 );

		if ( hasSuperUserRole )
		{
			authorities.Settings_Edit = true;
		}
		else
		{
			var userGroups = me.userInfo.userGroups;

			authorities.Settings_Edit = Util.checkExistInList( userGroups, me.roleName_EditSettings, "name" );
		}

		return authorities;
	};
	

	me.getRoleAuthorities = function()
	{
		var authorities = [];

		$.each( me.userInfo.userCredentials.userRoles, function( i_role, item_role )
		{
			$.each( item_role.authorities, function( i_auth, item_auth )
			{
				authorities.push( item_auth );
			});
		});

		return authorities;
	}


	// -----------------------------------------------------

	me.retrieveUserInfo = function( runFunc )
	{			
		RESTUtil.retrieveManager.retrieveData( me.queryURL_me
		, function( json_Data ) 
		{
			me.userInfo = json_Data;
			me.programs = []
			var userRoles = json_Data.userCredentials.userRoles;
			for( var i=0; i<userRoles.length; i++ )
			{
				if( userRoles[i].programs!= undefined )
				{
					me.programs = me.programs.concat( userRoles[i].programs );
				}
			}
			
			if ( json_Data.userGroups !== undefined )
			{					
				me.userGroups = json_Data.userGroups;
			}

			me.usernameTag.html( json_Data.userCredentials.username );

			runFunc();
		});
	};


	// This gets called on preload step of the main
	me.performSetup = function( returnFunc )
	{
		me.retrieveUserInfo( function()
		{
			me.checkAndCreateUserGroup( function(){
				returnFunc( me );
			});
		});
	};

	// ========================================================
	// Create the user group if it doesn't exist
	
	me.createEditSettingsUserRole = function( returnFunc )
	{
		RESTUtil.submitData_URL( "POST", me.queryURL_createUserGroup, me.roleJson, function(){
			returnFunc();
		})
	};
	
	
	me.updateEditSettingsUserRole = function( id, returnFunc )
	{
		RESTUtil.submitData_URL( "PUT", me.queryURL_createUserGroup + "/" + id, me.roleJson, function(){
			returnFunc();
		})
	};
	
	me.checkAndCreateUserGroup = function( runFunc )
	{			
		RESTUtil.retrieveManager.retrieveData( me.queryURL_userRoleList
		, function( json_Data ) 
		{
			var existed = Util.getFromList( json_Data.userRoles, me.roleName_EditSettings, "name" );
			if( existed == undefined )
			{
				me.createEditSettingsUserRole( runFunc );
			}
			else
			{
				if( existed.authorities.indexOf( "F_SYSTEM_SETTING" ) < 0 )
				{
					var jsonData = { "id": existed.id, "name": me.roleName_EditSettings, authorities:["F_SYSTEM_SETTING"] };
					me.updateEditSettingsUserRole( existed.id, runFunc );
				}
				else
				{
					runFunc( me );
				}
			}
		});
		
	};


	// ========================================================

	me.initialSetup = function( )
	{	
		
	};

	// Initial Setup Call
	me.initialSetup();
}

