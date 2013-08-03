About
=====

jQuery ESI is a jQuery plugin to process ESI include and remove tags in the
browser.


Usage
=====

Simple approach
---------------

```
$().esiTags().handleESI();
```

Function description
--------------------

The method ```.esiTags()``` traverses a jQuery object collection, and returns a
new jQuery object collection containing any child esi:include and esi:remove
elements.

The method ```.handleESI()``` should only be invoked on a collection that just
contains esi:include or esi:remove elements. This method will remove the
contents of esi:remove tags, and make ajax callbacks for the contents of the
esi:include tags, replacing them with the returned data, if the ajax request is
successful.


