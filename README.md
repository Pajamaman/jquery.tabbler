# jquery.tabbler
## by David Kennedy
## http://daveden.wordpress.com

### Overview

A tabbler is a link, called the tab, and a content area, called the target. Clicking on the tab toggles the visibility of the target, along with any sibling tabbler targets.

The HTML should look something like this:

    <a id="someTab">I'm a Tab</a>
    <a id="anotherTab">I'm Another Tab</a>
    <div id="someTarget">
        <p>I'm a Target</p>
        <div>
            Blah blah blah...
        </div>
    </div>
    <div id="anotherTarget">
        <p>I'm Another Target</p>
        <div>
            Blah blah blah...
        </div>
    </div>

A call to:

    $("#someTab").tabbler({ target: "someTarget" });

will initialize a tabbler instance.

### Options

#### target - String - Default: null
The id of the target that should be toggled when the tab is clicked.

### To do

* Add alternative animation effects, such as slide in from the left or right, or fade in and out