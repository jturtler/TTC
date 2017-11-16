
function Monthly() {}

Monthly.populateMonthYear = function( monthTag, yearTag )
{
	// Empty the list
	monthTag.empty();
	yearTag.empty();

	// Populate the month and year list
	monthTag.append( $( '<option></option>' ).attr( "value", 1 ).text( l10n.get("January") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 2 ).text( l10n.get("February") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 3 ).text( l10n.get("March") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 4 ).text( l10n.get("April") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 5 ).text( l10n.get("May") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 6 ).text( l10n.get("June") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 7 ).text( l10n.get("July") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 8 ).text( l10n.get("August") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 9 ).text( l10n.get("September") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 10 ).text( l10n.get("October") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 11 ).text( l10n.get("November") ) );
	monthTag.append( $( '<option></option>' ).attr( "value", 12 ).text( l10n.get("December") ) );
	
	for( i = 1990; i < 2020; i++ )
	{
		yearTag.append( $( '<option></option>' ).attr( "value", i ).text( i ) );
	}			
}

Monthly.setDate = function( monthTag, yearTag, date )
{
	// Set last month
	var newDate = new Date( date.getFullYear(), date.getMonth(), 1 );

	newDate.setMonth( newDate.getMonth(), 0 );

	monthTag.val( newDate.getMonth() + 1 );
	yearTag.val( newDate.getFullYear() );
}

Monthly.getStartDate = function( monthTag, yearTag )
{
	return new Date( yearTag.val(), monthTag.val() - 1, 1 );
}

Monthly.getEndDate = function( monthTag, yearTag )
{
	var date = new Date( yearTag.val(), monthTag.val(), 1 );

	// Set it to the last day of the last month.
	date.setDate( 0 );

	return date;
}
