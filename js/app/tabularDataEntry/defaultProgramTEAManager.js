
function DefaultProgram_TEA_Manager()
{
	var me = this;
	//me.TabularDEObj = TabularDEObj;
	me.TEAs = []; // Default Program TrackedEntityAttributes;
	
	// Program selected are handled/stored in ProgramManager

	me.getProgramTrackedEntityAttributes = function()
	{
		return me.TEAs;
	}

	me.setProgramTrackedEntityAttributes = function( attributes )
	{
		me.TEAs = attributes;
	}


	me.getFirstDisplayAttribute = function()
	{
		var firstAttribute;

		// For each person attributes, add the person table column
		$.each( me.TEAs, function( i_attribute, item_attribute )
		{					
			if ( item_attribute.displayInList )
			{
				firstAttribute = item_attribute;
				return false;
			}
		});

		// firstAttribute.id 				
		return firstAttribute;
	}

	me.getInDisplayListCount = function()
	{
		i_attributeCount = 0;

		// For each person attributes, add the person table column
		$.each( me.TEAs, function( i_attribute, item_attribute )
		{
			if ( item_attribute.displayInList )
			{
				i_attributeCount++;
			}
		});

		return i_attributeCount;
	}
}

