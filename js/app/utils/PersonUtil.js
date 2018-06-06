// --------------------------------------------------------------------------------
// PersonUtil
// --------------------------------------------------------------------------------

function PersonUtil() {}

PersonUtil.primaryAttributeVal = "PrimaryAttributeVal";

PersonUtil.getPersonByID = function( personId )
{
	return $.parseJSON( RESTUtil.getSynchData( _queryURL_PersonQuery + "/" + personId + ".json?fields=*" ) );			
}

PersonUtil.clearPersonByID_Reuse = function( personId )
{
	var queryUrl = _queryURL_PersonQuery + "/" + personId + ".json?fields=*";
	
	// remove any saved data from memory
	RESTUtil.retrieveManager.removeFromMemory( queryUrl );
};

PersonUtil.getPersonByID_Reuse = function( personId, successFunc, finalFunc )
{			
	var queryUrl = _queryURL_PersonQuery + "/" + personId + ".json?fields=*";

	RESTUtil.retrieveManager.retrieveData( queryUrl
	, successFunc
	, function()
	{
		console.log( "FAILED -- PersonUtil getPersonByID_Async(), personId: " + personId ); 
	}
	, function() {}
	, function() { if ( finalFunc !== undefined ) finalFunc(); } 
	);	
}
//RESTUtil.getAsynchData( _queryURL_PersonQuery + "/" + personId + ".json"
//PersonUtil.getPersonByID_Reuse = function( personId, actionSuccess, actionError, loadingStart, loadingEnd )


PersonUtil.addIDtypeToID = function( item_Person )
{
	if ( Util.checkDefined( item_Person ) )
	{
		// Set attributeID as ID
		if( Util.checkDefined( item_Person.attributes ) )
		{
			$.each( item_Person.attributes, function( i_attribute, item_attribute ) 
			{
				item_attribute.id = item_attribute.attribute;
			});
		}
	}
}


PersonUtil.setPersonWithFirstAttributeData = function( personObjList, firstAttributeId )
{
	$.each( personObjList, function( i_person, item_person )
	{
		var attritubeValue = "";

		if ( item_person.attributes === undefined )
		{
			item_person[ PersonUtil.primaryAttributeVal ] =  "";
		}
		else
		{
			// look for attribute value with id
			$.each( item_person.attributes, function( i_attribute, item_attribute )
			{
				if ( item_attribute.attribute == firstAttributeId )
				{
					attritubeValue = item_attribute.value;
					return false;
				}
			});

			item_person[ PersonUtil.primaryAttributeVal ] =  attritubeValue;

		}
	});
}


PersonUtil.setTagTypeValidation = function( inputTags, inputType )
{			
	inputTags.off( "change" ).on( "change", function ( event ) 
	{
		var tag = $( this );

		FormUtil.validateValueType( tag, inputType );
	});
}
