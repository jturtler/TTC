
// -------------------------------------------
// Class - TabularDataEntry
//			- The main class.  This class represents the entire TabularDataEntry, thus, includes all the class/object.
function TabularDataEntry( _orgUnitSelectionTreePopup )
{
	var me = this;
	
	// orgUnit Selection Tree Popup
	me.orgUnitSelectionTreePopup = _orgUnitSelectionTreePopup;
	
	// App Setting Form Popup
	me.settingForm = new SettingForm();

	// Data in memory access
	me.dataInMemory = new DataInMemory();

	// Setting Related
	me.searchPanel = new SearchPanel( me );

	// Person List
	me.personList = new PersonList( me );

	
	// OrgUnitMap Popup
	me.orgUnitMapPopup = new OrgUnitMapPopup( me );

	// ProgramRule
	me.programRule = new ProgramRule( me );

	me.dataElementOrguUnitPopup = new DataElementOrguUnitPopup( me );
	
	me.dataSetValues = new DataSetValues( me );

	// --------------------------
	// Method Calls From Child Object to each other

	// -- SettingForm Related --------

	me.getCountryLevel = function()
	{
		return me.settingForm.getCountryLevel();
	}

	me.checkIncompleteAction_UserRole = function( runFunc )
	{
		me.settingForm.checkIncompleteAction_UserRole( runFunc );
	}


	// -- SearchPanel Related --------

	me.populateProgramStages = function( programStageTag, programVal )
	{
		me.searchPanel.programManager.populateProgramStages( programStageTag, programVal );
	}

	me.populatePrograms = function( programTag )
	{
		me.searchPanel.programManager.populatePrograms( programTag );
	}

	me.getProgramStageList = function( programId )
	{
		return me.searchPanel.programManager.getProgramStageList( programId );
	}

	me.resetUnderPersonOptions = function()
	{
		me.searchPanel.resetUnderPersonOptions();
	}

	me.getOrgUnitId = function()
	{
		return me.searchPanel.getOrgUnitId();
	}
	
	me.setOrgUnit = function( name, id )
	{
		me.orgUnitSelectedId = id;
		me.orgUnitNameTag.val( name );
	}
	
	me.getEventQueryBaseUrl = function()
	{
		return me.searchPanel.getEventQueryBaseUrl();
	}

	me.getTEIFromEventQueryBaseUrl = function()
	{
		return me.searchPanel.getTEIFromEventQueryBaseUrl();
	}

	me.getSelectedProgramId = function()
	{
		return me.searchPanel.programManager.selectedProgramId;
	}

	me.getSelectedProgram = function()
	{
		return me.searchPanel.programManager.selectedProgram;
	}

	me.getSelectedProgramType = function()
	{
		return me.searchPanel.programManager.getSelectedProgramType();
	}

	me.isCase_MEwR = function()
	{
		return me.searchPanel.programManager.isCase_MEwR();
	}

	me.isCase_SEwoR = function()
	{
		return me.searchPanel.programManager.isCase_SEwoR();
	}

	me.getDefaultStartDate = function()
	{
		return me.searchPanel.getDefaultStartDate();
	}

	me.getDefaultEndDate = function()
	{
		return me.searchPanel.getDefaultEndDate();
	}

	me.isCase_ListAllPersonHistoricalEvents = function()
	{
		return me.searchPanel.isCase_ListAllPersonHistoricalEvents();
	}
	
	me.isCase_SearchAllProgram = function()
	{
		return me.searchPanel.isCase_SearchAllProgram();
	}
	
	me.getSearchProgramStatus = function()
	{
		return me.searchPanel.getSearchProgramStatus();
	}

	me.setPersonFoundNoSpanTag = function( inputText )
	{
		me.searchPanel.personFoundNoSpanTag.html( inputText );	
	}

	me.getProgramList_Full = function()
	{
		return me.searchPanel.programManager.getProgramList_Full();
	}

	me.getProgramStageList_Full = function()
	{
		return me.searchPanel.programManager.getProgramStageList_Full();
	}

	me.getProgramStageData_ById = function( programStageId )
	{
		return me.searchPanel.programManager.getProgramStageData_ById( programStageId );
	}

	me.getProgramTrackedEntityAttributes = function()
	{
		return me.searchPanel.defaultProgram_TEA_Manager.getProgramTrackedEntityAttributes();
	}

	me.getFirstDisplayAttribute = function()
	{
		return me.searchPanel.defaultProgram_TEA_Manager.getFirstDisplayAttribute();
	}

	me.getInDisplayListCount = function()
	{
		return me.searchPanel.defaultProgram_TEA_Manager.getInDisplayListCount();
	}


	// -- PersonList Related -------

	me.resetMainList = function()
	{
		me.personList.resetMainList();
	}

	me.populatePersonData = function( returnFunc )
	{
		return me.personList.populatePersonData( returnFunc );
	}				

	me.personInfoPopup = function( personInfoTag, afterSaveAction )
	{
		me.personList.personInfoPopup( personInfoTag, afterSaveAction );
	}

	me.retrieveAndPopulateEvents = function( tableCurrent, execFunc )
	{
		return me.personList.personEvent.retrieveAndPopulateEvents( tableCurrent, execFunc );
	}
	
	me.retrieveAndPopulateDataSetValuesIfAny = function()
	{
		return me.dataSetValues.generateAndPopulateDataSetForm();
	}
	
	me.getMainPersonTableTag = function()
	{
		return me.personList.mainPersonTableTag;
	}

	me.hideMainSections = function()
	{
		return me.personList.hideMainSections();
	}

	me.showMainSection = function()
	{
		return me.personList.showMainSection();
	}

	me.getJson_PersonList_EventDateChecked = function()
	{
		return me.personList.json_PersonList_EventDateChecked;
	}

	me.getPerson_WithDoneStage = function( personId, execFunc )
	{
		return me.personList.getPerson_WithDoneStage( personId, execFunc );
	}

	me.retreivePersonListWithEvents = function( populateFunc )
	{
		return me.personList.personEvent.retreivePersonListWithEvents( populateFunc );
	}

	me.setPersonInfoRow = function( trCurrent, item_person )
	{
		me.personList.setPersonInfoRow( trCurrent, item_person );
	}

	/*
	me.programEnroll = function( personId, programId, orgUnitId, eventDateInFormat, newlyEnrolledAction, successAction, failAction )
	{
		return me.personList.programEnroll( personId, programId, orgUnitId, eventDateInFormat, newlyEnrolledAction, successAction, failAction );
	}
	*/

	me.checkProgramEnroll = function( personId, programId, orgUnitId, enrolledAction, notEnrolledAction )
	{
		me.personList.checkProgramEnroll( personId, programId, orgUnitId, enrolledAction, notEnrolledAction );
	}

	me.programEnroll = function( personId, programId, orgUnitId, eventDateInFormat, successAction, failAction )
	{
		me.personList.programEnroll(  personId, programId, orgUnitId, eventDateInFormat, successAction, failAction );
	}

	me.createPersonTableHeaders = function( programTrackedEntityAttributes )
	{
		me.personList.createPersonTableHeaders( programTrackedEntityAttributes );
	}

	me.populatePersonAttirbutesToRow = function( trCurrent, attributes )
	{
		me.personList.populatePersonAttirbutesToRow( trCurrent, attributes );
	}

	me.addTo_DoneStage = function( trPersonRow, stageId )
	{
		me.personList.addTo_DoneStage( trPersonRow, stageId );
	}

	// PersonEvent Related 
	me.getAttrControlsTemplate = function()
	{
		return me.personList.personEvent.getAttrControlsTemplate();
	}


	// ========================================================

	// Methods
	me.setupTopSection = function()
	{
		// Set click event - back to application
		$( '#headerBanner,#headerText,#closeButton' ).click( function() { window.location.href = _dhisHomeURL; } );

		// Get application title
		$.get( _queryURL_appTitle, function( json_Data )
		{
			$( '#headerText' ).text( Util.getNotEmpty( json_Data.applicationTitle ) );
		});


		$( '#settingFormOpen' ).click( function()
		{
			me.settingForm.openForm();

			return false;
		});
	}

	// ========================================================

	me.initialSetup = function( )
	{	

		me.setupTopSection();

		// get Setting Data to keep in memory and check for required setting data for this app.
		me.settingForm.loadSettingDataInitially_AndCheckRequired();

		// Hide the person list.
		me.searchPanel.setVisibility_MainSectionDiv( false );

		// Initially set focus on OrgUnit Search Tag
		me.searchPanel.orgUnitNameTag.val( '' ).focus();


		/*
		$( '#testBtn' ).click( function()
		{
			console.log( 'selected Program: ' + JSON.stringify( me.searchPanel.programManager.selectedProgram ) );
		});
		*/

	}


	// Initial Setup Call
	me.initialSetup( );
}

