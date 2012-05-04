Introduction
============

A responsive Plone Theme (based on sunburst).

CSS3theme is a resposive (or  autoadaptative, as you prefer) theme for Plone 4 that automatically adapts to the display of the device you're using to surf the Web. This  means that, with CSS3theme, you have one single theme that works for every mobile device available in the market.

Useful stuff
============

- Preset media queries for the most useful screen sizes:

    - wider than 980 px (desktop)
    - between 980px and 650 px (tablet landscape)
    - between 650px and 480px (tablet portrait and phone landscape)
    - narrower than 480px (phone portrait)

- Javascript goodies

    - Manage the plone columns with two buttons
    - added "decomment" and "doWhenVisible". Two useful jquery plugins.
      They permit to decomment portions of html and run javascript code based
      on the screen size

- Tinymce mobile integration

    - added a class for contents to be hidden in mobile

- Modernizr integration (http://modernizr.com/)

    - this adds classes useful to style your site according to the browser
      capabilities

- Addictional classes and plone classes

    - js/no-js class (detect while the javascript is enabled)
    - oldie/lt-ie9/lt-ie8/lt-ie7 (detect the versione of Internet explorer)
    - has-no-columns/has-column-one/has-column-two/has-column-one-two
      (detect the number of columns)
    - is-anonymous (detect whether a user is anonymous)
    - navigation-root (detect if a page is the navigation root)
    - user defined classes (you can add these classes on every page
      using the plone registry - redomino.css3theme.classes)


Compatibility testing: desktop
------------------------------

Perfect:

- firefox 3.6 - 13a
- chrome 18 
- opera 11
- IE 7-8-9 (degrades gracefully)

not supported: IE6 (not fully supported by Plone sunburst theme)

Compatibility testing: mobile and tablet
----------------------------------------

Perfect:

- tablet android 2.2 (archos 70) portrait
- tablet android 2.2 (archos 70) landscape
- tablet android 4 (asus transformer) portrait
- tablet android 4 (asus transformer) landscape
- cell android 2.2 - 2.3 (htc desire hd, htc grafia) portrait
- cell android 2.2 - 2.3 (htc desire hd, htc grafia) landscape
- ipad2 landscape
- ipad2 portrait
- iphone 3g portrait
- iphone 3g landscape
- iphone 4 portrait
- iphone 4 landscape
- Iphone 2 portrait
- Iphone 2 landscape
- blackberry os 6

Almost perfect (too small)

- symbian (5800) s60 portrait
- symbian (5800) s60 landscape

Not yet tested:

- blackberry os 5
- windowsphone7


