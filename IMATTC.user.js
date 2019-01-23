// ==UserScript==
// @name         IMATTC
// @version      0.3.5
// @description  A usability overhaul for the Ingress Mission Authoring Tool
// @author       @Chyld314
// @match        https://mission-author-dot-betaspike.appspot.com/
// @match        https://mission-author-dot-betaspike.appspot.com/edit*
// @grant        none
// @downloadURL	 https://github.com/andyjennings314/IMATTC/raw/master/IMATTC.user.js
// @updateURL	 https://github.com/andyjennings314/IMATTC/raw/master/IMATTC.user.js
// ==/UserScript==
$(function() {
    'use strict';
    //Latest version of Bootstrap
    $("link[href='vendor/bootstrap/css/bootstrap.css']").attr("href", "https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css")

    // Modify time conversion variables to ones with actual granularity
    TimeConversionConstants.MINUTE_GRANULARITY_MINUTES = 1;
    TimeConversionConstants.HOUR_GRANULARITY_MINUTES = 15;
    TimeConversionConstants.DAY_GRANULARITY_HOURS = 12;

    //Build CSS rules
    var newCssRules = "<style>"
    newCssRules += ".navbar-my-missions							{cursor: pointer;}";
    newCssRules += ".list .missions-list 						{display: flex;flex-wrap: wrap;}"
    newCssRules += ".missions-list .mission 					{border: 5px solid black; margin: 0; position: relative; padding: 5px; display: block;}";
    newCssRules += ".list .mission .action-button 				{width: 100%; min-width: initial; max-width: initial;}";
    newCssRules += ".mission-header-container					{display: flex; align-items: stretch;}";
    newCssRules += ".mission-header-container div:nth-of-type(1){padding-right: 5px; width: 60px}";
    newCssRules += ".mission-header-container div:nth-of-type(2){width: calc(100% - 115px)}";
    newCssRules += ".mission-header-container div:nth-of-type(3){padding-left: 5px; width: 45px}";
    newCssRules += ".button, button 							{background-image: none;}";
    newCssRules += ".mission .name.glyphicon 					{font-size: 40px;}";
    newCssRules += ".mission .name:not(.glyphicon) 				{text-align: center; display: block;}";

    newCssRules += ".mission-list-item-published 				{background-image: none; background: darkgreen;color: lightgreen;}";
    newCssRules += ".list .mission .mission-title-published 	{color: lightgreen;}";
    newCssRules += ".mission-list-item-published .table-bordered * {border-color: lightgreen;}";
    newCssRules += ".mission-list-item-published .button		{color: lightgreen; border-color: lightgreen; background-color: #004d00;}";
    newCssRules += ".mission-list-item-published .button:hover	{background-color: #003300;}";
    newCssRules += ".mission-list-item-published .button .caret	{border-bottom-color: lightgreen;}";

    newCssRules += ".mission-list-item-draft 					{background-image: none; background: #a42e12;color: #f7ba5f;}";
    newCssRules += ".list .mission .mission-title-draft 	{color: #f7ba5f;}";
    newCssRules += ".mission-list-item-draft .table-bordered * {border-color: #f7ba5f;}";
    newCssRules += ".mission-list-item-draft .button		{color: #f7ba5f; border-color: #f7ba5f; background-color: #8a280f;}";
    newCssRules += ".mission-list-item-draft .button:hover	{background-color: #73210d;}";
    newCssRules += ".mission-list-item-draft .button .caret	{border-bottom-color: #f7ba5f;}";

    newCssRules += ".mission-list-item-draft_of_published_mission {background-image: none; background: olive;color: greenyellow;}";
    newCssRules += ".list .mission .mission-title-draft_of_published_mission 	{color: greenyellow;}";
    newCssRules += ".mission-list-item-draft_of_published_mission .table-bordered * {border-color: greenyellow;}";
    newCssRules += ".mission-list-item-draft_of_published_mission .button		{color: greenyellow; border-color: greenyellow; background-color: #666600;}";
    newCssRules += ".mission-list-item-draft_of_published_mission .button:hover	{background-color: #4d4d00;}";
    newCssRules += ".mission-list-item-draft_of_published_mission .button .caret	{border-bottom-color: greenyellow;}";

    newCssRules += ".mission-list-item-submitted				{background-image: none; background: darkgoldenrod;color: gold;}";
    newCssRules += ".list .mission .mission-title-submitted 	{color: gold;}";
    newCssRules += ".mission-list-item-submitted .table-bordered * {border-color: gold;}";
    newCssRules += ".mission-list-item-submitted .button		{color: gold; border-color: gold; background-color: #916a08;}";
    newCssRules += ".mission-list-item-submitted .button:hover	{background-color: #785807;}";
    newCssRules += ".mission-list-item-submitted .button .caret	{border-bottom-color: gold;}";

    newCssRules += ".mission-list-item-disabled 				{background-image: none; background: #6b6b6b;color: red;}";
    newCssRules += ".list .mission .mission-title-disabled	 	{color: red;}";
    newCssRules += ".mission-list-item-disabled .table-bordered * {border-color: red;}";
    newCssRules += ".mission-list-item-disabled .button		{color: red; border-color: red; background-color: #595959;}";
    newCssRules += ".mission-list-item-disabled .button:hover	{background-color: #4d4d4d;}";
    newCssRules += ".mission-list-item-disabled .button .caret	{border-bottom-color: red;}";

    newCssRules += ".mission-list-item-submitted_and_published	{background-image: none; background: olivedrab;color: springgreen;}";
    newCssRules += ".list .mission .mission-title-submitted_and_published 	{color: springgreen;}";
    newCssRules += ".mission-list-item-submitted_and_published .table-bordered * {border-color: springgreen;}";
    newCssRules += ".mission-list-item-submitted_and_published .button		{color: springgreen; border-color: springgreen; background-color: #5c7a1f;}";
    newCssRules += ".mission-list-item-submitted_and_published .button:hover	{background-color: #4d6619;}";
    newCssRules += ".mission-list-item-submitted_and_published .button .caret	{border-bottom-color: springgreen;}";

    newCssRules += ".dropup 									{position: relative;}";
    newCssRules += ".dropup .dropdown-menu						{top: initial; bottom: 30px; left: 0; right: 0; text-align: center;}";
    newCssRules += ".dropdown-menu > li > a 					{cursor: pointer;}";
    newCssRules += ".editor .view 								{width: initial;height: initial;text-align: center;margin: 0;}";
    newCssRules += ".editor .type-view, .editor .name-view  {width: 100%;}";
    newCssRules += ".pagination>li>a 							{background: #0b0c0d;border-color: #5afbea;color: #5afbea; font-size: 18px;}";
    newCssRules += ".pagination>li>a:hover 						{background: #2b2c2d;border-color: #5afbea;color: #5afbea;}"
    newCssRules += ".pagination>.active>a, .pagination>.active>a:hover {background-color: #5afbea;border-color: #5afbea;color: #0b0c0d;}";
    newCssRules += ".type-view .btn.focus, .type-view .btn:focus, .type-view .btn:hover {color: unset;}";
    newCssRules += ".type-view .btn.active.focus, .type-view .btn.active:focus, .type-view .btn.active:hover {color: #ebbc4a;}";
    newCssRules += ".bordered-panel p           {font-size: 20px;}";
    newCssRules += ".stopthat 									{color: red; font-weight: bold;}";
    newCssRules += "input.form-control, textarea.form-control {border: 1px solid #5afbea; background: none; border-radius: 0; color: white;}";
    newCssRules += ".upload-logo .input-row .upload-label {display: block;padding: 0 0 10px;}";
    newCssRules += ".upload-logo .input-row {display: block;}";
    newCssRules += ".upload-logo .input-row .upload-logo-cell, .upload-logo .input-row .clear-logo-button {display: inline-block;padding: 0; max-width: 50%;}";
    newCssRules += "</style>";
    $("head").append(newCssRules);

});

function init() {
    //
    var w = window;
    let tryNumber = 15;

    const initWatcher = setInterval(() => {
        if (tryNumber === 0) {
            clearInterval(initWatcher);
            alert("IMATTC initialisation failed, please refresh the page");
        }
        if (w.angular) {
            let err = false;
            try {
                initAngular();
            } catch (error) {
                clearInterval(initWatcher);
                err = error;
                console.log(error);
            }
            if (!err) {
                try {
                    clearInterval(initWatcher);
                    pageChange()
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
        w.$location = w.$app.injector().get('$location');
        w.$timeout = w.$app.injector().get('$timeout');

        w.$rootScope.$on('$routeChangeStart', function(next, last) {
            setTimeout(() => {
                pageChange()
            }, 500);
        });

        w.$scope = element => w.angular.element(element).scope();
    }

    function pageChange() {
        var loadingElement = $('div.loading-screen');
        var loadingScope = w.$scope(loadingElement);
        if (!loadingScope.hasPendingRequests()) {
            whenItsLoaded()
        } else {
            setTimeout(() => {
                pageChange();
            }, 250);
        }
    }

    function whenItsLoaded() {
        var missionScope = w.$scope($('div.list'));

        if (missionScope) {
            missionListSetup(missionScope);
        } else {
            var editScope = w.$scope($('div.editor'));
            if (editScope) {
                missionEditSetup(editScope);
            }
        }
    }

    function missionEditSetup(editScope) {
        var editStep = editScope.mission.ui.view;

        //Replace breadcrumb with something a bit clearer
        $(".view").empty();
        var newBreadcrumb = "<ul class='pagination'>";

        newBreadcrumb += "<li" + (editScope.IsViewActive(editScope.EditorScreenViews.TYPE) ? " class='active'" : "") + "><a role='button' ng-click='bulletSetView(EditorScreenViews.TYPE)'>Mission Type</a></li>";
        newBreadcrumb += "<li" + (editScope.IsViewActive(editScope.EditorScreenViews.NAME) ? " class='active'" : "") + "><a role='button' ng-click='bulletSetView(EditorScreenViews.NAME)'>Mission Details</a></li>";
        newBreadcrumb += "<li" + (editScope.IsViewActive(editScope.EditorScreenViews.WAYPOINTS) ? " class='active'" : "") + "><a role='button' ng-click='bulletSetView(EditorScreenViews.WAYPOINTS)'>Waypoints</a></li>";
        newBreadcrumb += "<li" + (editScope.IsViewActive(editScope.EditorScreenViews.PREVIEW) ? " class='active'" : "") + "><a role='button' ng-click='bulletSetView(EditorScreenViews.PREVIEW)'>Preview</a></li>";

        newBreadcrumb += "</ul>";

        var compiledBread = $compile(newBreadcrumb)(editScope);
        $(".view").append(compiledBread);

        if (editStep == editScope.EditorScreenViews.TYPE) {
            //Overhauled UI on Mission Type page, including more editorialising on non-linear missions in banners
            $(".type-view .bordered-panel").empty();
            var editCode = "<div class='btn-group btn-group-justified'>";

            editCode += "<div class='btn-group'><button class='btn btn-lg' ng-click='mission.definition._sequential = true; mission.definition._hidden = false' ng-class='{active: mission.definition._sequential && !mission.definition._hidden}'><i class='glyphicon glyphicon-arrow-right'></i>&nbsp;&nbsp;SEQUENTIAL</button></div>";
            editCode += "<div class='btn-group'><button class='btn btn-lg' ng-click='mission.definition._sequential = true; mission.definition._hidden = true' ng-class='{active: mission.definition._sequential && mission.definition._hidden}'><i class='glyphicon glyphicon-eye-close'></i>&nbsp;&nbsp;HIDDEN SEQUENTIAL</button></div>";
            editCode += "<div class='btn-group'><button class='btn btn-lg' ng-click='mission.definition._sequential = false; mission.definition._hidden = false' ng-class='{active: !mission.definition._sequential}'><i class='glyphicon glyphicon-random'></i>&nbsp;&nbsp;ANY ORDER</button></div>";

            editCode += "</div><br />";

            editCode += "<p ng-show='mission.definition._sequential && !mission.definition._hidden'>Agents visit portals and field trip markers in a set order.<br/><br/>Best suited to missions in a banner series, or one-offs with a pre-determined route.</p>"
            editCode += "<p ng-show='mission.definition._sequential && mission.definition._hidden'>Agents visit portals and field trip markers in a set order, but the location of every waypoint beyond the first is hidden, meaning players rely on clues in the waypoint text.<br/><br/>Good for more puzzle-based missions, but please ensure you provide adequate clues for agents to find all the waypoints.</p>"
            editCode += "<p ng-show='!mission.definition._sequential'>Agents visit portals and field trip markers in any order. Excellent for one-off missions where a specific route isn't required, but terrible for missions in banner serieses.<br /><br /><span class='stopthat'>It is strongly advised that if you are making missions for a banner, you set them as Sequential missions - your rating on IngressMosaik will thank you! </span></p>"
            var compiledContent = $compile(editCode)(editScope);
            $(".type-view .bordered-panel").append(compiledContent);
        } else if (editStep == editScope.EditorScreenViews.NAME){
          //Overhauled UI on Mission Name/Image pages
          $(".name-view .bordered-panel").empty();
          var editCode = "<div class='row'><div class='col-sm-8 form-horizontal'><div class='form-group'>";
          editCode += "<label for='missionName' class='col-sm-2 control-label'>Mission Name</label>";
          editCode += "<div class='col-sm-10'><input type='text' id='missionName' ng-model='mission.definition.name' class='form-control' placeholder='Add mission name' ng-class='{\"invalid\": !mission.definition.name}' maxlength='" + editScope.MissionRules.MAX_MISSION_NAME_LENGTH + "'>";
          editCode += "</div></div><div class='form-group'>";
          editCode += "<label for='missionDesc' class='col-sm-2 control-label'>Mission Description</label>";
          editCode += "<div class='col-sm-10'><textarea id='missionDesc' class='form-control' rows='4' ng-model='mission.definition.description' placeholder='Add mission description' ng-class='{\"invalid\": !mission.definition.description}' maxlength='" + editScope.MissionRules.MAX_MISSION_DESCRIPTION_LENGTH + "'></textarea>";
          editCode += "</div></div></div><div class='col-sm-4'";
          editCode += "<div mission-logo-upload max-size='{{LogoParams.MAX_SIZE_BYTES}}' success='logoUploadSuccess' error='logoUploadFailure' pre-post='ensureMissionHasGuid' accept='image/*' type-restriction='image/(gif|jpeg|jpg|png)' mission='mission'></div>";
          editCode += "</div></div>";
          var compiledContent = $compile(editCode)(editScope);
          $(".name-view .bordered-panel").append(compiledContent);
        }

        //Runs pageChange() function when changing between Edit states
        editScope.setView = function(b) {
            editScope.pendingSave && (w.$timeout.cancel(editScope.pendingSave), editScope.pendingSave = null);
            editScope.save(b);
            setTimeout(() => {
                pageChange();
            }, 500);
        }

    }

    function missionListSetup(missionScope) {
        $(".missions-list").empty()
        $(".missions-list").addClass("row");
        missionScope.missions = w.$filter("orderBy")(missionScope.missions, 'definition.name');

        w.$injector.invoke(function($compile) {
            for (var i = 0; i < missionScope.missions.length; i++) {
                // Pass our fragment content to $compile,
                // and call the function that $compile returns with the scope.
                var mission = missionScope.missions[i];
                var missionState = mission.missionListState.toLowerCase();
                var newMissionPanel = "<div class='mission col-sm-6 col-md-3 mission-list-item-" + missionState + "'>";
                newMissionPanel += "<div class='mission-header-container'><div>";
                newMissionPanel += "<img class='mission-image' src='" + (mission.definition.logo_url ? mission.definition.logo_url + "=s60-c" : "/images/button_logo.png") + "'>";
                newMissionPanel += "</div><div>";
                newMissionPanel += "<span class='name mission-title-" + missionState + "'>" + mission.definition.name + "</span>";
                newMissionPanel += "</div><div>";
                newMissionPanel += "<i class='name mission-title-" + missionState + " glyphicon glyphicon-";
                switch (missionState) {
                    case "draft":
                        newMissionPanel += "wrench' title='Unpublished draft mission'";
                        break;
                    case "draft_of_published_mission":
                        newMissionPanel += "wrench' title='Published mission with unpublished edits'";
                        break;
                    case "published":
                        newMissionPanel += "ok' title='Published mission'";
                        break;
                    case "submitted":
                        newMissionPanel += "send' title='Unpublished mission under review'";
                        break;
                    case "submitted_and_published":
                        newMissionPanel += "send' title='Published mission, changes under review'";
                        break;
                }
                newMissionPanel += "></i>";
                newMissionPanel += "</div></div>";
                newMissionPanel += "<span class='name mission-time-" + missionState + "'>" + missionScope.getInfoTime(mission) + "</span>";
                newMissionPanel += "<table class='table table-bordered'";
                if (!mission.stats) {
                    newMissionPanel += " style='width: 20%;' ";
                }
                newMissionPanel += "><tr><td>";
                switch (mission.definition.mission_type) {
                    case "SEQUENTIAL":
                        newMissionPanel += "<i class='glyphicon glyphicon-arrow-right' title='Sequential waypoints'></i>";
                        break;
                    case "HIDDEN_SEQUENTIAL":
                        newMissionPanel += "<i class='glyphicon glyphicon-eye-close' title='Hidden sequential waypoints'></i>";
                        break;
                    case "NON_SEQUENTIAL":
                        newMissionPanel += "<i class='glyphicon glyphicon-random' title='Non-linear waypoints (should not be used if the mission is part of a banner)'></i>";
                        break;
                }
                newMissionPanel += "</td>";
                if (mission.stats) {
                    newMissionPanel += "<td><i class='glyphicon glyphicon-time'></i> " + missionScope.getMissionTimeString(mission) + "</td>";
                    newMissionPanel += "<td><i class='glyphicon glyphicon-thumbs-up'></i> " + missionScope.getMissionRatingString(mission) + "</td>";
                    newMissionPanel += "<td><i class='glyphicon glyphicon-user'></i> " + mission.stats.num_completed + "</td>";
                }
                newMissionPanel += "</tr></table>";
                newMissionPanel += "<div class='dropup'><button class='button action-button dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>Perform Mission Action <span class='caret'></span></button>";
                newMissionPanel += "<ul class='dropdown-menu' aria-labelledby='dropdownMenu1'>"
                if (missionScope.getButton1Title(mission))
                    newMissionPanel += "<li><a role='button' ng-click='button1Clicked(missions[" + i + "])'>" + missionScope.getButton1Title(mission) + "</a></li>";
                if (missionScope.getButton2Title(mission))
                    newMissionPanel += "<li><a role='button' ng-click='button2Clicked(missions[" + i + "])'>" + missionScope.getButton2Title(mission) + "</a></li>";
                newMissionPanel += "</ul></div>"
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
