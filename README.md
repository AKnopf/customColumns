# customColumns.js
A lightweight jquery plugin that enablse your users to show/hide columns in a table. To the right of each column header, there is a small "close" button, that hides the respective column. If only one column is left, the button changes so that it restores all columns.
This plugin optionally supports cookies, so your users will see their tables as they left them, the next time they come by.

## Usage

Load the script
```js
<script src="path/to/customColumns.js">
```

Look for tables and call `customColumns()`
```js
$(document).ready(function() {
  $('table').customColumns();
});
```

That's all you need for the default behavior. If only one button Now if you want to customize the behavior have a look at the options.

## Options

You can use options, to customize the behavior, when calling `customColumns()` like this:
```js
$(document).ready(function() {
  //This will display the text 'hide' instead of the default 'x'
  $('table').customColumns({'handle' : '<span>hide<span>'});
});
```

There are the following options:

Name | Default | Description
---- | ------- | ------------
`'handle'` | `'<span>x</span>'` | This can be any html code, but it should be in a single tag of any kind
`'restoreHandle'` | `'<span>restore columns</span>'` | Same as `'handle'` but for the restore button. They must be of the same tag type
`'handleType'` | `'span'` | The tag type of the handles. **Keep this consistent with `'handle'` and `'restoreHandle'`!**
`'handleCss'` | `{ position': 'absolute', 'right': '0.5em', 'cursor':pointer', 'transition': 'all 500ms ease-in-out', 'opacity':0.5' }` | You can overwrite only part of those as the objects will get merged
`'handleHoverCss'` | `{ 'opacity': '1' }` | Similar to `'handleCss'`

## Advanced options

If this is not enough customization for you, there are three more advanced options that can be used as easily as the normal options

Name | Default | Description
---- | ------- | ------------
`'selectorHead'` | `'thead td, th'` | You don't have a table but something similar with maybe display:table? Not a problem. You can change the selector by which this plugin finds the table headers.
`'selectorCell'` | `'td, th'` | Same as `'selectorHead'` but for the "cells" of the table in case you don't have an actual table. **THIS IS WORK IN PROGRESS**
`'beforeHide'` | `'function($elem, callback) { return callback(); }'` | A callback for something to do before cells get hidden. $elem is a collection of the cells to be hidden. You can use this to fade out columns like this: `$('table').customColumns({'beforeHide': function($elem, callback) { $elem.stop().fadeOut('slow', callback);};});` When whatever it is you are doing in `'beforeHide'` is done, **you need to call the callback provided as 2nd parameter.** *Even if your code actually hides the cells (as with `'fadeOut()'`), because the plugin needs to keep its state consistent.*
`'afterHide'` | `'function($elem) { return true; }'` | A callback for something to do after cells get hidden. $elem is a collection of the cells to be hidden. For this `'afterHide'`, there is no callback you need to call.

## Setting global defaults
You can change what the defaults are globally with the object
```js
$.fn.customColumns.defaults
 ```
You could use font awesome like this:
```js
$.fn.customColumns.defaults.handle = '<i class="fa fa-close"></i>';
$.fn.customColumns.defaults.restoreHandle = '<i class="fa fa-refresh"></i>'
$.fn.customColumns.defaults.handleType = 'i';
```

## Cookie
You can save the state of the table in a cookie, so your users can see the table as they left it, when they come back. To to that, there are conditions:
- The table must have an id that is globally unique.
- The 'Cookies' object must be available. You can find js-cookies on [Github](https://github.com/js-cookie/js-cookie/blob/master/src/js.cookie.js)

This is the only dependency (other than jquery)

## Settings
You can configure the plugin globally using the object
```js
$.fn.customColumns.settings
```
There are the following settings:

Name | Default | Description
---- | ------- | ------------
`'useCookie'` | true | If you dont want to use the Cookie feature you can simply disable it.
`'cookieNamespace'` | `'jquery.customColumns'` | In case that cookie name is already taken, you can simply change it (however unlikely)

## Size
The gziped source is about 1400 bytes.
