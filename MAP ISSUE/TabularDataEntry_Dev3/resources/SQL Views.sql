
---------------- TABULAR MATRIX ------------------------------------------------

select org.uid
			, EXTRACT(${periodType} FROM event.executiondate ) AS periodIdx
      , extract(year from event.executiondate) as yyyy
			, count( event.programstageinstanceid )
from programstageinstance event
inner join programinstance pi on pi.programinstanceid=event.programinstanceid
inner join program prg on prg.programid=pi.programid
inner join organisationunit org on event.organisationunitid=org.organisationunitid

where prg.uid='${programId}'
 -- and event.executiondate >= '${startDate}' and event.executiondate <= '${endDate}'
and org.parentid = ( select organisationunitid from organisationunit where uid='${ouParentId}' )

group by 1,2,3



------------------- Load Programs by Ou paret  -------

select DISTINCT( prg.uid), prg.name, petype.name, prg.expirydays, prg.completeeventsexpirydays
from program prg
inner join program_organisationunits prgorg on prg.programid=prgorg.programid
inner join organisationunit org on prgorg.organisationunitid=org.organisationunitid
left outer join periodtype petype on petype.periodtypeid=prg.expiryperiodtypeid
where org.parentid = ( select organisationunitid from organisationunit where uid='${ouId}' )




------------------- Period Last 12 Month ------- 

SELECT date '2017-07-26' - interval '1' month * s.a 
  FROM generate_series(1,12,1) AS s(a);



------------------- Period Last 12 Weeks -------

SELECT generate_series(date_trunc('week', '2017-07-26'::date - 6)
	,date_trunc('week', '2017-07-26'::date + 1)
	,'12 week')::date - interval '1 week' * s.a  as startWeekDate
FROM generate_series(0,12,1) AS s(a);

  

------------------- Period Last 12 Quarterly -------

