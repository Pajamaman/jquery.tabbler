# jquery.tabbler
## by David Kennedy
## http://daveden.wordpress.com

### Overview

A tabbler is a link, called the tab, and a content area, called the target. Clicking on the tab toggles the visibility of the target, along with any sibling content areas that are also tabblers.

The HTML should look something like this:

    <a id="someTab">I'm a Tab</a>
    <a id="anotherTab">I'm Another Tab</a>
    <div>
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
    </div>

A call to:

    $("#someTab").tabbler({ target: "someTarget" });

will initialize a tabbler instance.

### Options

#### target - String - Default: null
The id of the content area that should be toggled.

### Notice

I recommend using [Eric Meyer's Reset CSS](http://meyerweb.com/eric/tools/css/reset) to fix the strange jQuery animation behavior. I've included it in the css directory for your convenience.

### To do

* Add open and close methods
* Add alternative animation effects, such as slide in from the left or right, or fade in and out
* Currently, it's necessary to separate the tabs from the targets by placing the targets in a div. This is because clicking on a tab opens the target and closes all of the target's siblings. This is obviously really stupid and I'd like to fix it as soon as I have the time.