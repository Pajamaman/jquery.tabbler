# jquery.tabbler
## by David Kennedy
## http://daveden.wordpress.com

### Overview

A tabbler is a list of tabs followed by a series of panels. Clicking on or hovering over a tab activates the tab and its associated panel. If a tab is activated while another tab is active, the active tab becomes inactive along with its associated panel.

The HTML should look something like this:

    <div id="tabs">
        <ul>
            <li>
                <a href="#tabs-1">Tab 1</a>
            </li>
            <li>
                <a href="#tabs-2">Tab 2</a>
            </li>
            <li>
                <a href="#tabs-3">Tab 3</a>
            </li>
        </ul>
        <div id="tabs-1">
            Blah blah blah...
        </div>
        <div id="tabs-2">
            Blah blah blah...
        </div>
        <div id="tabs-3">
            Blah blah blah...
        </div>
    </div>

A call to:

    $("#tabs").tabbler();

will initialize a tabbler instance.

### Options

#### event - String - Default: "click"
The event that causes the active tab to change. Possible values are "click" or "mouseover."

Example:

    $("#tabs").tabbler({ event: "mouseover" });

#### effect - String - Default: "toggle"
The animation effect that occurs when the active tab changes. Possible values are "toggle" or "slide."

Example:

    $("#tabs").tabbler({ effect: "slide" });

#### floating - Boolean - Default: false
If this option is set to true, the active panel will float over the contents of the page. If set to false, the contents of the page will be shifted vertically to make room for the active panel.

Example:

    $("#tabs").tabbler({ floating: true });

#### selected - String - Default: null
If this option is set, the active panel will be set to the panel with the specified ID when the page loads along with its associated tab.

Example:

    $("#tabs").tabbler({ selected: "tabs-1" });

#### play - Boolean - Default: false
If this option is set to true, the active tab will automatically change at the interval set by the playSpeed option.

Example:

    $("#tabs").tabbler({ play: true });

#### playSpeed - Integer - Default: 5000
The frequency with which the active tab automatically changes when the play option is set to true.

Example:

    $("#tabs").tabbler({ play: true, playSpeed: 2000 });

#### pauseHover - Boolean - Default: false
If this option is set to true, the active tab will not automatically change while the user's cursor is hovering over the tabbler when the play option is set to true.

Example:

    $("#tabs").tabbler({ play: true, pauseHover: true });

### Methods

#### toggle
Changes the active panel to the panel with the specified ID using the toggle effect.

Options:

* panelId - String - Default: null

Example:

    $("#tabs").tabbler("toggle", { panelId: "tabs-1" });

#### slide
Changes the active panel to the panel with the specified ID using the slide effect.

Options:

* panelId - String - Default: null

Example:

    $("#tabs").tabbler("slide", { panelId: "tabs-1" });

#### play
Causes the tabbler to automatically advance through the panels.

Options:

* effect - String - Default: "toggle"
* playSpeed - Integer - Default: 5000
* pauseHover - Boolean - Default: false

Example:

    $("#tabs").tabbler("play", { effect: "slide", playSpeed: 2000, pauseHover: true });

#### nextTab
Causes the tabbler to advance to the next inactive panel.

Options:

* effect - String - Default: "toggle"

Example:

    $("#tabs").tabbler("nextTab", { effect: "slide" });

### Credits

High resolution textures provided by [CG Textures](http://www.cgtextures.com/).