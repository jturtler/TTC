

// --------------------------------------------------------------------------------
// App Util
// --------------------------------------------------------------------------------

function AppUtil() {}

AppUtil.CheckCachedFileSynch = function()
{
	var outOfSynch = false;
	var msg = "";

	if ( RESTUtil.retrieveManager === undefined )
	{
		outOfSynch = true;
		msg += "RESTUtil.retrieveManager not found";
	}

	if ( outOfSynch )
	{
		alert( $( 'span.msg_CacheClear' ).text() );
	}
}


AppUtil.copyAncestorsToParents = function( ouList )
{
	if ( ouList.length > 0 
		&& ouList[0].parents === undefined 
		&& ouList[0].ancestors !== undefined 
		)
	{
		$.each( ouList, function( i_ou, item_ou )
		{
			item_ou.parents = item_ou.ancestors;
		});
	}
}

AppUtil.pageHScroll = function( option )
{
	if ( option === "Right" )
	{
		// Scroll to right end
		var left = $(document).outerWidth() - $(window).width();
		$('body, html').scrollLeft( left );
	}
	else
	{
		$('body, html').scrollLeft( 0 );
	}
}

