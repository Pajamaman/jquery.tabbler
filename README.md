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

#### panelId - String - Default: null
Set whether or not the tabbler should open to the panel with the specified ID when the page loads.

Example:

    $("#tabs").tabbler({ panelId: "tabs-1" });

#### play - Boolean - Default: false
Set whether or not the tabbler should automatically advance through the panels.

Example:

    $("#tabs").tabbler({ play: true });

#### playSpeed - Integer - Default: 5000
Set the frequency that the tabbler should automatically advance through the panels when the play option is set to true.

Example:

    $("#tabs").tabbler({ play: true, playSpeed: 2000 });

### Methods

#### open - .tabbler("open", options)
Opens the tabbler to the panel with the specified ID.

Options:

    panelId - String - Default: The ID of the first panel in the tabbler
    Set the ID of the panel the tabbler should open to.

Example:

    $("#tabs").tabbler("open", { panelId: "tabs-1" });

#### close - .tabbler("close")
Closes the tabbler.

Options:

    There are no options for this method. It does however accept a callback function.

Example:

    $("#tabs").tabbler("close", function() {
        // Do something else
    });

#### play - .tabbler("play")
Causes the tabbler to automatically advance through the panels.

Options:

    playSpeed - Integer - Default: 5000
    Set the frequency that the tabbler should automatically advance through the panels.

Example:

    $("#tabs").tabbler("play", { playSpeed: 2000 });

### To do

* Add alternate animation effects, such as slide in from the left or right, or fade in and out
* Add option to loop through the tabs like a slideshow