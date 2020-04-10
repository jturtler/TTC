
function ProgramRule( TabularDEObj )
{
	var me = this;

	me.TabularDEObj = TabularDEObj;

	me.loadedRules = [];

	me.varType = { "dataElement": "dataElement", "attribute": "attribute" };

	me.areaTagType = { "Event_DE": "Event_DE", "TEI_Attribute": "TEI_Attribute" };


	// 'rule' object has 'condition', 'programRuleActions'
	// later added 'conditionObjects', 'varTypesUsed'

	// -------------------------------

	// Initial Setup Call
	me.initialSetup = function()
	{				
	}

	// ----------------------------------------
	// -- 2 main functions --------------------

	// 1. Retrieve and Set Program Rule vairables to program Object
	me.RetrieveAndSet_ProgramRulesAndVariables = function( programObj )
	{
		if ( programObj !== undefined )
		{
			// Retrieve program Rules and Vairables  <-- if not already exists..
			me.retrieveProgramRules( programObj.id, function( json_Data )
			{

				if ( programObj.rules === undefined ) programObj.rules = [];
				
				$.each( json_Data.programRules, function( i_rule, item_rule )
				{
					var programRules = Util.getFromList( programObj.rules, item_rule.id, "id" )

					// if does not exists already, add it to the list.
					if ( programRules === undefined )
					{
						programObj.rules.push( item_rule );
					}
				});

			});


			me.retrieveProgramRuleVariables( programObj.id, function( json_Data )
			{
				if ( programObj.ruleVariables === undefined ) programObj.ruleVariables = [];
				
				$.each( json_Data.programRuleVariables, function( i_ruleVars, item_ruleVars )
				{
					var programRuleVariables = Util.getFromList( programObj.ruleVariables, item_ruleVars.id, "id" )

					if ( programRuleVariables === undefined )
					{
						programObj.ruleVariables.push( item_ruleVars );
					}
				});
			});
		}
	};


	// 2. Set ProgramRules on the form / event tags..
	// 'stageId' is not being used for now, but only being populated as attributes in tags.
	me.setUp_ProgramRules = function( areaType, personId, areaTag, tdTags, programRules, ruleVariables )
	{

		if ( programRules !== undefined && programRules.length > 0 )
		{

			// Resolve Rule
			var ruleIdList = [];

			
			// Check if the program rule already exists on the loaded memory (by checking id), and only load it to memory if it does not exists..
			// Take care of resolving rules as well..
			for( var i = 0; i < programRules.length; i++ )
			{
				ruleIdList.push( me.getAndSetRulesInMemory_WithResolved( programRules[i], ruleVariables ) );
			}

			me.setFormTag( areaType, personId, 'fakeStageId', ruleIdList, areaTag, tdTags );
		}
	};


	// ReRun the program rules
	me.reRun_AllProgramRules = function( areaType, personId, areaTags, programRules, ruleVariables )
	{
		// if areaTag is not empty..
		if ( areaTags.length > 0 && programRules !== undefined && programRules.length > 0 )
		{
			// Get Rule ID List
			var ruleIdList = [];
			
			for( var i = 0; i < programRules.length; i++ )
			{
				ruleIdList.push( me.getAndSetRulesInMemory_WithResolved( programRules[i], ruleVariables ) );
			}


			// If multiple rows exists, perform them one by one.
			areaTags.each( function( i )
			{
				var areaTag = $( this );
			
				me.performAllProgramRules( areaType, areaTag, ruleIdList, personId );
			});
		}
	};


	// ---------------------------------------------
	// -- Related Methods --------------------


	me.getAndSetRulesInMemory_WithResolved = function( programRule, ruleVariables )
	{
		var ruleId = programRule.id;

		var rule = me.getRuleDetailById( ruleId );

		if ( rule === undefined )
		{
			me.loadedRules.push( me.resolveRule( programRule, ruleVariables ) );
		}

		return ruleId;
	};


	me.getRuleDetailById = function( ruleId )
	{
		var ruleDetail;

		$.each( me.loadedRules, function( i_rule, item_rule )
		{
			if ( item_rule.id == ruleId )
			{
				ruleDetail = item_rule;
				return false;
			}
		});

		return ruleDetail;
	};

	// ------------------------


	me.retrieveProgramRules = function( programId, returnFunc )
	{
		var queryUrl = _queryURL_ProgramRules + '.json?paging=false&fields=id,condition,programRuleActions[id,programRuleActionType,dataElement[id],content,trackedEntityAttribute[id,name]]&filter=program.id:eq:' + programId;

		RESTUtil.getAsynchData( queryUrl, function( json_Data ) 
		{
			returnFunc( json_Data );
			//json_Data.programRules;
		});
	};


	me.retrieveProgramRuleVariables = function( programId, returnFunc )
	{
		var queryUrl = _queryURL_ProgramRuleVariables + '.json?paging=false&fields=id,name,programRuleVariableSourceType,program[id],programStage[id],trackedEntityAttribute[id],dataElement[id,valueType]&filter=program.id:eq:' + programId;

		RESTUtil.getAsynchData( queryUrl, function( json_Data ) 
		{
			returnFunc( json_Data );
			//json_Data.programRuleVariables;
		});
	};


	// -------------------------------------

	me.resolveRule = function( pRule, ruleVariables )
	{
		// Mainly used for translating Condition variable name into Uid.
		// Also, build the Used Object List in both Condition & Action.
		// Also, build the condition / action variable type used ( between dataElements and TEI attributes )

		// Replace the variable name to object id (ex. data Element id --> #{eed234sdf} )
		// - for attribute, it use A{--uid--} rather than #{--}


		var rule = JSON.parse( JSON.stringify( pRule ) );
		var condition = rule.condition;
		//var actions = rule.programRuleActions;

		rule.conditionObjects = [];
		rule.actionObjects = [];
		rule.varTypesUsed = { condition: { attributes: [], dataElements: [] }, action: { attributes: [], dataElements: [] } };
		rule.subRules = [];
		
		for( var j=0; j < ruleVariables.length; j++ )
		{
			var ruleVariable = ruleVariables[j];
			var type = ruleVariable.programRuleVariableSourceType;

			//type == "TEI_ATTRIBUTE" vs "DATAELEMENT_..." 
			var variableId = me.convertObjectIdToVariable( type, ruleVariable.name );


			if( condition.indexOf( variableId ) >= 0 )
			{
				var objectId = me.getObjectIdFromVariable( type, ruleVariable );
				
				// Collect the condition variables
				me.collectConditionVariables( objectId, type, ruleVariable, rule.conditionObjects );

				// Convert condition variable with name --> to Uid
				rule.condition = rule.condition.split( variableId ).join( me.convertObjectIdToVariable( type, objectId ) );

				// Collect the variable type - used in Condition
				me.collectVariableTypesUsed_Condition( rule.varTypesUsed.condition, type, objectId );
			}
		}
		
		// Get SubRules
		var conditionList = rule.condition.split( /[&&|\|\|]/g );
		
		for( var i in conditionList )
		{
			if( conditionList[i] !== "" )
			{
				var subRule = {};
				subRule.condition = conditionList[i];
				subRule.conditionObjects = [];
				
				for( var j=0; j < ruleVariables.length; j++ )
				{
					var ruleVariable = ruleVariables[j];
					var type = ruleVariable.programRuleVariableSourceType;
					var objectId = me.getObjectIdFromVariable( type, ruleVariable );

					if( subRule.condition.indexOf( objectId ) >= 0 )
					{
						// Collect the condition variables
						me.collectConditionVariables( objectId, type, ruleVariable, subRule.conditionObjects );
						subRule.condition = subRule.condition.split( variableId ).join( me.convertObjectIdToVariable( type, objectId ) );
					}
				}
				
				rule.subRules.push( subRule );
			}
		}

		// Collect the condition variables
		me.collectActionVariables( rule.programRuleActions, rule.actionObjects );
		
		// Collect the variable type - used in Action
		me.collectVariableTypesUsed_Action( rule.varTypesUsed.action, rule.programRuleActions );
		
		
		return rule;
	};

	
	// TODO: Need to pass the person ID!!!!
	me.setFormTag = function( areaType, personId, stageId, ruleIdList, areaTag, tdTags )
	{			
		// Rows are already created.  We need to tag them.
		//var rowTag = me.createRow( json_Data.programStages[j].id, psDataElements[i].dataElement, ruleIdList );

		if( ruleIdList.length > 0 )
		{
			// 1. Populate the Rule Related Tags First
			tdTags.each( function( index ) 
			{
				var tdTag = $( this ); 
				var elementId = ( areaType == me.areaTagType.Event_DE ) ? tdTag.attr( "deid" ) : tdTag.attr( "attributeid" ) ;

				if( Util.checkValue( elementId ) )
				{

					// NOTE: FOR NOW, ONLY IMPLEMENT 'INPUT' TAG ONES.
					var valTag = tdTag.find( FormUtil.getStr_Views() ).first();

					
					if ( valTag.length > 0 )
					{
						// Mark the tag that are needed for rule
						valTag.attr( 'rule_deId', elementId ).attr( 'rule_stageId', stageId );
				
						var rulePreloaded = "";
						var deRuleIdList = [];

						for ( var j = 0; j < ruleIdList.length; j++ )
						{
							var ruleId = ruleIdList[j];
							var rule = me.getRuleDetailById( ruleId );

							if( Util.findItemFromList( rule.conditionObjects, "id", elementId ) )
							{
								deRuleIdList.push( ruleId );
							}								
						}


						// Mark each tag with rule and setup the Change event.
						if( deRuleIdList.length > 0 )
						{
							valTag.attr( "rules", JSON.stringify( deRuleIdList ) );


							valTag.change( function()
							{
								// Execute all the rules related to the changed value.
								var rules = me.getRulesFromStr( $( this ).attr( "rules" ) );
								var valType = $( this ).attr( "valtype" );

								$.each( rules, function( i_rule, item_rule )
								{
									me.performProgamRuleForDataElement( areaType, areaTag, item_rule, personId );
								});
							});
						}
					}
				}					
			});


			// onLoad, execute all the rules once. - Including mixed hidden cases.
			me.performAllProgramRules( areaType, areaTag, ruleIdList, personId );

		}
	};


	me.performAllProgramRules = function( areaType, areaTag, ruleIdList, personId )
	{
		// onLoad, execute all the rules once. - Including mixed hidden cases.
		$.each( ruleIdList, function( i_rule, ruleId )
		{
			var rule = me.getRuleDetailById( ruleId );

			me.performProgamRuleForDataElement( areaType, areaTag, rule, personId );
		});
	}


	// -----------------------------------

	me.getRulesFromStr = function( ruleIdListAttr )
	{
		var rules = [];

		if ( ruleIdListAttr !== undefined && ruleIdListAttr != "" )
		{
			var ruleIdList = JSON.parse( ruleIdListAttr );

			for( var i=0; i < ruleIdList.length; i++ )
			{
				rules.push( me.getRuleDetailById( ruleIdList[i] ) );
			}
		}

		return rules;
	};


	// Perform action if the condition returns true.
	me.performProgamRuleForDataElement = function( areaType, areaTag, rule, personId )
	{
		//var ruleIdListAttr = deValTag.attr( "rules" );
		//var ruleId = ruleIdList[i];
		//var rule = me.getRuleDetailById( ruleId );

		if ( rule === undefined )
		{
			console.log( 'rule is undefined' );						
		}
		else
		{	
			me.checkConditionFromRule( areaType, areaTag, personId, rule, function( valid )
			{
				// CONSOLE
				//console.log( 'rule performed: ' + valid );

				// Per ProgramRule Action, find the action Target Control, and perform it.
				for( var j = 0; j < rule.programRuleActions.length; j++ )
				{
					var action = rule.programRuleActions[j];


					var targetDeId = ''
					if ( action.dataElement !== undefined ) targetDeId = action.dataElement.id;
					else if ( action.trackedEntityAttribute !== undefined ) targetDeId = action.trackedEntityAttribute.id;


					var targetTag = areaTag.find( "[rule_deId='" + targetDeId + "']" );


					// Reset the action info..
					// Clear the previous warning message
					areaTag.find( "img.action_Msg_" + action.id + "" ).remove();

					var actionTag = areaTag.find( ".action_Hidden_" + action.id );

					if ( actionTag.length > 0 )
					{
						actionTag.removeClass( "action_Hidden_" + action.id );
						
						//** IF THERE ARE OTHER HIDDEN Actions, do not enable it!!
						if ( actionTag.filter( "[class*=action_Hidden]" ).length == 0 )
						{
							actionTag.prop( 'disabled', false ).removeClass( "markDisabled" );
						}
					}


					// If the rule condition is valid, perform the action.
					if ( valid )
					{
						// ** It it marked with 'action_sourceDeId' only if the
						// action was taken <-- Like hidden.
						if( action.programRuleActionType == 'HIDEFIELD' )
						{
							targetTag.addClass( "action_Hidden_" + action.id );

							if ( !targetTag.hasClass( "markDisabled" ) ) targetTag.addClass( "markDisabled" );

							// Disable the tag..
							targetTag.prop( 'disabled', true );
							if( targetTag.val() != "" )
							{
								if( targetTag.hasClass("checkbox") )
								{
									if( targetTag.is( ":checked" ) )
									{
										targetTag.prop("checked", false);
										targetTag.change();
									}
								}
								else
								{
									targetTag.val("");
									targetTag.change();
								}
								
							}
						}
						else if( action.programRuleActionType == 'SHOWERROR' )
						{
							targetTag.after( '<img class="action_Msg_' + action.id + '  ruleStatus ruleError" alt="Rule Status" title="' + action.content + '" src="img/status_red.png" >' );
						}
						else if( action.programRuleActionType == 'SHOWWARNING' )
						{
							targetTag.after( '<img class="action_Msg_' + action.id + ' ruleStatus ruleWarning" alt="Rule Status" title="' + action.content + '" src="img/status_yellow.png">' );
						}
						else if( action.programRuleActionType == 'WARNINGONCOMPLETE' )
						{
							targetTag.after( '<img class="action_Msg_' + action.id + ' ruleStatus ruleWarning warmingOnComplete" alt="Rule Status" title="' + action.content + '" src="img/status_yellow.png">' );
						}
						else if( action.programRuleActionType == 'ERRORONCOMPLETE' )
						{
							targetTag.after( '<img class="action_Msg_' + action.id + ' ruleStatus ruleWarning errorOnComplete" alt="Rule Status" title="' + action.content + '" src="img/status_red.png">' );
						}
					}
				}
			});
		}
	};

	// -------------------------------------

	me.checkConditionFromRule = function( areaType, areaTag, personId, rule, returnFunc )
	{	
		try
		{
			me.getConditionObjValues( areaType, areaTag, personId, rule.conditionObjects, function( objValues )
			{
				if ( rule.conditionObjects.length == Util.getObjPropertyCount( objValues ) )
				{
					var condition = rule.condition;
					
					for( var i in rule.subRules )
					{
						var subValid = me.checkConditionFromRule_Inner( objValues, rule.subRules[i] );
						condition = condition.replace( rule.subRules[i].condition, " " + subValid  + " " );
					}
					
					var valid = eval( condition );
					returnFunc( valid );
				}
				else
				{
					// If object (DE) does not hold value, we do not need to proceed with condition calculation - it is 'not match' case automatically.
					console.log( 'condition object NOT MATCHED - conditionObjValue count' );
				}
			});					
		}
		catch (err)
		{
			// mesage show..
			MsgManager.msgAreaShow( "Error occurred during programRule processing.." );
			console.log( 'ProgramRule Error: ' + err );
			returnFunc( false );
		}
	};


	// TODO: item_Person OR item_lastEvent!!
	me.checkConditionFromRule_Inner = function( objValues, rule )
	{	
		// This handles multiple condition variable values comparison/mathmatics in a rule condition.

		var conditionObjects = rule.conditionObjects;

		var condition = rule.condition;
		var flag = true;
		var isMathCondition = true;
		
		
		// Check if there is any mathematic condition in the rule, such as ' a + b == c '
		for( var i in conditionObjects )
		{
			var valueType = conditionObjects[i].valueType;
			if( valueType != 'NUMBER' && valueType != 'INTEGER' && valueType != 'INTEGER_ZERO_OR_POSITIVE' 
				&& valueType != 'INTEGER_POSITIVE' && valueType != 'INTEGER_NEGATIVE'
				&& valueType != 'TRUE_ONLY' && valueType != 'BOOLEAN' )
			{
				isMathCondition = false;
			}
		}
						
		for( var i = 0; i < conditionObjects.length; i++ )
		{
			var conditionObject = conditionObjects[i];

			var deValue = ( objValues[ conditionObject.id ] !== undefined ) ? objValues[ conditionObject.id ] : "";

			if( deValue != "" )
			{
				var joinValue = isMathCondition ? deValue : "'" + deValue + "'";

				condition = condition.split( me.convertObjectIdToVariable( conditionObject.type, conditionObject.id ) ).join( joinValue );
			}
			else
			{
				condition = "true";
			}
		}
		
		//console.log( 'flag: ' + flag + ', condition: ' + condition );
		// Check if there is any mathematic condition in the rule
		//if( flag )
		//{
			/* var subConditions = condition.split( /(&&|\|\|)/g );

			for( var j = 0; j < subConditions.length; j ++ )
			{
				var subResult = me.checkSimgleMathInCondition( condition );						
				condition = condition.split( condition ).join( subResult );
			} */
			
		//	flag = eval( condition );
		//}
		
		// CONSOLE
		//console.log( 'checkConditionFromRule_Inner, flag: ' + flag + ', math: ' + isMathCondition + ', condition: ' + condition );

		// return ( flag ) ? eval( condition ) : flag;
		return condition;
	};


	// Return only when all the values are retrieved or tried.
	me.getConditionObjValues = function( areaType, areaTag, personId, conditionObjects, returnFunc )
	{	
		var objValues = {};
		var totalCount = conditionObjects.length;
		var checkCount = 0;

		var orgUnitId = TabularDEObj.getOrgUnitId();
		var programId = TabularDEObj.getSelectedProgramId();

		console.log( 'programRule.getConditionObjValues, programId: ' + programId );
		// CONSOLE
		// Run the loading progress bar for this!!!!
		// $( '#programRuleLoading' ).show();


		$.each( conditionObjects, function( i_obj, item_obj )
		{

			// On demand or From Tag - find value.  
			// If not found matching tab, we expect 'undefined' to be there..
			if ( areaType == me.areaTagType.Event_DE )
			{
				if ( item_obj.type == EventUtil.varSrcType_DE_CurrentEvent )
				{
					if ( areaTag !== undefined && areaTag.length > 0 )
					{
						var conditionValTag = areaTag.find( "[rule_deId='" + item_obj.id + "']" );

						if ( conditionValTag.length > 0 )
						{
							objValues[ item_obj.id ] = conditionValTag.val();
						}
					}

					checkCount++;
				}
				else if ( item_obj.type == EventUtil.varSrcType_TEI_Attribute )
				{
					// TODO: 2.30
					
					//programId = me.TabularDEObj.searchPanel.programManager.selectedProgramId;// Retrieve TEI_Attribute values first, and then, get data..

					PersonUtil.getPersonByID_Reuse( personId, programId, function( item_Person )
					{
						// Check the count and only if the count is filled, call returnFunc
						var attributeData = Util.getFromList( item_Person.attributes, item_obj.id, "attribute" );

						if ( attributeData !== undefined ) objValues[ item_obj.id ] = attributeData.value;

					}, function()
					{
						checkCount++;

						if ( checkCount >= totalCount ) 
						{
							$( '#programRuleLoading' ).hide();
							returnFunc( objValues );
						}
					});
				}
				else
				{
					console.log( 'The programRule SOURCE Type, ' + item_obj.type + ', has not been implemented for now.' );

					// DISABLE THIS FOR NOW - FOR STABILITY
					// NOTE:
					//  - DUE TO this value happening before
					//		saving, the change of the value are not used in the programRule, which causes issue (due to previous value being used on the rule).
					//	- TO RESOLVE this, we have to clearly set how the rules will affect the value saving..

					/*
					// in Event_DE AreaType, 'areaTag' is eventRowTag
					var progStageId = EventUtil.getProgramStageId_FromRow( areaTag );
					var eventId = EventUtil.getEventId_FromRow( areaTag );

					EventUtil.getEventBySrcType( false, orgUnitId, programId, personId, item_obj.type, item_obj.programStageId, eventId, function( item_Event )
					{
						// CONSOLE
						console.log( 
						item_Event.dataValues ); 
						
						// Check the count and only if the count is filled, call returnFunc
						var dataElementData = Util.getFromList( item_Event.dataValues, item_obj.id, "dataElement" );

						if ( dataElementData !== undefined ) objValues[ item_obj.id ] = dataElementData.value;

					}, function()
					{
						checkCount++;

						if ( checkCount >= totalCount ) 
						{
							$( '#programRuleLoading' ).hide();
							returnFunc( objValues );
						}
					});
					*/
				}
			}
			else if ( areaType == me.areaTagType.TEI_Attribute )
			{
				if ( item_obj.type == EventUtil.varSrcType_TEI_Attribute )
				{
					if ( areaTag !== undefined && areaTag.length > 0 )
					{
						var conditionValTag = areaTag.find( "[rule_deId='" + item_obj.id + "']" );

						if ( conditionValTag.length > 0 )
						{
							objValues[ item_obj.id ] = conditionValTag.val();
						}
					}

					checkCount++;
				}
				else
				{
					// For event variables, get latest event on the program for the TEI(person)
					EventUtil.getEventBySrcType( false, orgUnitId, programId, personId, EventUtil.varSrcType_DE_NewestEventInProgram, undefined, undefined, function( item_Event )
					{
						// Check the count and only if the count is filled, call returnFunc
						var dataElementData = Util.getFromList( item_Event.dataValues, item_obj.id, "dataElement" );

						if ( dataElementData !== undefined ) objValues[ item_obj.id ] = dataElementData.value;

					}, function()
					{
						checkCount++;

						if ( checkCount >= totalCount ) 
						{
							$( '#programRuleLoading' ).hide();
							returnFunc( objValues );
						}
					});
				}
			}
		});


		if ( checkCount >= totalCount ) 
		{
			$( '#programRuleLoading' ).hide();
			returnFunc( objValues );
		}
	};

	
	me.convertObjectIdToVariable = function( type, id )
	{
		return ( type == EventUtil.varSrcType_TEI_Attribute ) ? "A{" + id + "}" : "#{" + id + "}";
	};
	
	me.getObjectIdFromVariable = function( type, ruleVariable )
	{
		console.log( ' ruleVariable : ' + ruleVariable );
		return ( type == EventUtil.varSrcType_TEI_Attribute ) ? ruleVariable.trackedEntityAttribute.id : ruleVariable.dataElement.id;
	};

	// ------------------

	me.collectVariableTypesUsed_Condition = function( condition, varType, id )
	{
		// var varTypesUsed =  { condition: { attributes: [], dataElements: [] }, action: { attributes: [], dataElements: [] } };
		( varType == EventUtil.varSrcType_TEI_Attribute ) ? condition.attributes.push( id ) : condition.dataElements.push( id );
	};

	me.collectVariableTypesUsed_Action = function( action, programRuleActions )
	{
		// var varTypesUsed =  { condition: { attributes: [], dataElements: [] }, action: { attributes: [], dataElements: [] } };

		$.each( programRuleActions, function( i_action, item_action )
		{
			if ( item_action.trackedEntityAttribute !== undefined )
			{
				action.attributes.push( item_action.trackedEntityAttribute.id );
			}
			else if ( item_action.dataElement !== undefined )
			{
				action.dataElements.push( item_action.dataElement.id );
			}
		});
	};

	// ------------------

	me.collectConditionVariables = function( objectId, type, ruleVariable, conditionObjects )
	{
		if( ruleVariable.dataElement != undefined )
		{
			var conditionObject = {};
			conditionObject.id = objectId;
			conditionObject.type = type;
			conditionObject.valueType = ruleVariable.dataElement.valueType;

			if( ruleVariable.programStage !== undefined )
			{
				conditionObject.programStageId = ruleVariable.programStage.id;
			}
			
			conditionObjects.push( conditionObject );
		}
	};
		
	me.collectActionVariables = function( programRuleActions, actionObjects )
	{
		$.each( programRuleActions, function( i_action, item_action )
		{
			var objId = "";

			if ( item_action.trackedEntityAttribute !== undefined )
			{
				objId = item_action.trackedEntityAttribute.id;
			}
			else if ( item_action.dataElement !== undefined )
			{
				objId = item_action.dataElement.id;
			}

			if ( objId != "" && actionObjects.indexOf( objId ) >= 0 )
			{
				actionObjects.push( objId );
			}
		});
	};

	// ------------------


	me.checkConditionVarType = function( condition, varType ) // ruleIdList )
	{
		var matchFound = false;

		if ( varType == me.varType.dataElement )
		{
			if ( condition.dataElements.length > 0 )
			{
				matchFound = true;
			}
		}
		else if ( varType == me.varType.attribute )
		{
			if ( condition.attributes.length > 0 )
			{
				matchFound = true;
			}
		}

		return matchFound;
	};

	me.checkSimgleMathInCondition = function( matchStr )
	{
		var result = matchStr;
		var maths = matchStr.split( /(==|>=|<=|=|!=|<>|>|<)/g );
		
		// Check if mathematic string like this 'a + b == c'
		if( maths.length == 3 )
		{
			var value = eval( maths[0] );
			result = result.split( maths[0] ).join( value );	
		}
		
		// CONSOLE
		//console.log( 'checkSimgleMathInCondition, result: ' + result );
		//console.log( maths );

		return eval( result );
	};
	
	me.getOperators = function( condition )
	{
		var patt = new RegExp("(>=|<=|=|!=|<>|>|<)");
		var operator = patt.exec(condition);
		return operator;
	};


	// --------------------------
	// Run methods

	// Initial Run Call
	me.initialSetup();

}
