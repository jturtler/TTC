
// OrgUnit Tree Class
function OrgUnitSelectionTreePopup()
{
	var me = this;

	me.dialogFormTag = $( "#orgUnitSelectionTreeDialogForm" );
	me.specificPeriodChkTag = $("#specificPeriodChk");

	me.selectedOu;

	//me.selectedOu_FromSearchPanel;

	me.onOrgUnitSelectFunc;
	me.onMatrixOrgUnitSelectFunc;


	// -- Methods ----------------

	me.FormPopupSetup = function()
	{
		// -- Set up the form -------------------
		me.dialogFormTag.dialog({
		  autoOpen: false,
		  dialogClass: "noTitleStuff",
		  width: 530,
		  height: 500,
		  modal: true,
		  buttons: {
			"Close": function() {
				$( this ).dialog( "close" );
			}
		  }
		});		
	}


	me.openForm = function()
	{
		me.dialogFormTag.show();

		me.dialogFormTag.dialog( "open" );
	}


	me.clearSelections = function()
	{
		selectionTreeSelection.clearSelections();
		selectionTreeSelection.collapseTree( $( '#selectionTree' ) );
	}

	me.selectOrgUnit = function( orgUnitId, parents )
	{
		selectionTreeSelection.collapseTree( $( '#selectionTree' ) );

		setTimeout( function()
		{
			selectionTreeSelection.expandTree( parents, 1, function()
			{
				me.parents = parents;
				selectionTreeSelection.select( orgUnitId, true );						
			});

		}, 100 );
	};

	me.selectOrgunitOnTree = function( ouId )
	{
		$("#selectionTree").find("a.selected").removeClass("selected");
		$($("#selectionTree").find( "#oustOrgUnit" + ouId ).children()[1]).addClass("selected");
	};
	

	me.onOrgUnitSelectSet = function( onOrgUnitSelectFunc )
	{
		me.onOrgUnitSelectFunc = onOrgUnitSelectFunc;
	}

	me.onMatrixOrgUnitSelectSet = function( onMatrixOrgUnitSelectFunc )
	{
		me.onMatrixOrgUnitSelectFunc = onMatrixOrgUnitSelectFunc;
	}

	me.setUp_OrgUnitTreeSelection = function()
	{
		selectionTreeSelection.setMultipleSelectionAllowed( false );

		selectionTreeSelection.setOnSelectFunction( function()
		{					
			me.selectedOu = selectionTreeSelection.getSelectedObj();

			if ( me.selectedOu !== undefined )
			{
				if ( me.onOrgUnitSelectFunc !== undefined && me.specificPeriodChkTag.prop( "checked" ) ) me.onOrgUnitSelectFunc( me.selectedOu, true );
				if ( me.onMatrixOrgUnitSelectFunc !== undefined && !me.specificPeriodChkTag.prop( "checked" ) ) me.onMatrixOrgUnitSelectFunc( me.selectedOu, true );

				me.dialogFormTag.dialog( "close" );
			}

		});

		selectionTree.buildSelectionTree();
	}

	// Initial Setup Call
	me.initialSetup = function()
	{				
		me.FormPopupSetup();

		me.setUp_OrgUnitTreeSelection();
	}

	// --------------------------
	// Run methods

	// Initial Run Call
	me.initialSetup();
}
