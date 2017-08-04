
function SearchMatrixOrgUnit( MatrixObj )
{
	var me = this;
	
	me.MatrixObj = MatrixObj;
	me.orgUnitSelectionTreePopup = me.MatrixObj.orgUnitSelectionTreePopup;
	me.orgUnitSearchRequests = [];
	me.orgUnitSearchParentsRequests = [];
	
	me.queryURL_OrgUnit = _queryURL_api + 'organisationUnits/';
	me.queryURL_OrgUnitNameQuery = _queryURL_api + 'organisationUnits.json?paging=false&fields=name,id,level,parents[id,name,level],ancestors[id,name,level]&filter=name:ilike:';
			
	me.orgUnitNameTag = $( '#matrixOrgUnitName' );
	me.orgUnitTreeBtnTag = $( '#matrixOrgUnitTreeBtn' );
	me.matrixOuDataDivTag = $("#matrixOuDataDiv");
		
	// OrgUnit Selection Tree Popup
	me.orgUnitSelectionTreePopup = me.MatrixObj.orgUnitSelectionTreePopup;
			
	// --------------------------
	// On Init Setup Method	

	me.initialSetup = function()
	{	
		// Set OrgUnit Auto Selection
		me.setUp_OrgUnitAutoSelection( me.orgUnitNameTag );
		
		me.retrieveUserAccessOrgUnits( function()
		{
			Util.paintAttention( me.orgUnitNameTag );
			me.orgUnitNameTag.focus();
		});
		
		me.setUp_orgUnitTreePopup( me.onOrgUnitSelect );
	};
	
	me.setOrgUnitTags = function( orgUnit ) 
	{
		me.orgUnitNameTag.val( orgUnit.name );
		me.orgUnitSelectedId = orgUnit.id;

		Util.paintClear( me.orgUnitNameTag );
	};

	me.getOrgUnitId = function()
	{
		return me.orgUnitSelectedId;
	};
	
	
	me.clear_OrgUnitData = function()
	{
		delete me.orgUnitSelectedId;
	};
	
	me.resetSetting_OrgUnitAndBelow = function()
	{
		me.orgUnitNameTag.val( '' );

		me.clear_OrgUnitData();
	};
	
	// ----------------------------------
	// Event related

	
	me.retrieveUserAccessOrgUnits = function( execFunc )
	{
		DHISUtil.retrieveUserInfo( function( json_data )
		{
			me.userAccessableOrgUnits = json_data.organisationUnits;
			execFunc();
		});					
	};
			
	me.setUp_OrgUnitAutoSelection = function( orgUnitNameTag )
	{
		orgUnitNameTag.autocomplete( {
			source: 
				function( request, response ) 
				{
					orgUnitNameTag.removeClass( "ui-autocomplete-loading" );

					// Reset orgUnitSelectedId and below section
					me.orgUnitSelectionTreePopup.clearSelections();
					me.clear_OrgUnitData();

					me.orgUnitSearchRequests = FormUtil.abortAndClear_XhrRequest( me.orgUnitSearchRequests );
					me.orgUnitSearchParentsRequests = FormUtil.abortAndClear_XhrRequest( me.orgUnitSearchParentsRequests );
					
					
					var json_orgUnitList_new = new Array();


					if ( request.term.length >= 2 )
					{
						var xhr_ouSearch = RESTUtil.getAsynchData( me.queryURL_OrgUnitNameQuery + request.term
						, function( json_orgUnits ) 
						{
							var json_orgUnitList = json_orgUnits.organisationUnits;

							if( Util.checkDataExists( json_orgUnitList ) )
							{
								var deferredArrActions_ouAccessCheck = [];

								QuickLoading.dialogShowAdd( 'orgUnitLoading' );

								// Due to 'ancesters' and 'parents' compatibility, copy 'ancestors' data
								// into 'parents' and use 'parents' always.
								//AppUtil.copyAncestorsToParents( json_orgUnitList );


								$.each( json_orgUnitList, function( i_ou, item_ou)
								{
									var parents;
									var parentKey;
									if( item_ou.parents !== undefined ) {
										parents = item_ou.parents;
										parentKey = "parents";
									}
									else if( item_ou.ancestors !== undefined ) {
										parents = item_ou.ancestors;
										parentKey = "ancestors";
									}
									
									if ( parents !== undefined )
									{
										if ( me.checkUserAccessable( parents ) )
										{
											json_orgUnitList_new.push( me.getOUSelectionFormatted( item_ou, parents ) );
										}
									}
									else
									{
										var xhr_parents = RESTUtil.getAsynchData( me.queryURL_OrgUnit + item_ou.id + '/' + parentKey + '.json?fields=name,id,level', function( json_orgUnitParents ) 
										{
											var ouParents = json_orgUnitParents.organisationUnits;
											if ( me.checkUserAccessable( ouParents ) )
											{
												json_orgUnitList_new.push( me.getOUSelectionFormatted( item_ou, ouParents ) );
											}
										}
										, function() {}
										);

										deferredArrActions_ouAccessCheck.push( xhr_parents );
										// me.orgUnitSearchParentsRequests.push( xhr_parents );
									}
								});


								$.when.apply($, deferredArrActions_ouAccessCheck ).then( function( ) 
								{
									QuickLoading.dialogShowRemove( 'orgUnitLoading' );

									var json_orgUnitList_new_Sorted = Util.sortByKey( json_orgUnitList_new, "value" );

									response( json_orgUnitList_new_Sorted );
								});
							}
						}
						, function() {}
						, function() { QuickLoading.dialogShowAdd( 'orgUnitLoading' ); }
						, function() { QuickLoading.dialogShowRemove( 'orgUnitLoading' ); }
						);

						me.orgUnitSearchRequests.push( xhr_ouSearch );

					}
					else
					{
						response( json_orgUnitList_new );
						me.matrixOuDataDivTag.hide();
						Util.paintAttention( orgUnitNameTag );
					}
				}
			,minLength: 0
			,delay: 800
			,select: 
				function( event, ui ) 
				{							
					me.orgUnitSelectionTreePopup.selectOrgUnit( ui.item.orgUnit.id, ui.item.parents );
					
					// On select, set orgunit info and perform followup steps
					me.onOrgUnitSelect( ui.item.orgUnit );

					orgUnitNameTag.removeClass( "ui-autocomplete-loading" );
					orgUnitNameTag.autocomplete( "close" );
				}
		} );
	};

	me.checkUserAccessable = function( parentOUs )
	{
		var isUserAccessOU = false;

		if ( Util.checkValue( parentOUs ) )
		{
			$.each( parentOUs, function( i_parentOU, item_parentOU )
			{
				$.each( me.userAccessableOrgUnits, function( i_userOU, item_userOU)
				{
					if ( item_userOU.id == item_parentOU.id )
					{
						isUserAccessOU = true;
						return false;
					}
				});

				if ( isUserAccessOU ) return false;
			});
		}

		return isUserAccessOU;
	}


	me.getOUSelectionFormatted = function( item_ou, parents )
	{
		var itemLabel = item_ou.name + " ( lvl:" + item_ou.level;

		if ( Util.getNotEmpty( item_ou.code ).length > 0)
		{
			itemLabel += ", code:" + Util.getNotEmpty( item_ou.code );
		}

		itemLabel += " )";

		return { "id": item_ou.id, "label": itemLabel, "value": item_ou.name, "orgUnit": item_ou, "parents": parents };
	}


	// On select, set orgunit info and perform followup steps
	me.onOrgUnitSelect = function( orgUnit, clearOu )
	{
		// When coming from orgUnitPopupTree selection, clear orgUnit Map data again.
		if ( clearOu !== undefined && clearOu )
		{
			me.clear_OrgUnitData();
		}

		var orgUnitId = orgUnit.id;

		// Set OrgUnit
		me.setOrgUnitTags( orgUnit );

		// Hide the data result table
		me.matrixOuDataDivTag.hide("fast");

	};
	
	me.setUp_orgUnitTreePopup = function( onOrgUnitSelectFunc )
	{
		me.orgUnitTreeBtnTag.click( function()
		{
			me.orgUnitSelectionTreePopup.openForm();

			//return false;
		});

		me.orgUnitSelectionTreePopup.onMatrixOrgUnitSelectSet( onOrgUnitSelectFunc );

	};
	
	
	// ----------------------------------
	// RUN init method
	
	me.initialSetup();

}