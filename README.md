# IMATTC
A userscript overhaul for the [Ingress Mission Authoring Tool](https://mission-author-dot-betaspike.appspot.com/).

In order to use this, you'll need a browser with a userscript manager, such as [Tampermonkey](https://tampermonkey.net/), and an [Ingress](https://ingress.com/) user account eligible to create missions.

[Download and Install](https://github.com/andyjennings314/IMATTC/raw/master/IMATTC.user.js)

**IMATTC is not currently supported in Greasemonkey.** It is suggested you use this Tampermonkey for now. If you have experience working with scripts in Greasemonkey, [I would not be averse to some help fixing this](https://github.com/andyjennings314/IMATTC/issues/9).

## Getting Started

When you first load the mission editor with IMATTC installed, you'll find all your missions, sorted alphabetically.

![alt text](https://github.com/andyjennings314/IMATTC/raw/master/img/screen1.PNG "Screenshot 1")

You can easily make use of the mission editor like this (just use the "Perform Mission Actions" button to pull them up), but you may want to use the categories to sort your missions into banners, or other groupings. First, hit the "Create New Category" button, and choose a name:

![alt text](https://github.com/andyjennings314/IMATTC/raw/master/img/screen2.PNG "Screenshot 2")

The script will create your new category, and automatically drop all your other missions into "Unsorted Missions". The next step is to add missions to your categories, and this has been made super easy in the latest version of this script - just click and drag the missions you want into the category! You can even click and drag them to reorder their default sorting within the category.

![alt text](https://github.com/andyjennings314/IMATTC/raw/master/img/screen5.PNG "Screenshot 5")

Lastly, there's even a button at the top of each category, to preview its contents as a banner:

![alt text](https://github.com/andyjennings314/IMATTC/raw/master/img/screen6.PNG "Screenshot 6")

## Features
- Total overhaul of the main mission listing, featuring:
  - Better use of screen space
  - More distinct colouration and iconography for mission status
  - Consistent mission sorting criteria, including user-defined criteria
  - Ability to preview missions, both in mission editor and Ingress Intel map
- User-created categories for missions, including image and route preview functionality, and drag-and-drop mission sorting and reordering.
- Drag-and-drop waypoint reordering in Waypoint view
- Minor UI enhancements to mission creation/editing


## Upcoming features
- Export to [IngressMosaik](https://ingressmosaik.com) functionality
- Additional mission sort criteria
- Searching missions

## Release History
- 1.7.0: Enabled drag-and-drop moving of missions between categories
- 1.6.0: Enabled waypoint reordering on Waypoint view.
- 1.5.4: Enabled exporting and importing category data. Ability to categorise missions from Preview Mission step.
- 1.4.0: Added ability to preview route of missions in category, including distance and duration.
- 1.3.0: Added ability to preview missions using mission editor. Laid groundwork for previewing banner routes. Refactored overall mission status counts
- 1.2.0: Added sorting criteria for categories, uncategorised, and all-when-there's-no-categories
- 1.1.0: Refactored how categories are stored on the client side, to prepare for sorting and drag/drop
- 1.0.0: Some CSS changes, attempt to solve issues with Greasemonkey.
- 0.4.4: "Preview as banner" button for categories. Missions that are live contain a link to the mission in the Intel map.
- 0.4.3: Fixed transition while loading in reworked pages. Mission backgrounds now dark grey, former background colours moved to mission borders. Assorted CSS fixes.
- 0.4.2: Implemented custom category feature - user can create custom categories, and add missions to them.
- 0.3.5: Mission actions check appropriate actions exist. Overhaul on Mission Type and Mission Name pages for better layout.
- 0.3.4: Preparation for beta testing. Page changes now check variable for page load to confirm page transition. Adding better breadcrumb to Edit Mission pages. Added warning about Any Order missions when selected as Mission Type. Better handing for mission images. CSS fixes.
- 0.3.3: All mission action buttons now match mission status colour schemes. Mission type on overview page now uses glyphicons.
- 0.3.1 - 0.3.2: Mission details table border colours and some mission action button colours now match mission status colour schemes.
- 0.2.2: Init() now runs on $routeChangeStart attached to rootScope, removed custom header element.
- 0.2.1: Header element now runs init() to reload mission overview. Better script load fail message.
- pre-0.2.1: Check commits on GitHub for more information.
