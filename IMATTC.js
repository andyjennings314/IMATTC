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
            $(".missions-list").addClass("row");
            $(".missions-list > div.mission").removeClass("row").addClass("col-xs-3");
            $(".missions-list > div.mission > div").removeClass("col-sm-6");

            $(".missions-list div.buttons > div").removeClass("row");
            $(".missions-list div.buttons button").removeClass("col-sm-3");
            $(".missions-list div.buttons div.button-description").remove();

            var missionsList = $('div.list');
            var newMissionPanel = "<div><div ng-repeat='mission in missions'>{{mission.definition.name}}</div></div>";
            var missions = w.$scope(missionsList);
            //w.$scope(missionsList).sortedmissions = w.$filter("orderBy")(missions, 'definition.name');

        w.$injector.invoke(function($compile) {

           // Pass our fragment content to $compile,
           // and call the function that $compile returns with the scope.
           var compiledContent = $compile(newMissionPanel)(missions);

           // Put the output of the compilation in to the page using jQuery
           $('div', missionsList).after(compiledContent);

   });
            //var compiledContent = w.$compile(newMissionPanel)(missions);
            //$(missionsList).html(compiledContent);
            // w.$injector.invoke(function($compile) {
            //     // Get the AngularJS scope we want our fragment to see
            //     var compiledContent = $compile(newMissionPanel)(missions);
            //     $(missionsList).html(compiledContent);
            // });
    }
}

setTimeout(() => {
	init();
}, 500);
