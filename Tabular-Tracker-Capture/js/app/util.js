
// -------------------------------------------
// -- Utility Class/Methods

function Util() {}


Util.disableTag = function( tags, isDisable )
{
	tags.prop( 'disabled', isDisable );

	tags.each( function() 
	{
		var tag = $( this );
		
		if( isDisable )
		{
			// TODO: Better to have class added and removed.
			tag.css( 'background-color', '#FAFAFA' ).css( 'cursor', 'auto' );

			if( tag.prop( "tagName" ) == 'BUTTON' && tag.find("span").length > 0  )
			{
				tag.find("span").css( 'color', 'gray' );
			}
			else
			{
				tag.css( 'color', 'gray' );
			}
		}
		else
		{
			tag.css( 'background-color', 'white' ).css( 'cursor', '' ).css( 'color', '' );

			if( tag.prop( "tagName" ) == 'BUTTON' && tag.find("span").length > 0  )
			{
				tag.find("span").css( 'color', '' );
			}
		}
	});
}

Util.sortByKey = function( array, key, noCase, emptyStringLast ) {

	if ( array.length == 0 || array[0][key] === undefined ) return array;
	else
	{
		return array.sort( function( a, b ) {
			
			var x = a[key]; 
			var y = b[key];

			if ( noCase !== undefined && noCase )
			{
				x = x.toLowerCase();
				y = y.toLowerCase();
			}

			if ( emptyStringLast !== undefined && emptyStringLast && ( x == "" || y == "" ) ) 
			{
				if ( x == "" && y == "" ) return 0;
				else if ( x == "" ) return 1;
				else if ( y == "" ) return -1;
			}
			else
			{
				return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
			}
		});
	}
};


Util.sortByKey_Reverse = function( array, key ) {
	return array.sort( function( b, a ) {
		var x = a[key]; var y = b[key];
		return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
	});
};


Util.trim = function( input )
{
	return input.replace( /^\s+|\s+$/gm, '' );
}

Util.stringSearch = function( inputString, searchWord )
{
	if( inputString.search( new RegExp( searchWord, 'i' ) ) >= 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
}


// -------
// Check Variable or List Related

Util.getNotEmpty = function( input ) {

	if ( Util.checkDefined( input ) )
	{
		return input
	}
	else return "";
}

Util.checkDefined = function( input ) {

	if( input !== undefined && input != null ) return true;
	else return false;
}

Util.checkValue = function( input ) {

	if ( Util.checkDefined( input ) && input.length > 0 ) return true;
	else return false;
}

Util.checkDataExists = function( input ) {

	return Util.checkValue( input );
}

Util.checkData_WithPropertyVal = function( arr, propertyName, value ) 
{
	var found = false;

	if ( Util.checkDataExists( arr ) )
	{
		for ( i = 0; i < arr.length; i++ )
		{
			var arrItem = arr[i];
			if ( Util.checkDefined( arrItem[ propertyName ] ) && arrItem[ propertyName ] == value )
			{
				found = true;
				break;
			}
		}
	}

	return found;
}

Util.getFromListByName = function( list, name )
{
	var item;

	for( i = 0; i < list.length; i++ )
	{
		if ( list[i].name == name )
		{
			item = list[i];
			break;
		}
	}

	return item;
}

Util.getFromList = function( list, value, propertyName )
{
	var item;

	// If propertyName being compare to has not been passed, set it as 'id'.
	if ( propertyName === undefined )
	{
		propertyName = "id";
	}

	for( i = 0; i < list.length; i++ )
	{
		var listItem = list[i];

		if ( listItem[propertyName] == value )
		{
			item = listItem;
			break;
		}
	}

	return item;
}


Util.findItemFromList = function( listData, searchProperty, searchValue )
{
	var foundData;

	$.each( listData, function( i, item )
	{
		if ( item[ searchProperty ] == searchValue )
		{
			foundData = item;
			return foundData;
		}
	});

	return foundData;
}


Util.getMatchesFromList = function( list, value, propertyName )
{
	var items = [];

	// If propertyName being compare to has not been passed, set it as 'id'.
	if ( propertyName === undefined )
	{
		propertyName = "id";
	}

	for( i = 0; i < list.length; i++ )
	{
		var listItem = list[i];

		if ( listItem[ propertyName ] == value )
		{
			items.push( listItem );
		}
	}

	return items;
}


Util.checkExistInList = function( list, id, idPropertyName )
{
	var item = Util.getFromList( list, id, idPropertyName );

	if ( item === undefined ) return false;
	else return true;
}

Util.copyProperties = function( source, dest )
{
	for ( var key in source )
	{
		dest[ key ] = source[ key ];
	}
}


Util.RemoveFromArray = function( list, propertyName, value )
{
	var index;

	$.each( list, function( i, item )
	{
		if ( item[ propertyName ] == value ) 
		{
			index = i;
			return false;
		}
	});

	if ( index !== undefined ) 
	{
		list.splice( index, 1 );
	}

	return index;
}

Util.RemoveAllFromArray = function( list, propertyName, value )
{
	var removedIndex;

	do {
		removedIndex = Util.RemoveFromArray( list, propertyName, value );
	}
	while ( removedIndex );
}

Util.getObjPropertyCount = function( list )
{
	var count = 0;

	for ( var prop in list )
	{
		count++;
	}

	return count;
}

Util.removeDuplicateItems = function( list, idProp )
{
	var idHold = {};

	for( i = 0; i < list.length; i++ )
	{
		var listItem = list[i];
		var idStr = listItem[ idProp ];

		if ( idHold[ idStr ] )
		{
			// if already existing id found, mark it to be removed.
			listItem.remove = "Y";
		}
		else
		{
			idHold[ idStr ] = "Y";
		}
	}

	Util.RemoveAllFromArray( list, "remove", "Y" );
}

// Check Variable or List Related
// -------

// -------
// Seletet Tag Populate, Etc Related

Util.populateSelect = function( selectObj, selectName, json_Data, displayPropertyName )
{					
	var displayProperty = ( displayPropertyName == undefined ) ? "name" : displayPropertyName;
	selectObj.empty();

	selectObj.append( '<option value="">Select ' + selectName + '</option>' );

	if ( json_Data !== undefined )
	{
		$.each( json_Data, function( i, item ) {

			selectObj.append( $( '<option></option>' ).attr( "value", item.id ).text( item[displayProperty] ) );
		});
	}
}

Util.populateSelect_WithDefaultName = function( selectObj, selectName, json_Data, defaultName )
{
	selectObj.empty();

	selectObj.append( $( '<option value="">Select ' + selectName + '</option>' ) );

	$.each( json_Data, function( i, item ) {

		if( item.name == defaultName )
		{
			selectObj.append( $( '<option selected></option>' ).attr( "value", item.id ).text( item[defaultName] ) );
		}
		else
		{
			selectObj.append( $( '<option></option>' ).attr( "value", item.id ).text( item.name ) );
		}
	});
}


Util.selectOption_WithOptionalInsert = function ( selectObj, id, list, displayPropertyName )
{
	if ( selectObj.find( "option" ).length > 0 )
	{
		selectObj.val( id );				
	}

	var displayName = ( displayPropertyName == undefined ) ? "name" : displayPropertyName;
	// If not found, add the item.
	if ( selectObj.val() != id )
	{
		if ( list !== undefined && list != null )
		{
			// If list is provided, get item (name & id pair) from the list
			var item = Util.getFromList( list, id );

			if ( item !== undefined )
			{
				selectObj.append( $( '<option></option>' ).attr( "value", item.id ).text( item[displayName] ) );
			}
		}
		else
		{
			// If list is not provided, simply add this id - as value & name
			selectObj.append( $( '<option></option>' ).attr( "value", id ).text( id ) );
		}

		selectObj.val( id );
	}
}


Util.setSelectDefaultByName = function( ctrlTag, name )
{
	ctrlTag.find( "option:contains('" + name + "')" ).attr( 'selected', true );
}

Util.getSelectedOptionName = function( ctrlTag )
{
	return ctrlTag.options[ ctrlTag.selectedIndex ].text;
}

// Seletet Tag Populate, Etc Related
// -------


// -------
// Write Message, Paint, Toggle Related

Util.write = function( data )
{
	$( "#testData" ).append( " [" + data + "] <br><br>" );
}


Util.paintControl = function( ctrlTarget, color ) 
{
	ctrlTarget.css( "background-color", color );
}


Util.paintWarning = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "LightCoral" );
}

Util.paintAttention = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "#CDEBFF" );
}


Util.paintLightGreen = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "#EEFEEE" );
}
	

Util.paintClear = function( ctrlTarget ) 
{
	Util.paintControl( ctrlTarget, "White" );
}
		

Util.paintResult = function( ctrlTarget, result ) 
{
	if( result )
	{
		Util.paintControl( ctrlTarget, "#BBEEBB" );
	}
	else 
	{
		Util.paintControl( ctrlTarget, "#FFFFFF" );
	}
}


Util.toggleTarget = function( toggleAnchor, target, expand )
{
	// If 'expand' it is defined, display accordingly.
	// If not, toggle based on current display setting.
	if ( expand !== undefined )
	{
		if ( expand )
		{
			target.show( "fast" );					
			toggleAnchor.text( '[-]' );
		}
		else
		{
			target.hide( "fast" );
			toggleAnchor.text( '[+]' );
		}
	}
	else
	{
		if( toggleAnchor.text() == '[+]' )
		{
			target.show( "fast" );					
			toggleAnchor.text( '[-]' );
		}
		else if( toggleAnchor.text() == '[-]' )
		{
			target.hide( "fast" );
			toggleAnchor.text( '[+]' );
		}
	}
}

Util.setRowRemoval = function( trCurrent, runFunc )
{
	trCurrent.slideUp( 200, function() {

		trCurrent.remove();

		if ( runFunc !== undefined )
		{
			runFunc();
		}
	
	});
}

// Write Message, Paint, Toggle Related
// -------

Util.checkInteger = function( input )
{
	var intRegex = /^\d+$/;
	return intRegex.test( input );
}

Util.checkCalendarDateStrFormat = function( inputStr )
{
	if( inputStr.length == 10
		&& inputStr.substring(4, 5) == '/'
		&& inputStr.substring(7, 8) == '/'
		&& Util.checkInteger( inputStr.substring(0, 4) )
		&& Util.checkInteger( inputStr.substring(5, 7) )
		&& Util.checkInteger( inputStr.substring(8, 10) )
		)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Util.convertDateObjectToStr = function( dateObj )
{
	var year = dateObj.getFullYear();
	var month = dateObj.getMonth() + 1;
	month = ( month < 10 ) ? "0" + month : "" + month;
	
	var dayInMonth = dateObj.getDate();
	dayInMonth = ( dayInMonth < 10 ) ? "0" + dayInMonth : dayInMonth;
	
	return year + "-" + month + "-" + dayInMonth;
}

// -------
// Date Formatting Related

Util.addZero = function( i )
{
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


/*
* Input : 2015/01/02
* Output : 2015-01-02
*/
Util.formatDate = function( strDate )
{
	var returnVal = "";

	if( strDate.length >= 10 )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8,10);

		returnVal = year + "-" + month + "-" + date;
	}

	return returnVal;
}

/*
* Input : 2015/01/02 11:24
* Output : 2015-01-02T11:24:00
*/
Util.formatDateTime = function( strDate )
{
	var returnVal = strDate;

	returnVal = returnVal.split("/").join("-");
	returnVal = returnVal.replace(" ", "T");
	// returnVal += ":00";

	return returnVal;
}

/*
* Input : 11:24
* Output : 11:24:00
*/
Util.formatTime = function( strDate )
{
	// return strDate + ":00";
	return strDate;
}

/*
* Input : 2015-01-02
* Output : 2015/01/02
*/
Util.formatDateBack = function( strDate )
{
	if ( Util.checkValue( strDate ) )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8, 10);

		return year + "/" + month + "/" + date;
	}
	else
	{
		return "";
	}
}


/*
* Input : 2015-01-02T11:24:00
* Output : 2015/01/02 11:24
*/
Util.formatDateTimeBack = function( strDate )
{
	if ( Util.checkValue( strDate ) )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8, 10);
		var hour = strDate.substring( 11,13 );
		var minute = strDate.substring( 14,16 );

		return year + "/" + month + "/" + date + " " + hour + ":" + minute;
	}
	else
	{
		return "";
	}
}

/*
* Input : 11:24:00
* Output : 11:24
*/
Util.formatTimeBack = function( strDate )
{
	if ( Util.checkValue( strDate ) )
	{
		var hour = strDate.substring( 0,2 );
		var minute = strDate.substring( 3,5 )

		return hour + ":" + minute;
	}
	else
	{
		return "";
	}
}

// Convert DATE string to DATE Object
Util.getDate_FromYYYYMMDD = function( strDate )
{
	var date;

	if ( Util.checkValue( strDate ) )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8, 10);

		date = new Date( year, month - 1, date );
	}

	return date;
}


Util.getDateStr_FromYYYYMMDD = function( strDate )
{
	var dateStr;

	if ( Util.checkValue( strDate ) )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8, 10);

		dateStr = year + "-" + month + "-" + date;
	}

	return dateStr;
}

/**
* Convert DATE string ( 2017-12-10 ) to string ( 10/12/2017 )
**/
Util.getDateStr_DDMMYYYY = function( strDate )
{
	var dateStr;

	if ( Util.checkValue( strDate ) )
	{
		var year = strDate.substring(0, 4);
		var month = strDate.substring(5, 7);
		var date = strDate.substring(8, 10);

		dateStr = date + "/" + month + "/" + year;
	}

	return dateStr;
}


Util.getDateStrYYYYMMDD_FromDate = function( date )
{
	return $.format.date( date, _dateFormat_YYYYMMDD);
}


Util.formatDate_LongDesc = function( date )
{
	return $.format.date( date, _dateFormat_DDMMMYYYY );
}

// Date Formatting Related
// -------

Util.setupDatePicker = function( ctrl, onSelectFunc, dateFormat, type )
{
	if ( !Util.checkValue( dateFormat ) )
	{
		dateFormat = _dateFormat_Picker_YYMMDD;
	}

	if ( !Util.checkDefined( onSelectFunc ) )
	{
		onSelectFunc = function() {}
		//{ $( this ).focus(); }
	}

	var maxDate = null;
	var minDate = null;
	var yearRangeStr = "";
	var yearRangeStr = "";
	var currentYear = (new Date()).getFullYear();
	var defaultStartYear = '1900';


	if ( type === "birthdate" )
	{
		yearRangeStr = defaultStartYear + ':' + currentYear;
		maxDate = 0;
	}
	else if ( type === "upToToday" )
	{
		yearRangeStr = '' + (currentYear - 15) + ':' + currentYear;
		maxDate = 0;
	}
	else if ( type === "futureOnly" )
	{
		minDate = 0;
	}
	else if ( type === "todayOnly" )
	{
		minDate = 0;
		maxDate = 0;
	}
	else
	{
		yearRangeStr = '' + (currentYear - 15) + ':' + (currentYear + 2);
	}

	// set Datepickers
	ctrl.datepicker( 
	{
		onSelect: onSelectFunc
		/*,beforeShow: function()
		{
			setTimeout( function() 
			{ 
				$( 'select.ui-datepicker-month' ).first().focus(); 

			}, 200 );
		}*/
		,dateFormat: dateFormat 
		,changeMonth: true
		,changeYear: true
		,yearRange: yearRangeStr
		,maxDate: maxDate
		,minDate: minDate
	});
}


Util.setupDateRangePicker = function( ctrl, onSelectFunc, dateFormat, minDate, maxDate )
{
	if ( !Util.checkValue( dateFormat ) )
	{
		dateFormat = _dateFormat_Picker_YYMMDD;
	}

	if ( !Util.checkDefined( onSelectFunc ) )
	{
		onSelectFunc = function() {}
		//{ $( this ).focus(); }
	}
	
	var currentYear = (new Date()).getFullYear();
	var yearRangeStr = '' + (currentYear - 15) + ':' + (currentYear + 2);

	// set Datepickers
	ctrl.datepicker( 
	{
		onSelect: onSelectFunc
		,dateFormat: dateFormat 
		,changeMonth: true
		,changeYear: true
		,yearRange: yearRangeStr
		,maxDate: maxDate
		,minDate: minDate
	});
	
	if( ctrl.val() != "" )
	{
		onSelectFunc();
	}
}

Util.setTimePicker = function( inputTimeTag, dateFormat )
{
	inputTimeTag.datetimepicker({
		showClear : true,
		format: 'HH:mm'
	});
}


Util.setDateTimePicker = function( inputTimeTag )
{
	var dateTimeFormat = "YYYY/MM/DD HH:mm";
	inputTimeTag.datetimepicker({
		showClear : true,
		format: dateTimeFormat,
		sideBySide : false
	});
}


Util.setDatePickerInRange = function( startdate, enddate, dateFormat, setCurrentStartDate, setCurrentEndDate )
{
	if ( !Util.checkValue( dateFormat ) )
	{
		dateFormat = _dateFormat_Picker_YYMMDD;
	}
	
	if( setCurrentStartDate == undefined ) setCurrentStartDate = true;
	if( setCurrentEndDate == undefined ) setCurrentEndDate = true;
	
	s = jQuery("#" + startdate );
	e = jQuery("#" + enddate );
	if( setCurrentStartDate && s.val()=='') s.val( Util.getCurrentDate(dateFormat) );
	if( setCurrentEndDate && e.val()=='' ) e.val( Util.getCurrentDate(dateFormat) );

	var dates = $('#'+startdate+', #' + enddate).datepicker(
	{
		dateFormat: dateFormat,
		defaultDate: "+1w",
		changeMonth: true,
		changeYear: true,
		numberOfMonths: 1,
		maxDate: '+0d +0w',
		//monthNamesShort: monthNames,
		//dayNamesMin: dayNamesMin,
		showAnim: '',
		createButton: false,
		constrainInput: true,
        yearRange: '-100:+100',
		onSelect: function(selectedDate)
		{
			var option = this.id == startdate ? "minDate" : "maxDate";
			var instance = $(this).data("datepicker");
			var date = $.datepicker.parseDate(instance.settings.dateFormat, selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
		}
	});

	jQuery( "#" + startdate ).attr("readonly", true );
	jQuery( "#" + enddate ).attr("readonly", true );
}

Util.datePicker_SetMaxDate = function( dateTag, maxDate )
{
	// dateTag.data("DateTimePicker").maxDate( maxDate );
	dateTag.datepicker('option', 'maxDate', maxDate );
};


Util.pageHScroll = function( option )
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


Util.getCurrentDate = function( dateFormat )
{	
	if ( !Util.checkValue( dateFormat ) )
	{
		dateFormat = _dateFormat_Picker_YYMMDD;
	}
	
	return jQuery.datepicker.formatDate( dateFormat , new Date() ) ;
}

// ---------------------------------------
// Prototypes.  Extensions.

$.fn.outerHTML = function(){

    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
    return (!this.length) ? this : (this[0].outerHTML || (
      function(el){
          var div = document.createElement('div');
          div.appendChild(el.cloneNode(true));
          var contents = div.innerHTML;
          div = null;
          return contents;
    })(this[0]));
}
