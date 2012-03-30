# jquery.tabbler
## by David Kennedy
## http://daveden.wordpress.com

### Overview

A tabbler is a list of tabs that each correspond to a content area, called a panel. Clicking on a tab toggles the visibility of the corresponding panel, along with any sibling panels.

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
Set whether or not the tabbler height should remain constant when the active tab changes.

Example:

    $("#tabs").tabbler({ setHeight: true });

#### panelId - String - Default: null
Set whether or not the tabbler should open to the panel with the specified ID when the page loads.

Example:

    $("#tabs").tabbler({ panelId: "tabs-1" });

#### effect - String - Default: "toggle"
Set the effect the tabbler should use when the active tab changes.

Example:

    $("#tabs").tabbler({ effect: "slide" });

#### play - Boolean - Default: false
Set whether or not the tabbler should automatically advance through the panels.

Example:

    $("#tabs").tabbler({ panelId: "tabs-1", play: true });

#### playSpeed - Integer - Default: 5000
Set the frequency that the tabbler should automatically advance through the panels when the play option is set to true.

Example:

    $("#tabs").tabbler({ panelId: "tabs-1", play: true, playSpeed: 2000 });

#### pauseHover - Boolean - Default: false
Set whether or not the tabbler should pause when the mouse cursor hovers over it and the play option is set to true.

Example:

    $("#tabs").tabbler({ panelId: "tabs-1", play: true, pauseHover: true });

### Methods

setHeight()
autoOpen()
toggle()
slide()
play()

### To do

* Add prevTab() method
* Finish writing the documentation
* Fix bug where a tabbler using the slide method must have setHeight and panelId options set to something other than their default values