# IMATTC
A userscript overhaul for the [Ingress Mission Authoring Tool](https://mission-author-dot-betaspike.appspot.com/).

In order to use this, you'll need a browser with a userscript manager, such as [Tampermonkey](https://tampermonkey.net/), and an [Ingress](https://ingress.com/) user account eligible to create missions.

[Download and Install](https://github.com/andyjennings314/IMATTC/raw/master/IMATTC.user.js)

**IMATTC is not currently supported in Greasemonkey.** It is suggested you use this Tampermonkey for now. If you have experience working with scripts in Greasemonkey, [I would not be averseto some help fixing this](https://github.com/andyjennings314/IMATTC/issues/9).

## Features
- Total overhaul of the main mission listing, featuring:
  - Better use of screen space
  - More distinct colouration and iconography for mission status
  - Consistent mission ordering (missions are always sorted by mission name)
  - Intel link to published missions
- User-created categories for missions, including "preview as banner" functionality.
- Minor UI enhancements to mission creation/editing

## Upcoming features
- Drag-and-drop waypoint reordering in Waypoint view
- Drag-and-drop functionality for custom categories
- Extra options for filtering/searching missions

## Release History
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
