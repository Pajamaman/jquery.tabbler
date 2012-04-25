# jquery.tabbler
## by David Kennedy
## http://daveden.wordpress.com

### Overview

A tabbler is a list of tabs followed by a series of panels. Clicking on a tab changes the active panel to the corresponding panel of the tab, set by its href attribute.

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

#### setHeight - Boolean - Default: false
If this option is set to true, the tabbler height will remain constant when the active panel changes.

Example:

    $("#tabs").tabbler({ setHeight: true });

#### panelId - String - Default: null
If this option is set, the tabbler will open to the panel with the specified ID when the page loads.

Example:

    $("#tabs").tabbler({ panelId: "tabs-1" });

#### effect - String - Default: "toggle"
The animation effect that the tabbler should use when the active panel changes. Note: The setHeight option should be set to true when this option is set to slide.

Example:

    $("#tabs").tabbler({ effect: "slide", setHeight: true });

#### play - Boolean - Default: false
If this option is set to true, the tabbler will automatically advance through the panels.

Example:

    $("#tabs").tabbler({ play: true });

#### playSpeed - Integer - Default: 5000
The frequency with which the tabbler should automatically advance through the panels when the play option is set to true.

Example:

    $("#tabs").tabbler({ play: true, playSpeed: 2000 });

#### pauseHover - Boolean - Default: false
If this option is set to true, the tabbler will pause when the mouse cursor hovers over it and the play option is set to true.

Example:

    $("#tabs").tabbler({ play: true, pauseHover: true });

### Methods

#### setHeight
Sets the height of the tabbler to the height of its tallest panel.

Example:

    $("#tabs").tabbler("setHeight");

#### setActive
Adds the active class to the panel with the specified ID and its corresponding tab.

Options:

* panelId - String - Default: The ID of the first panel in the tabbler

Example:

    $("#tabs").tabbler("setActive", { panelId: "tabs-1" });

#### toggle
Changes the active panel to the panel with the specified ID using the toggle effect.

Options:

* panelId - String - Default: The ID of the first inactive panel in the tabbler following the currently active panel, or the first panel in the tabbler if there is no currently active panel.

Example:

    $("#tabs").tabbler("toggle", { panelId: "tabs-1" });

#### slide
Changes the active panel to the panel with the specified ID using the slide effect.

Options:

* panelId - String - Default: The ID of the first inactive panel in the tabbler following the currently active panel, or the first panel in the tabbler if there is no currently active panel.

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

### To do

* Add an option to allow the tabbler to overlap page contents instead of shifting them vertically when the active panel changes.

### Issues

* The setHeight option should be set to true when the effect option is set to slide. Otherwise, the tabbler height will be equal to the sum of the heights of the panels.