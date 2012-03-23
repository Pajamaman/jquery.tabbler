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

### To do

* Add alternate animation effects, such as slide in from the left or right, or fade in and out