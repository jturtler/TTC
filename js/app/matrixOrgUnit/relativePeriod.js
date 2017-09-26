
function RelativePeriod()
{
	var me = this;
	
	me.matrixPeriodTag = $("#matrixPeriod");
	
	me.monthlyNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    me.quarterlyStartMonth = ["01", "04", "07", "10"];
	
	me.PERIOD_TYPE_LAST_12_MONTHS = "last12Months_MONTH";
	me.PERIOD_TYPE_THIS_YEAR_MONTH = "thisYearMonths_MONTH";
	me.PERIOD_TYPE_LAST_12_WEEKS = "last12Weeks_WEEK";
	me.PERIOD_TYPE_LAST_12_QUARTERS = "last12Quarters_QUARTER";
	
	me.SIGN_OPEN_FORM = "o";
	me.SIGN_FULL_LOCK_FORM = "x";
	me.SIGN_PART_LOCK_FORM = "p";
	
	me.SIGN_OPEN_FORM_TAG = "<img src='img/check-mark-md.png' style='width:12px;height:12px;'>";
	me.SIGN_FULL_LOCK_FORM_TAG = "<img src='img/lockedForm.png' style='width:10px;height:10px;'>";
	me.SIGN_PART_LOCK_FORM_TAG = "<span style='color:green;'>p</span>";
	
	
	me.noMonth = 12;
	me.curDate;
	
	// -------------------------------------------------------------------------------------------------------
	// Init method
	
	me.initialSetup = function()
	{
		me.curDate = new Date();
	};
	
	
	// -------------------------------------------------------------------------------------------------------
	// Generate period list
	
	me.resetDate = function()
	{
		me.curDate = new Date();
	};
	
	me.generatePeriodList = function()
	{
		var type = me.matrixPeriodTag.val();
		
		var periodList = [];
		if( type == me.PERIOD_TYPE_LAST_12_MONTHS )
		{
			periodList = me.generatePeriodList_Last12Month( me.curDate );
		}
		else if( type == me.PERIOD_TYPE_THIS_YEAR_MONTH )
		{
			periodList = me.generatePeriodList_ThisYear( me.curDate );
		}
		else if( type == me.PERIOD_TYPE_LAST_12_WEEKS )
		{
			periodList = me.generatePeriodList_Last12Week( me.curDate );
		}
		else if( type == me.PERIOD_TYPE_LAST_12_QUARTERS )
		{
			periodList = me.generatePeriodList_Last12Quarter( me.curDate );
		}
		
		return periodList.reverse();
	};
	
	
	me.generatePeriodList_Last12Month = function( date )
	{
		var periodList = [];
        var year = date.getFullYear();
        var curMonth = eval( date.getMonth() + 1 ); // Get current month of "date" object

		var idx = 0;
        while( idx < me.noMonth )
        {
            while( curMonth>0 && idx < me.noMonth ) {
                var month = ( curMonth >= 10 ) ? curMonth + "" : "0" + curMonth;
                var code = year + "" + month;
                var name = me.monthlyNames[curMonth - 1] + " " + year;
                var period = {"code": code, "name": name};

                periodList.push(period);

                curMonth --;
				idx++;
            }

            if (curMonth == 0) {
                curMonth = 13;
                year--;
            }
            curMonth--;
        }
		
        return periodList;
	};
	
	me.generatePeriodList_ThisYear = function( date )
	{
		var year = date.getFullYear();
		var periodList = [];
		
		for( var i = 1; i <= me.noMonth; i++ )
		{
			var month = ( i >= 10 ) ? i + "" : "0" + i;
			
			var code = year + "" + month;
			var name = me.monthlyNames[month - 1] + " " + year;
			var period = {"code": code, "name": name};
				
			periodList.push( period );
		}
		
		return periodList.reverse();
	};
	
	me.generatePeriodList_Last12Week = function( date )
	{
		var periodList = [];
			
		var curr = new Date( date );
		curr.setDate( curr.getDate() + 7 );
		for( var i=0; i < me.noMonth; i++ )
		{
			curr.setDate( curr.getDate() - 7 );
			var weekIdx = me.getWeekNumber( curr );
		
			periodList.push( 
				{
					"code": curr.getFullYear() + "W" + weekIdx
					,"name": "Week " + weekIdx + " " + curr.getFullYear()
				});
		}
		
		return periodList;
	};
	
    me.generatePeriodList_Last12Quarter = function( date )
    {
        var periodList = [];
		
		var curDate = new Date( date );
		
		var idx = 0;
		
        // For current month periods list
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var quarterlyNo = me.getQuarterlyIdx( date );

        // Current year
        for( var i=quarterlyNo; i>0; i-- )
        {
            var code = year + "Q" + i;
            var name = "Q" + i + " " + year;
            var period = {"code": code, "name": name };
            periodList.push( period );
			idx++;
        }

        // For quarterly periods from START_YEAR_PARAM to last year

		var yearIdx = year - 1;
		var quarterlyIdx = 4;
        while( idx < me.noMonth )
        {
			periodList.push( 
				{
					"code":  yearIdx + "Q" + quarterlyIdx
					,"name": "Q" + quarterlyIdx + " " + yearIdx
				});
			
			quarterlyIdx--;
			if( quarterlyIdx == 0 )
			{
				yearIdx--;
				quarterlyIdx = 4
			}
			
			idx++;			
        }

        return periodList;
    };
	
	
	// -------------------------------------------------------------------------------------------------------
	// Set the previous/next of current period
	
	me.setPrevCurDateByIdx = function()
	{
		me.setCurDateByIdx( false );
	};
	
	me.setNextCurDateByIdx = function()
	{
		me.setCurDateByIdx( true );
	};
	
	me.setCurDateByIdx = function( isNextPeriod )
	{
		var factory = ( isNextPeriod ) ? -1 : 1;
		var type = me.matrixPeriodTag.val();
		
		if( type == me.PERIOD_TYPE_LAST_12_MONTHS )
		{
			var noMonth = me.curDate.getMonth() - factory * me.noMonth;
			me.curDate.setMonth( noMonth );
		}
		else if( type == me.PERIOD_TYPE_THIS_YEAR_MONTH )
		{
			var years = me.curDate.getFullYear() - 1 * factory;
			me.curDate.setFullYear( years );
		}
		else if( type == me.PERIOD_TYPE_LAST_12_WEEKS )
		{
			var noDate = me.curDate.getDate() - factory * me.noMonth * 7;
			me.curDate.setDate( noDate );
		}
		else if( type == me.PERIOD_TYPE_LAST_12_QUARTERS )
		{
			var noMonth = me.curDate.getMonth() - factory * me.noMonth * 3;
			me.curDate.setMonth( noMonth );
		}
	};
	
	
	// -------------------------------------------------------------------------------------------------------
	// Lock the form
	
	me.lockDataFormByPeriod = function( periodCode, expiredPeriodType, expiredDays )
	{
		var periodDateRange = me.getDateRangeOfPeriod( periodCode );
		var expiredRangeDate = me.calExpiredDateRange( periodDateRange.startDate, expiredPeriodType, eval( expiredDays ) );		
			
		var startDateStr = me.formatDateObj_YYYYMMDD( periodDateRange.startDate );
		var endDateStr = me.formatDateObj_YYYYMMDD( periodDateRange.endDate );
		var todayStr = me.formatDateObj_YYYYMMDD( new Date() );
		
		
		if( expiredRangeDate.expiredDate == undefined )
		{
			if( todayStr > endDateStr || ( todayStr >= startDateStr && todayStr <= endDateStr ) )
			{
				return me.SIGN_OPEN_FORM;
			}
			else
			{
				return me.SIGN_FULL_LOCK_FORM;
			}
		}
		else
		{
			var periodDateRange = me.getDateRangeOfPeriod( periodCode );		
			
			var startDateStr = me.formatDateObj_YYYYMMDD( periodDateRange.startDate );
			var endDateStr = me.formatDateObj_YYYYMMDD( periodDateRange.endDate );
			var validMinDateStr = me.formatDateObj_YYYYMMDD( expiredRangeDate.validMinDate );
			var expiredDateStr = me.formatDateObj_YYYYMMDD( expiredRangeDate.expiredDate );
			var todayStr = me.formatDateObj_YYYYMMDD( new Date() );
			
			
			if( todayStr <= expiredDateStr && startDateStr <= todayStr )
			{
				return me.SIGN_OPEN_FORM;
			}
			else
			{
				return me.SIGN_FULL_LOCK_FORM;
			}
		}
	};
	
	me.convertLockSignFormToTag = function( lockSign )
	{
		if( lockSign == me.SIGN_OPEN_FORM )
		{
			return me.SIGN_OPEN_FORM_TAG;
		}
		else if( lockSign == me.SIGN_FULL_LOCK_FORM )
		{
			return me.SIGN_FULL_LOCK_FORM_TAG;
		}
		else if( lockSign == me.SIGN_PART_LOCK_FORM )
		{
			return me.SIGN_PART_LOCK_FORM_TAG;
		}
	};
	
	
	me.lockDataFormByEventDate = function( eventDateStr, expiredPeriodType, expiredDays )
	{
		if( expiredPeriodType !== "undefined" && expiredPeriodType !== "" )
		{
			var eventDate = Util.getDate_FromYYYYMMDD( eventDateStr );
			
			var expiredDateRange = me.calExpiredDateRange( eventDate, expiredPeriodType, eval( expiredDays ) );
			var validMinDateStr = me.formatDateObj_YYYYMMDD( expiredDateRange.validMinDate );
			var expiredDateStr = me.formatDateObj_YYYYMMDD( expiredDateRange.expiredDate );
			
			
			if( validMinDateStr >= eventDateStr && eventDateStr <= expiredDateStr )
			{
				return me.SIGN_OPEN_FORM;
			}
			else
			{
				return me.SIGN_FULL_LOCK_FORM;
			}
		}
		
		return me.SIGN_OPEN_FORM;
	};
		
	me.calExpiredDateRange = function( startPeriodDate, expiredPeriodType, expiredDays )
	{
		var expiredDate = me.calExpiredDate( startPeriodDate, expiredPeriodType, expiredDays );
		var startDate = me.calStartDateByEventDateAndPeriodType( startPeriodDate, expiredDate, expiredPeriodType, expiredDays ); 
		
		return {
				"expiredDate" : expiredDate
				,"validMinDate" : startDate
			}
	};
	
	
	me.calExpiredDate = function( startPeriodDate, expiredPeriodType, expiredDays )
	{
		var expiredDate = new Date( startPeriodDate );
		
		if( expiredPeriodType !== "undefined" && expiredPeriodType != "" )
		{
			if( expiredPeriodType == "Monthly" )
			{
				expiredDate.setMonth( expiredDate.getMonth() + 1 );
				expiredDate.setDate( 1 );
			}
			else if( expiredPeriodType == "Weekly" )
			{
				var firstDays = expiredDate.getDate() - expiredDate.getDay() + 1; // First day is the day of the month - the day of the week
				expiredDate.setDate( firstDays + 7 );
			}
			else if( expiredPeriodType == "Quarterly" )
			{
				var quarter = Math.floor((expiredDate.getMonth() + 3) / 3);
				
				if (quarter == 4) {
					expiredDate = new Date (expiredDate.getFullYear() + 1, 1, 1);
				} else {
					expiredDate = new Date (expiredDate.getFullYear(), quarter * 3, 1);
				}
				expiredDate.setDate( 1 );
			}
			else if( expiredPeriodType == "Yearly" )
			{
				expiredDate.setFullYear( expiredDate.getFullYear() + 1 );
				expiredDate.setMonth( 0 );
				expiredDate.setDate( 1 );
			}
			else if( expiredPeriodType == "BiMonthly" )
			{
				var month = expiredDate.getMonth() + 1;
				month = ( month % 2 == 0 ) ? 1 : 2;
				expiredDate.setMonth( expiredDate.getMonth() + month );
				expiredDate.setDate( 1 );
			}
			else if( expiredPeriodType == "SixMonthly" )
			{
				var month = expiredDate.getMonth() + 1;
				if( month >= 7 )
				{
					expiredDate.setFullYear( expiredDate.getFullYear() + 1 );
					expiredDate.setMonth( 0 );
				}
				else
				{
					expiredDate.setMonth( 6 );
				}
				expiredDate.setDate( 1 );
			}
			// April-September 2004
			else if( expiredPeriodType == "SixMonthlyApril" )
			{
				var month = expiredDate.getMonth() + 1;
				// Next period : April, This year
				if( month < 4 )
				{
					expiredDate.setMonth( 3 );
				}
				// Next period : Oct, This year
				else if( month >= 4 && month <= 9)
				{
					expiredDate.setMonth( 9 ); 
				}
				// Next period : April, Next year
				else if( month > 9 )
				{
					expiredDate.setFullYear( expiredDate.getFullYear() + 1 );
					expiredDate.setMonth( 3 );
				}
				
				expiredDate.setDate( 1 );
			}
			// Apr 2004-Mar 2005
			else if( expiredPeriodType == "FinancialApril" )
			{
				var month = expiredDate.getMonth();
				if( month >= 3 )
				{
					expiredDate.setFullYear( expiredDate.getFullYear() + 1 ); // Next year
				}
				
				expiredDate.setMonth( 3 );// April
				expiredDate.setDate( 1 );
			}
			// July 2004-June 2005
			else if( expiredPeriodType == "FinancialJuly" )
			{
				var month = expiredDate.getMonth();
				if( month >= 6 )
				{
					expiredDate.setFullYear( expiredDate.getFullYear() + 1 ); // Next year
				}
				
				expiredDate.setMonth( 6 );// July
				expiredDate.setDate( 1 );
			}
			// Oct 2004-Sep 2005
			else if( expiredPeriodType == "FinancialOct" )
			{
				var month = expiredDate.getMonth();
				if( month >= 9 )
				{
					expiredDate.setFullYear( expiredDate.getFullYear() + 1 ); // Next year
				}
				
				expiredDate.setMonth( 9 );// Oct
				expiredDate.setDate( 1 );
			}
			
			// Get one date before expired date
			expiredDate.setDate( expiredDate.getDate() + eval(expiredDays) - 1 );
			
		}
		
		return expiredDate;
		
	};
	
	me.calStartDateByEventDateAndPeriodType = function( startPeriodDate, expiredDate, expiredPeriodType, expiredDays )
	{
		var startDate;
		
		if( startPeriodDate != undefined && expiredPeriodType != undefined && expiredPeriodType != "" )
		{
			var startDate = new Date( startPeriodDate );
			startDate.setDate( startDate.getDate() - eval(expiredDays) );
			
			if( expiredPeriodType == "Daily" )
			{
				
			}
			else if( expiredPeriodType == "Monthly" )
			{
				// Get Previous Period
				startDate.setDate( 1 );
			}
			else if( expiredPeriodType == "Weekly" )
			{
				// var startDate = new Date( expiredDate ); 
				if( startDate.getDay() == 0 )
				{
					startDate.setDate( startDate.getDate() - 2 );
				}
				var firstDays = startDate.getDate() - startDate.getDay() + 1;
				startDate.setDate( firstDays );
			}
			else if( expiredPeriodType == "Quarterly" )
			{
				var quarter = Math.floor(( startDate.getMonth() ) / 3 );
				startDate = new Date( startDate.getFullYear(), quarter * 3, 1 );
				startDate.setDate( 1 );
			}
			else if( expiredPeriodType == "Yearly" )
			{
				startDate.setMonth( 0 );
				startDate.setDate( 1 );
			}
			else if( expiredPeriodType == "BiMonthly" )
			{
				// startDate.setMonth( startDate.getMonth() - 2 );
				
				var month = startDate.getMonth();
				month = ( month % 2 == 0 ) ? 0 : 1;
				startDate.setMonth( startDate.getMonth() -  month );
				startDate.setDate( 1 );
			}
			else if( expiredPeriodType == "SixMonthly" )
			{
				var month = startDate.getMonth() + 1;
				if( month >= 7 )
				{
					startDate.setMonth( 6 );
				}
				else
				{
					startDate.setMonth( 0 );
				}
				startDate.setDate( 1 );
			}
			// April-September 2017
			else if( expiredPeriodType == "SixMonthlyApril" )
			{
				var month = startDate.getMonth() + 1;
				// Oct, Last year
				if( month < 4 )
				{
					startDate.setMonth( 9 );
					startDate.setFullYear( startDate.getFullYear() - 1 );
				}
				// April, This year
				else if( month >= 4 && month <= 9)
				{
					startDate.setMonth( 3 );
				}
				// Oct, This year
				else if( month > 9 )
				{
					startDate.setMonth( 9 );
				}
				
				startDate.setDate( 1 );
			}
			// Apr 2004-Mar 2005
			else if( expiredPeriodType == "FinancialApril" )
			{			
				var month = startDate.getMonth();
				if( month < 3 )
				{
					startDate.setFullYear( startDate.getFullYear() - 1 ); // Next year
				}
				
				startDate.setMonth( 3 );// April
				startDate.setDate( 1 );
			}
			// July 2004-June 2005
			else if( expiredPeriodType == "FinancialJuly" )
			{				
				var month = startDate.getMonth();
				if( month < 6 )
				{
					startDate.setFullYear( startDate.getFullYear() - 1 ); // Next year
				}
				
				startDate.setMonth( 6 );// July
				startDate.setDate( 1 );
			}
			// Oct 2004-Sep 2005
			else if( expiredPeriodType == "FinancialOct" )
			{
				var month = startDate.getMonth() + 1;
				if( month < 10 )
				{
					startDate.setFullYear( startDate.getFullYear() - 1 ); // Next year
				}
				
				startDate.setMonth( 9 );// Oct
				startDate.setDate( 1 );
			}
		}
		
		return startDate;
		
	};
	
	
	
	// -------------------------------------------------------------------------------------------------------
	// Generate startDate and endDate by period code
	
	me.getDateRangeOfPeriod = function( periodCode )
	{
		var startDate;
		var endDate;
		
		var type = me.matrixPeriodTag.val();
		var year = periodCode.substring( 0, 4 );
			
		if( type == me.PERIOD_TYPE_LAST_12_MONTHS || type == me.PERIOD_TYPE_THIS_YEAR_MONTH )
		{
			var month = eval( periodCode.substring(4,7) ) - 1;
			startDate = new Date( year, month, 1 );
			endDate = new Date( year, month + 1, 0 );
		}
		else if( type == me.PERIOD_TYPE_LAST_12_WEEKS )
		{
			var DAY = 86400000;
			var weekNum = eval( periodCode.substring( 5, periodCode.length ) );
			
			var days = ( 1 + ( idx - 1 ) * 7 ); // 1st of January + 7 days for each week
			startDate = new Date( year, 0, days );
			
			endDate = new Date( startDate );
			endDate.setDate( startDate.getDate() + 7 );
			
			var year = new Date(year); // toString first so it parses correctly year numbers
			var daysToMonday = ( 1 - year.getDay() ); // Note that this can be also negative
			var mondayOfFirstWeek = new Date( year.getTime() + daysToMonday * DAY );
			startDate = new Date( mondayOfFirstWeek.getTime() + (7 * ( weekNum - 1 ) * DAY ) );
						  
			endDate = new Date( startDate );
			endDate.setDate( startDate.getDate() + 6 );
		}
		else if( type == me.PERIOD_TYPE_LAST_12_QUARTERS )
		{
			var idx = eval( periodCode.substring( 5, 6 ) ) - 1;
			var month = eval( me.quarterlyStartMonth[idx] ) - 1;
			startDate = new Date( year, month, 1 );
			
			endDate = new Date( year, month + 3, 0 );
		}
		
		return {
			"startDate" : startDate
			,"endDate" : endDate
		};
	}
	
	// -------------------------------------------------------------------------------------------------------
	// Generate period code by periodIdx and year
	
	me.generatePeriodCode = function( periodIdx, year )
	{
		periodIdx = Math.floor( eval( periodIdx ) );
		
		var year = Math.floor( eval( year ) );
		
		var type = me.matrixPeriodTag.val();
		
		if( type == me.PERIOD_TYPE_LAST_12_MONTHS || type == me.PERIOD_TYPE_THIS_YEAR_MONTH )
		{
			periodIdx = ( periodIdx < 10 ) ?  "0" + periodIdx : periodIdx;
			return year + "" + periodIdx;
		}
		else if( type == me.PERIOD_TYPE_LAST_12_QUARTERS )
		{
			return year + "Q" + periodIdx;
		}
		else if( type == me.PERIOD_TYPE_LAST_12_WEEKS )
		{
			periodIdx = ( periodIdx < 10 ) ?  "0" + periodIdx : periodIdx;
			return year + "W" + periodIdx;
		}
	}
	
		
	// -------------------------------------------------------------------------------------------------------
	// Supportive methods
	
	me.getWeekNumber = function(d) {
		var onejan = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
	};
		
	me.getQuarterlyIdx = function( date )
	{
		var month = date.getMonth() + 1;
		return (Math.ceil(month / 3));
	};
	
	me.formatDateObj_YYYYMMDD = function( date )
	{
		var year = date.getFullYear();
		
		var month = date.getMonth() + 1;
		month = ( month < 10 ) ? "0" + month : month;
		
		var date = date.getDate();
		date = ( date < 10 ) ? "0" + date : date;
		
		return "" + year + month + date;
	};
	
	
	// -------------------------------------------------------------------------------------------------------
	// RUN init method
	
	me.initialSetup();
}