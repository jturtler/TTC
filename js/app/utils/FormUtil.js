// --------------------------------------------------------------------------------
// FormUtil
// --------------------------------------------------------------------------------

function FormUtil() {}

FormUtil.setTagAsWait_SetRows = function( tagRows )
{
	tagRows.each( function( i )
	{
		me.setTagAsWait( $( this ) );
	});
}

FormUtil.setTagAsWait = function( tag, classNameInput )
{
	var className = ( classNameInput !== undefined ) ? classNameInput : 'waitRow' ;
	tag.addClass( className );
	
	Util.disableTag( tag, true );
}

FormUtil.setTagAsWait_Clear = function( tag, classNameInput )
{
	var className = ( classNameInput !== undefined ) ? classNameInput : 'waitRow' ;
	tag.removeClass( className );
	
	Util.disableTag( tag, false );
}

FormUtil.setSelectTagOptions_YesNo = function( ctrlTag )
{
	ctrlTag.append('<option value="">[Please select]</option>');
	ctrlTag.append('<option selected="selected" value="true">Yes</option>');
	ctrlTag.append('<option value="false">No</option>');
}

FormUtil.getStr_Views = function()
{
	return "input[" + _view + "='" + _view_Yes + "'],select[" + _view + "='" + _view_Yes + "'],textarea[" + _view + "='" + _view_Yes + "']";
}

FormUtil.setTabBackgroundColor_Switch = function( ctrlTags )
{
	ctrlTags.focus( function()
	{
		$( this ).closest( 'td' ).css('background-color', '#F7F7F7');
	});

	ctrlTags.focusout( function()
	{
		$( this ).closest( 'td' ).css('background-color', 'white');
	});

}

FormUtil.getFormattedAttributeValue = function( attrType, attrValue )
{
	if ( attrType == "DATE" )
	{
		attrValue = Util.formatDateBack( attrValue.substring( 0, 10 ) );
	}
	else if ( attrType == "TIME" )
	{
		attrValue = Util.formatTimeBack( attrValue );
	}
	else if ( attrType == "DATETIME" )
	{
		attrValue =Util.formatDateTimeBack( attrValue );
	}
	else if ( attrType == "COORDINATE" )
	{
		attrValue = FormUtil.formatCoordinatorsValue( attrValue );
	}
	
	return attrValue;
}

FormUtil.abortAndClear_XhrRequest = function( xhrRequests )
{
	$.each( xhrRequests, function( i_xhr, item_xhr )
	{
		item_xhr.abort();
	});

	return [];
}

FormUtil.validateValueType = function( tag, inputType )
{
	var pass = true;

	// Clear
	Util.paintClear( tag );
	tag.attr( 'title', '' );
	tag.attr( 'notvalid', '' );

	if ( inputType == "NUMBER" )
	{
		var reg = new RegExp( '^[0-9]*$' );

		if ( !reg.test( tag.val() ) )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'This field is Number Only field.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}
	else if ( inputType == "INTEGER_NEGATIVE" )
	{
		var reg = new RegExp( '^(-)[0-9]*$' );

		if ( !reg.test( tag.val() ) )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'This field is Negative Integer Only field.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}
	else if ( inputType == "UNIT_INTERVAL" )
	{
		var reg = new RegExp( '^(0\\.)[0-9]*$' );

		if ( !reg.test( tag.val() ) )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'This field only accepts a decimal value between 0 and 1.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}
	else if ( inputType == "COORDINATE" )
	{
		if( tag.val() == "" )
		{
			pass = true;
		}
		else
		{
			var coordinators = tag.val().replace("[", "" ).replace("]", "" );
		
			var reg = new RegExp( '^[0-9]+\.*[0-9]*,\s?[0-9]+\.*[0-9]*$' );
			
			if ( !reg.test( coordinators ) )
			{
				pass = false;
			}
			else
			{
				var coordinators = tag.val().replace("[", "" ).replace("]", "" ).split(",");
			
				var reg = new RegExp( '^[0-9]*$' );
				if ( reg.test( coordinators[0] ) && reg.test( coordinators[1] ) )
				{
					var lng = eval( coordinators[0] );
					var lat = eval( coordinators[1] );
					pass = (lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90);
				}
				else
				{
					pass = false;
				}
			}
		}
		
		if( !pass )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'This field in valid coordinators.' );
			tag.attr( 'notvalid', 'Y' );
		}
	}
	else if ( inputType == "LETTER" )
	{
		var reg = new RegExp( '^[a-zA-Z]*$' );

		if ( !reg.test( tag.val() ) )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'This field is Letter Only field.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}
	else if ( inputType == "DATE" )
	{
		// Due to '/' not doing date check properly, change to '-'
		var dateStr = tag.val().replace( /\//ig, '-' );

		if ( !moment( dateStr ).isValid() )
		{
			Util.paintWarning( tag );
			tag.attr( 'title', 'The date is not valid date.' );
			tag.attr( 'notvalid', 'Y' );
			pass = false;
		}
	}

	return pass;
};


FormUtil.formatCoordinatorsValue = function( coordinates )
{
	coordinates = coordinates.replace("[", "").replace("]", "");
	coordinates = "[" + coordinates + "]";
	
	if( _settingForm.DHISVersion == "2.25" || _settingForm.DHISVersion == "2.26" )
	{
		return coordinates.replace("[", "").replace("]", "");
	}
	
	return coordinates;
};
