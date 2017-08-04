
// OrgUnit Map Popup Class
function OrgUnitMapPopup( TabularDEObj )
{
	var me = this;

	me.TabularDEObj = TabularDEObj;

	me.dialogFormTag = $( "#orgUnitMapDialogForm" );

	me.tagId = '#orgUnitMapBig';
	me.tag = $( me.tagId );
	me.tagIdFront = me.tagId + ' ';

	me.width = 600;
	me.height = 600;

	me.centerLocation;
	me.latitude = 0;
	me.longitude = 0;

	me.gmap;
	me.currentEvent = null;

	me.zoomLvl_Init = 10;

	// overlay related
	me.overlays = new Array();
	me.marker_center;

	me.markers = [];

	me.FormPopupSetup = function()
	{
		// -- Set up the form -------------------
		me.dialogFormTag.dialog({
		  autoOpen: false,
		  width: me.width,
		  height: me.height,
		  modal: true				
		});		
	}

	me.mapSetup = function( ) //centerLoc )
	{
		var menu = new Gmap3Menu( me.tag );

		var centerLoc = new google.maps.LatLng( me.latitude, me.longitude );

		me.clearMarkers();

		// 1st call : init the map and create circles
		me.tag.gmap3({
			map:{
				options:{
					center: centerLoc
					,zoom: me.zoomLvl_Init
					,mapTypeId: google.maps.MapTypeId.ROADMAP
					,styles: [ { featureType: "poi", elementType: "labels", stylers: [ { visibility: "off" } ] } ]
					,streetViewControl: false
				}
				//,events:{ click: function(map, event){ }}
			}
		});

		me.gmap = me.tag.gmap3( 'get' );

		me.markers.push( new google.maps.Marker({
			position: centerLoc
			,map: me.gmap
			,icon: 'img/blue.png'
		}) );
	}

	me.clearMarkers = function() 
	{
		for (var i = 0; i < me.markers.length; i++ ) 
		{
			me.markers[i].setMap( null );
		}

		me.markers = [];
	}

	me.setUp_Map = function( latitude, longitude )
	{
		me.latitude = latitude;	
		me.longitude = longitude;
		
		GMapHelper.loadScript( '_TabularDEObj.orgUnitMapPopup.mapSetup', me.mapSetup );
		//_TabularDEObj.orgUnitMapPopup.mapSetup

	}

	// Initial Setup Call
	me.initialSetup = function()
	{				
		me.FormPopupSetup();
	}

	// --------------------------
	// Run methods

	// Initial Run Call
	me.initialSetup();
}
