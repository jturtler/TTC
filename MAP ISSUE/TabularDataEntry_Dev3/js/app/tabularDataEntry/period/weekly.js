
function Weekly() {}

Weekly.selectCurrentWeek = function() {
	window.setTimeout(function () {
		$('.ui-datepicker-calendar').filter( ':visible' ).find('.ui-datepicker-current-day a').addClass('ui-state-active');
	}, 1);
}

Weekly.setWeekPicker = function( inputTag, onSelectFunc )
{
	inputTag.datepicker( {
		changeMonth: true
		,changeYear: true
		,showOtherMonths: true
		,selectOtherMonths: true
		,showWeek: true
		,onSelect: function(dateText, inst) { 

			var date = $(this).datepicker('getDate');

			$(this).val( Weekly.getThisWeekStr( date ) );

			// Remove the event handler
			$( document ).off( 'mousemove', '.ui-datepicker-calendar:visible tr');
			$( document ).off( 'mouseleave', '.ui-datepicker-calendar:visible tr');

			if ( onSelectFunc !== undefined ) onSelectFunc();

		},
		beforeShowDay: function(date) {

			$( document ).on( 'mousemove', '.ui-datepicker-calendar:visible tr', function() { $(this).find('td a').addClass('ui-state-hover'); });

			$( document ).on( 'mouseleave', '.ui-datepicker-calendar:visible tr', function() { $(this).find('td a').removeClass('ui-state-hover'); });

			var cssClass = '';
			if( date >= _weekStartDate && date <= _weekEndDate )
				cssClass = 'ui-datepicker-current-day';
			return [true, cssClass];
		}
		,onChangeMonthYear: function( year, month, inst ) {
			Weekly.selectCurrentWeek();
		}
	});
}

Weekly.getThisWeekStr = function( date ) 
{
	_weekStartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	_weekEndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	return $.format.date( _weekStartDate, _dateFormat_YYYYMMDD ) + ' - ' + $.format.date( _weekEndDate, _dateFormat_YYYYMMDD );
}


Weekly.getLastWeekStr = function( date ) 
{
	_weekStartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
	_weekEndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

	_weekStartDate.setDate( _weekStartDate.getDate() - 7 );
	_weekEndDate.setDate( _weekEndDate.getDate() - 7 );

	return $.format.date( _weekStartDate, _dateFormat_YYYYMMDD ) + ' - ' + $.format.date( _weekEndDate, _dateFormat_YYYYMMDD );
}


Weekly.getStartDate = function( weekStr ) 
{
	var date;

	weekStr = Util.trim( weekStr );

	if ( weekStr.length == 23 )
	{
		var startDateStr = weekStr.substring(0, 10);

		date = Util.getDate_FromYYYYMMDD( startDateStr );
	}

	return date;
}

Weekly.getEndDate = function( weekStr ) 
{
	var date;

	weekStr = Util.trim( weekStr );

	if ( weekStr.length == 23 )
	{
		var endDateStr = weekStr.substring(13, 23);

		date = Util.getDate_FromYYYYMMDD( endDateStr );
	}

	return date;
}

