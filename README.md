This module converts streams of XML to streams of JS objects. Unlike other
SAX modules, it doesn't give you every tag and text node seperately, but lets you
specify tag names you want to filter for. When this module encounters a tag with
that name, its content will be collected until the closing tag was reached, and
then you will receive the tag with all its attributes and children in one
object.

Compiling
=========
To compile the `.coffee` files to Javascript, use `cake build`. You will need
[Coffeescript](http://coffeescript.org/) for that.

Installing from NPM
===================
You can install this module from npm using `npm install halfstreamxml`.
