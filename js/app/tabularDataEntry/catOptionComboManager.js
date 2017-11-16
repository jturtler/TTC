
function CatOptionComboManager( _TabularDEObj )
{
	var me = this;
	
	me.TabularDEObj = _TabularDEObj;
	me.defaultCatOptionTag = $("#defaultCatOption");
	
	me.populateCatOptionCombos = function( catOptionTag, catOptionVal, returnFunc )
	{
		catOptionTag.find("option").remove();
		var categoryOptions = JSON.parse(JSON.stringify(me.TabularDEObj.getSelectedProgram().categoryOptions));
		
		// Remove the "Default" option in case this one is in the middle of the list.
		// We need to display "Default" option in the end of the list
		Util.RemoveFromArray( categoryOptions, "id", _settingForm.defaultCatOption.id );
			
		// Add "ALL" categoryOption in the begining of list if there is any "unDefault" categoryOptions exist
		if( categoryOptions.length > 0 )
		{
			categoryOptions.unshift({
				"id": "ALL"
				,"displayName": "All"
			});
			
		}
		
		// Add "Default" categoryOption in the begining of list
		categoryOptions.push( _settingForm.defaultCatOption );
			
		Util.populateSelect( catOptionTag, "CatOption", categoryOptions, "displayName" );
		
		if( returnFunc !== undefined ) returnFunc();
		
		
		if( catOptionVal !== undefined )
		{
			catOptionTag.val( catOptionVal );
		}
		
		if( me.TabularDEObj.getSelectedProgram().categoryOptions.length == 1 )
		{
			catOptionTag.val( _settingForm.defaultCatOption.id );
		}
		
	};
	
	me.getSelectedCategoryOptionId = function()
	{
		return me.defaultCatOptionTag.val();
	};
	
	me.initialSetup = function()
	{
		// me.loadCatOptionCombos();
	};
	
	// --------------------------------------------------------------------------
	// RUN init
	// --------------------------------------------------------------------------
	
	me.initialSetup();
	
}