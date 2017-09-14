
function DataElementOrguUnitPopup( _TabularDEObj )
{
	var me = this;
	me.TabularDEObj = _TabularDEObj;
	
	me.inputCodeTag;
	me.inputGPSTag;
	
	me.PARAM_ORGUNITID = "@PARAM_ORGUNITID";
	me._queryURL_orgUnit_L5 = _queryURL_api + "organisationUnits/" + me.PARAM_ORGUNITID + ".json?fields=id,name,code,level,coordinates&includeDescendants=true&filter=level:eq:5";
		
	me.dialogFormTag = $("#orgUnit_DataElementForm");
	
	me.deOrgUnitSelectorOptionTag = $("[name='deOrgUnitSelectorOption']");
	me.villageByHeathCenterOptionTag = $("[name='deOrgUnitSelectorOption'][value='villageByHeathCenter']");
	me.villageByOULevelTag = $("[name='deOrgUnitSelectorOption'][value='villageByOULevel']");
			
			
	me.villageByOULevelSelectorOptionTag = $("#villageByOULevelSelectorOption");
	me.villageByHeathCenterTbTag = $("#villageByHeathCenterTb");
	me.villageByOULevelTbTag = $("#villageByOULevelTb");
	
	me.deOrgunitListTag = $("#deOrgunitList");
	me.deProvinceListTag = $("#deProvinceList");
	me.deDistritListTag = $("#deDistritList");
	me.deCommuneListTag = $("#deCommuneList");
	me.deVillageListTag = $("#deVillageList");
						
	me.provinceHierarchy = [];
	
	// --------------------------------------------------------------------------
	// Init method
	// --------------------------------------------------------------------------
	
	me.initialSetup = function()
	{
		var orgUnitHierarchy = new OrgUnitHierarchy();
		me.provinceHierarchy = orgUnitHierarchy.provinceHierarchy;
		
		me.villageByHeathCenterOptionTag.prop("checked", true );
		Util.disableTag( me.villageByHeathCenterTbTag, false );
		Util.disableTag( me.deProvinceListTag, true );
		Util.disableTag( me.deDistritListTag, true );
		Util.disableTag( me.deCommuneListTag, true );
		Util.disableTag( me.deVillageListTag, true );
				
		me.loadProvinces();
		
		me.FormPopupSetup();
		me.setUp_Events();
	};
	
	
	// --------------------------------------------------------------------------
	// Load Organisation Unit in levels
	// --------------------------------------------------------------------------
	
	me.setInputTags = function( inputCodeTag, inputGPSTag )
	{
		me.inputCodeTag = inputCodeTag;
		me.inputGPSTag = inputGPSTag;
	};
	
	me.FormPopupSetup = function()
	{
		// -- Set up the form -------------------
		me.dialogFormTag.dialog({
		  title: "Select Village"
		  ,autoOpen: false,
		  //dialogClass: "noTitleStuff",
		  width: 490,
		  height: 265,
		  modal: true,
		  buttons: {
			"Ok": function() {
				
				var villageObj;
				var villageCode = "no found";
				var coordinates = "0,0";
				var searchVillageCode = "";

				var ouOptionSelected = $("[name='deOrgUnitSelectorOption']:checked").val();
				if( ouOptionSelected == 'villageByHeathCenter' )
				{
					searchVillageCode = me.deOrgunitListTag.val();
					var ouCoordinates = me.deOrgunitListTag.find("option:selected").attr("coordinates");
					if( ouCoordinates != undefined )
					{
						coordinates = ouCoordinates;
					}
				}
				else
				{
					searchVillageCode = me.deVillageListTag.val();
				}
				
				var villageCode = "";
				if( coordinates !== undefined )
				{
					villageCode = searchVillageCode;
					coordinates = coordinates.replace("[", "").replace("]", "");
				}
				else
				{
					// Find the village
					villageFound = me.findVillageByCode( searchVillageCode );
					if( villageFound.villageObj !== undefined )
					{
						villageCode = villageFound.villageObj.code;
						coordinates = villageFound.villageObj.coordinates.replace("[", "").replace("]", "");
					}
					else
					{
						coordinates = "";
					}
				}
				
				me.inputCodeTag.val( villageCode );
				me.inputCodeTag.change();
				me.inputGPSTag.val( coordinates );
				me.inputGPSTag.change();
				
				$( this ).dialog( "close" );
			}  
			,"Cancel": function() {
				$( this ).dialog( "close" );
			}
		  }
		});		
	};

	
	me.openForm = function()
	{
		me.loadOrgUnitL5( function(){
			var searchCode = me.inputCodeTag.val();
			me.populateVillagebyCode( searchCode );
		});
		
		me.dialogFormTag.show();
		me.dialogFormTag.dialog( "open" );
		
	};
	
	me.populateVillagebyCode = function( searchCode )
	{
		// STEP 1. Show the selected orgunit in [Village by HC] selector
		me.deOrgunitListTag.val( searchCode );
		if( me.deOrgunitListTag.val() != "" )
		{
			me.villageByHeathCenterOptionTag.prop( "checked", true );
			me.villageByOULevelTag.prop( "checked", false );
		}
		else
		{
			me.villageByHeathCenterOptionTag.prop( "checked", false );
			me.villageByOULevelTag.prop( "checked", true );
		}
		
		me.deOrgUnitSelectorOptionOnChange();
		
		// STEP 2. Display the selected orgunit of [Village by HC] selector in [Village by Provice/ Dist/ Commune] section if any
		
		var villageObj;
		var provinceCode ;
		var districtCode;
		var communeCode;
		
		// Find the village
		var villageFound = me.findVillageByCodeInGSheet( searchCode );
		
		if( villageFound.villageObj !== undefined )
		{
			me.deProvinceListTag.val( villageFound.provinceCode );
			me.deProvinceListTag.change();
			
			me.deDistritListTag.val( villageFound.districtCode );
			me.deDistritListTag.change();
			
			me.deCommuneListTag.val( villageFound.communeCode );
			me.deCommuneListTag.change();
			
			me.deVillageListTag.val( villageFound.villageObj.code );
		}
		else
		{
			me.deProvinceListTag.val( "" );
			me.deProvinceListTag.change();
			
			me.deDistritListTag.val( "" );
			me.deCommuneListTag.val( "" );
			me.deVillageListTag.val( "" );
		}
	};

	me.findVillageByCode = function( searchCode )
	{
		var ouOptionSelected = $("[name='deOrgUnitSelectorOption']:checked").val();
		if( ouOptionSelected == 'villageByHeathCenter' )
		{
			return me.findVillageByCodeInGSheet( searchCode );
		}
		
		return {
				"villageObj": JSON.parse( me.deVillageListTag.find("option:selected").attr("jsonData") )
				,"provinceCode": me.deProvinceListTag.val()
				,"districtCode": me.deDistritListTag.val()
				,"communeCode": me.deCommuneListTag.val()
			}
	};	
		
	me.findVillageByCodeInGSheet = function( searchCode )
	{
		var villageObj;
		
		for( var i in me.provinceHierarchy )
		{
			if( villageObj !== undefined ) break;
			
			provinceCode = me.provinceHierarchy[i].code;
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).children;
			for( var j in districtList )
			{
				if( villageObj !== undefined ) break;
				
				districtCode = districtList[j].code;
				var communeList = Util.findItemFromList( districtList, "code", districtCode );
				if( communeList !== undefined )
				{
					
					if( villageObj !== undefined ) break;
					
					communeList = communeList.children;
					for( var k in communeList )
					{
						communeCode = communeList[k].code;
						var villageList = Util.findItemFromList( communeList, "code", communeCode ).children;
						if( villageList !== undefined && villageObj == undefined )
						{
							villageObj = Util.findItemFromList( villageList, "code", searchCode );
							
							if( villageObj != undefined )
							{
								return {
									"villageObj": villageObj
									,"provinceCode": provinceCode
									,"districtCode": districtCode
									,"communeCode": communeCode
								}
							}
							
						}
					}
				}
			}
		}
		
		return {};
	};
	
	
	me.setUp_Events = function()
	{
		me.deOrgUnitSelectorOptionTag.click( function(){
			me.deOrgUnitSelectorOptionOnChange();
		});
	
		me.deProvinceListTag.change( function(){
			me.deDistritListTag.find("option").remove();
			me.deCommuneListTag.find("option").remove();
			me.deVillageListTag.find("option").remove();
			
			me.loadDistrictList( me.deProvinceListTag.val() );
		});
		
		me.deDistritListTag.change( function(){
			me.deCommuneListTag.find("option").remove();
			me.deVillageListTag.find("option").remove();
			
			me.loadCommuneList( me.deProvinceListTag.val(), me.deDistritListTag.val() );
		});
		
		me.deCommuneListTag.change( function(){
			me.deVillageListTag.find("option").remove();
			
			me.loadVillageList( me.deProvinceListTag.val(), me.deDistritListTag.val(), me.deCommuneListTag.val() );
		});
	};
	
	me.deOrgUnitSelectorOptionOnChange = function()
	{
		var optionVal = $("[name='deOrgUnitSelectorOption']:checked").val();
		if( optionVal == "villageByHeathCenter" )
		{
			Util.disableTag( me.deOrgunitListTag, false );
			Util.disableTag( me.deProvinceListTag, true );
			Util.disableTag( me.deDistritListTag, true );
			Util.disableTag( me.deCommuneListTag, true );
			Util.disableTag( me.deVillageListTag, true );
		}
		else if( optionVal == "villageByOULevel" )
		{
			Util.disableTag( me.deOrgunitListTag, true );
			Util.disableTag( me.deProvinceListTag, false );
			Util.disableTag( me.deDistritListTag, false );
			Util.disableTag( me.deCommuneListTag, false );
			Util.disableTag( me.deVillageListTag, false );
		}
	};
	
	// --------------------------------------------------------------------------
	// Load Organisation Unit in levels
	// --------------------------------------------------------------------------
	
	me.loadOrgUnitL5 = function( exeFunc )
	{
		Util.disableTag( me.deOrgunitListTag, true );
		me.deOrgunitListTag.find("option").remove();
		me.deOrgunitListTag.append("<option>Loading</option>");
		
		var url = me._queryURL_orgUnit_L5;
		url = url.replace( me.PARAM_ORGUNITID, me.TabularDEObj.searchPanel.getOrgUnitId() );
		RESTUtil.getAsynchData( url
			, function( jsonData )
			{
				me.deOrgunitListTag.find("option").remove();
				me.deOrgunitListTag.append( $( '<option value="">[Select Village]</option>' ) );
				for( var i in jsonData.organisationUnits )
				{
					var item = jsonData.organisationUnits[i];
					me.deOrgunitListTag.append( $( '<option></option>' )
					.attr( "value", item.code )
					.attr( "coordinates", item.coordinates )
					.text( item.name ) );
				}
				
				Util.disableTag( me.deOrgunitListTag, false );	

				if( exeFunc !== undefined ) exeFunc();		
			}
		);
	};
	
	me.loadProvinces = function()
	{
		me.deProvinceListTag.append( $( '<option value="">[Select Province]</option>' ) );
		for( var i in me.provinceHierarchy )
		{
			var item = me.provinceHierarchy[i];
			me.deProvinceListTag.append( $( '<option></option>' ).attr( "value", item.code ).text( item.name ) );
		}
	};
	
	me.loadDistrictList = function( provinceCode )
	{
		me.deDistritListTag.find("option").remove();
		me.deDistritListTag.append( $( '<option value="">[Select District]</option>' ) );
		
		if( provinceCode != "" )
		{
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).children;
		
			for( var i in districtList )
			{
				var item = districtList[i];
				me.deDistritListTag.append( $( '<option></option>' ).attr( "value", item.code ).text( item.name ) );
			}
		}		
	};
	
	me.loadCommuneList = function( provinceCode, districtCode )
	{
		me.deCommuneListTag.find("option").remove();
		me.deCommuneListTag.append( $( '<option value="">[Select District]</option>' ) );
		
		if( districtCode != "" )
		{
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).children;
			var communeList = Util.findItemFromList( districtList, "code", districtCode ).children;
			
			for( var i in communeList )
			{
				var item = communeList[i];
				me.deCommuneListTag.append( $( '<option></option>' ).attr( "value", item.code ).text( item.name ) );
			}
		}
	};
	
	me.loadVillageList = function( provinceCode, districtCode, communeCode )
	{
		me.deVillageListTag.find("option").remove();
		me.deVillageListTag.append( $( '<option value="">[Select Village]</option>' ) );
			
		if( communeCode != "" )
		{
			var districtList = Util.findItemFromList( me.provinceHierarchy, "code", provinceCode ).children;
			var communeList = Util.findItemFromList( districtList, "code", districtCode ).children;
			var villageList = Util.findItemFromList( communeList, "code", communeCode ).children;
			
			for( var i in villageList )
			{
				var item = villageList[i];
				me.deVillageListTag.append( $( '<option></option>' )
					.attr( "value", item.code )
					.attr( "jsonData", JSON.stringify( item ) )
					.text( item.name ) );
			}
		}	
	};
	
	
	// --------------------------------------------------------------------------
	// RUN init
	// --------------------------------------------------------------------------
	
	me.initialSetup();
	
}