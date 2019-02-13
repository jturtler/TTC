	
// -------------------------------------------
// -- Data Loading Message Util Class/Methods

function DialogLoading() {}

DialogLoading.dialogLoadingMsg_Initial = "";
DialogLoading.dialogOpenCount = 0;
DialogLoading.dialogCountClean = "countClean";

DialogLoading.getDialog = function()
{
	return $( "#dialog-loading" );			
}

DialogLoading.initialSetup = function()
{
	var dialogTag = DialogLoading.getDialog();

	dialogTag.dialog({
		  autoOpen: false,
		  dialogClass: "noTitleStuff",
		  height: 100,
		  modal: true,
		  position: { at: "center top+20%" }
		});
	
	dialogTag.find( '#forceClose' ).click( function() {

		DialogLoading.close();
		return false;
	});

	DialogLoading.dialogLoadingMsg_Initial = dialogTag.find( '#loadingMsg' ).text();
}

DialogLoading.open = function( loadingMsg )
{
	var dialogTag = DialogLoading.getDialog();

	if ( loadingMsg !== undefined )
	{
		dialogTag.find( '#loadingMsg' ).text( loadingMsg );
	}
	else
	{
		dialogTag.find( '#loadingMsg' ).text( DialogLoading.dialogLoadingMsg_Initial );
	}

	DialogLoading.dialogOpenCount++;


	dialogTag.show().dialog( "open" );
}

DialogLoading.openWithCallback = function( callback )
{
	DialogLoading.open();

	// Due to use of Synchronized calls & chrome browser optimization, 
	// Use setTimeout to delay things a bit. 
	setTimeout( callback, 50 );
}

DialogLoading.close = function( option )
{
	DialogLoading.dialogOpenCount--;

	if ( option !== undefined && option == DialogLoading.dialogCountClean )
	{
		DialogLoading.dialogOpenCount = 0;
	}

	if ( DialogLoading.dialogOpenCount <= 0)
	{
		DialogLoading.dialogOpenCount = 0;
		DialogLoading.getDialog().dialog( "close" );
	}
}

// -- Data Loading Message Util Class/Methods
// -------------------------------------------

// -------------------------------------------
// -- Quick Loading Message Util Class/Methods

// Sample loading message format
//<div id='orgUnitLoading' style='display:none'>
//	<img src='img/ui-anim_basic.gif'/> retrieving..
//</div>

function QuickLoading() {}

QuickLoading.quickLoadingCountObj = {};

QuickLoading.getLoadingCountObj = function( loadingTagName )
{
	// if property exists, return the object
	// otherwise, create the property with 0 and return
	if ( !QuickLoading.quickLoadingCountObj.hasOwnProperty( loadingTagName ) ) 
	{
		QuickLoading.quickLoadingCountObj[ loadingTagName ] = { "count": 0 };
	}

	return QuickLoading.quickLoadingCountObj[ loadingTagName ];
}

QuickLoading.dialogShowAdd = function( loadingTagName )
{
	var loadingCountObj = QuickLoading.getLoadingCountObj( loadingTagName );

	if ( loadingCountObj.count <= 0 )
	{
		loadingCountObj.count = 0;
		$( '#' + loadingTagName ).show();
	}

	loadingCountObj.count++;
}

QuickLoading.dialogShowRemove = function( loadingTagName )
{
	var loadingCountObj = QuickLoading.getLoadingCountObj( loadingTagName );

	loadingCountObj.count--;

	if ( loadingCountObj.count <= 0 )
	{
		loadingCountObj.count = 0;
		$( '#' + loadingTagName ).hide();
	}
}

// -- Quick Loading Message Util Class/Methods
// -------------------------------------------



// -- Quick Loading Message Util Class/Methods
// -------------------------------------------

function FormBlock() {}

FormBlock.block = function( block, msg, cssSetting, tag )
{
	var msgAndStyle = { message: msg, css: cssSetting };

	if ( tag === undefined )
	{
		if ( block ) $.blockUI( msgAndStyle );
		else $.unblockUI();
	}
	else
	{
		if ( block ) tag.block( msgAndStyle );
		else tag.unblock();
	}
}



// ---------------------------------------
// --- App block/unblock ---

function MsgManager() {}
		
MsgManager.cssBlock_Body = { 
	border: 'none'
	,padding: '15px'
	,backgroundColor: '#000'
	,'-webkit-border-radius': '10px'
	,'-moz-border-radius': '10px'
	,opacity: .5
	,color: '#fff'
	,width: '200px'
};

MsgManager.locked = false;
MsgManager.lockMsg = "";
MsgManager.LOCK = 'LOCK';
MsgManager.UNLOCK = 'UNLOCK';

MsgManager.appBlock = function( msg, lock )
{
	if ( MsgManager.locked )
	{
		FormBlock.block( true, MsgManager.lockMsg + ", " + msg, MsgManager.cssBlock_Body );
	}
	else
	{
		if ( !Util.checkValue( msg ) ) msg = "Processing..";

		FormBlock.block( true, msg, MsgManager.cssBlock_Body );	
	}

	if ( lock === MsgManager.LOCK ) 
	{
		MsgManager.locked = true;
		MsgManager.lockMsg = msg;
	}
}

MsgManager.appUnblock = function( unlock )
{
	if ( unlock === MsgManager.UNLOCK ) 
	{
		MsgManager.locked = false;
		MsgManager.lockMsg = "";
	}

	if ( !MsgManager.locked )
	{
		FormBlock.block( false );
	}
}


// --- Messaging ---
MsgManager.divMsgAreaTag;
MsgManager.spanMsgAreaCloseTag;
MsgManager.btnMsgAreaCloseTag;
MsgManager.spanMsgAreaTextTag;

MsgManager.initialSetup = function()
{
	MsgManager.divMsgAreaTag = $( '#divMsgArea' );
	MsgManager.spanMsgAreaCloseTag = $( '#spanMsgAreaClose' );
	MsgManager.btnMsgAreaCloseTag = $( '#btnMsgAreaClose' );
	MsgManager.spanMsgAreaTextTag = $( '#spanMsgAreaText' );
		

	MsgManager.btnMsgAreaCloseTag.click( function()
	{
		MsgManager.divMsgAreaTag.hide( 'fast' );
	});
}

MsgManager.msgAreaShow = function( msg )
{
	MsgManager.divMsgAreaTag.hide( 'fast' );
	MsgManager.spanMsgAreaTextTag.text( '' );

	MsgManager.spanMsgAreaTextTag.text( msg );
	MsgManager.divMsgAreaTag.show( 'medium' );

	console.log( ' -- Msg: ' + msg );
}



// ---------------------------------------
// --- Div Block/unblock ---

function DivBlock() {}

DivBlock.cssBlock_Body = { 
	border: 'none'
	,padding: '15px'
	,backgroundColor: 'darkgray'
	,'-webkit-border-radius': '10px'
	,'-moz-border-radius': '10px'
	,opacity: .5
	,color: '#fff'
	,width: '200px'
};


DivBlock.block = function( divTag, msg )
{
	if ( !Util.checkValue( msg ) ) msg = "Processing..";

	FormBlock.block( true, msg, DivBlock.cssBlock_Body, divTag );
}

DivBlock.unblock = function( divTag )
{
	FormBlock.block( false, undefined, undefined, divTag );
}
