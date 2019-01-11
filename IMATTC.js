// ==UserScript==
// @name         IMATTC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A usability overhaul for the Ingress Mission Authoring Tool
// @author       You
// @match        https://mission-author-dot-betaspike.appspot.com/
// @grant        none
// ==/UserScript==

$(function () {
    'use strict';
    // Your code here...
    TimeConversionConstants.MINUTE_GRANULARITY_MINUTES = 1;
    TimeConversionConstants.HOUR_GRANULARITY_MINUTES = 15;
    TimeConversionConstants.DAY_GRANULARITY_HOURS = 12;

    var newCssRules = "<style>.missions-list .mission {    border: 5px solid black;    margin: 0;    position: relative;    height: 250px;    padding: 5px;    display: block;}.mission-list-item-published {    background-image: none;    background: #21696b;}.mission-list-item-draft {    background-image: none;    background: #4c3b1f;}.mission-list-item-draft_of_published_mission {    background-image: none;    background: #21696b;}.mission-list-item-submitted {    background-image: none;    background: #4c3b1f;}.mission-list-item-disabled { background-image: none; background: #6b6b6b;} .mission-list-item-submitted_and_published {    background-image: none;    background: #21696b;}</style>";
    $("head").append( newCssRules );

});

function init(){
    var w = window;
    	let tryNumber = 15;

	const initWatcher = setInterval(() => {
		if (tryNumber === 0) {
            clearInterval(initWatcher);
			alert("fuck");
		}
		if (w.angular && $(".missions-list").length > 0) {
			let err = false;
			try {
				initAngular();
			}
			catch (error) {
                clearInterval(initWatcher);
				err = error;
				console.log(error);
			}
			if (!err) {
				try {
                    clearInterval(initWatcher);
					whenItsLoaded();
				} catch (error) {
					console.log(error);
				}
			}
		}
		tryNumber--;
	}, 1000);

    function initAngular() {
		const el = w.document.querySelector("*[ng-app]");
		w.$app = w.angular.element(el);
		w.$injector = w.$app.injector();
		w.$rootScope = w.$app.scope();
        w.$filter = w.$app.injector().get('$filter');
        w.$compile = w.$app.injector().get('$compile');

		w.$scope = element => w.angular.element(element).scope();
	}

    function whenItsLoaded(){
			$(".missions-list").empty()
            $(".missions-list").addClass("row");
//
            var missionsElement = $('div.list');
            var missionScope = w.$scope(missionsElement);
            missionScope.missions = w.$filter("orderBy")(missionScope.missions, 'definition.name');

    	    w.$injector.invoke(function($compile) {
				for (var i = 0; i < missionScope.missions.length; i++){
					// Pass our fragment content to $compile,
				   // and call the function that $compile returns with the scope.
				   var mission = missionScope.missions[i];
				   var newMissionPanel = "<div class='mission col-xs-3 mission-list-item-" + mission.missionListState.toLowerCase() + "'>";
				   newMissionPanel += "<img class='mission-image' src='" + mission.definition.logo_url + "'>";
				   newMissionPanel += "<span class='name mission-title-" + mission.missionListState.toLowerCase() + "'>" + mission.definition.name + "</span><br />";
				   newMissionPanel += "<i class='name mission-title-" + mission.missionListState.toLowerCase() + " glyphicon glyphicon-";
				   switch (mission.missionListState){
					    case "DRAFT":
						newMissionPanel += "wrench' title=''";
						break;
						case "DRAFT_OF_PUBLISHED_MISSION":
						newMissionPanel += "wrench' title=''";
						break;
						case "PUBLISHED":
						newMissionPanel += "ok' title=''";
						break;
						case "SUBMITTED":
						newMissionPanel += "send' title=''";
						break;
						case "SUBMITTED_AND_PUBLISHED":
						newMissionPanel += "send' title=''";
						break;
					   }
				   newMissionPanel += "></i>";
				   newMissionPanel += "<span class='name mission-time-"+mission.missionListState.toLowerCase()+"'>"+missionScope.getInfoTime(mission)+"</span>";
				   newMissionPanel += "<div class='dropdown'><button class='button action-button dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>Action <span class='caret'></span></button>";
				   newMissionPanel += "<ul class='dropdown-menu' aria-labelledby='dropdownMenu1'>"
				   newMissionPanel += "<li><a role='button' ng-click='button1Clicked(missions["+i+"])'>" + missionScope.getButton1Title(mission) + "</a></li>";
				   newMissionPanel += "<li><a role='button' ng-click='button2Clicked(missions["+i+"])'>" + missionScope.getButton2Title(mission) + "</a></li>";
				   newMissionPanel += "</ul></div>"
				   newMissionPanel += "<table class='table table-bordered'><tr>";
				   newMissionPanel += "<td>";
				   switch (mission.definition.mission_type) {
					case "SEQUENTIAL":
						newMissionPanel += "Sequential";
						break;
					case "HIDDEN_SEQUENTIAL":
						newMissionPanel += "Sequential: Hidden";
						break;
					case "NON_SEQUENTIAL":
						newMissionPanel += "Any Order";
						break;
					}
				   mission.definition.mission_type 
				   newMissionPanel += "</td>";
				   if (mission.stats){
					   newMissionPanel += "<td>" + missionScope.getMissionTimeString(mission) + "</td>";
					   newMissionPanel += "<td>" + missionScope.getMissionRatingString(mission) + "</td>";
					   newMissionPanel += "<td>" + mission.stats.num_completed + "</td>";					   
					}
				   newMissionPanel += "</tr></table>";
				   newMissionPanel += "</div>";
				   var compiledContent = $compile(newMissionPanel)(missionScope);
		
				   // Put the output of the compilation in to the page using jQuery
				   $('.missions-list').append(compiledContent);								   
				}

   });
    }
}

setTimeout(() => {
	init();
}, 500);
