Introduction
============

A responsive Plone Theme (based on sunburst).

CSS3theme is a resposive (or  autoadaptative, as you prefer) theme for Plone 4 that automatically adapts to the display of the device you're using to surf the Web. This  means that, with CSS3theme, you have one single theme that works for every mobile device available in the market.

Screenshot:

.. figure:: https://github.com/redomino/redomino.css3theme/raw/master/docs/resources/css3theme.jpg 
   :align:   center

   mobile view

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
    - scrollTop: a button that helps to scroll on mobile

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
    - contextual classes: customize the python script
      css3theme_get_contextual_classes (skin layer) to add custom contextual
      classes
    - user defined classes (you can add these classes on every page
      using the plone registry - redomino.css3theme.classes)
    - user defined body classes: the user can attach classes to the body using a 
      cookie. Valid classes are the ones in the plone registry entry:
      redomino.css3theme.useraddableclasses. The user can add, remove classes
      using the "@@userbodyclasses" view (add, remove, toggle, reset).
      examples:

          - @@userbodyclasses?add=class1,class2 add those classes
          - @@userbodyclasses?remove=class1,class2 remove those classes
          - @@userbodyclasses?toggle=class1,class2 toggle those classes
          - @@userbodyclasses?reset= remove all classes

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

How to build a theme based on redomino.css3theme
------------------------------------------------
1 - add the dependency on your setup.py (I suggest to pin the version)::

    install_requires=[
         'setuptools',
         'redomino.css3theme==1.5.5',  

2 - your layer interface must inherit from the one of css3theme::

    from redomino.css3theme.browser.interfaces import IThemeSpecific as ICss3theme
    class IThemeSpecific(ICss3theme):
       """ """

3 - your skin layer must inherit from css3theme (profiles/default/skins.xml)::

    ...
     <skin-path name="My theme" based-on="css3theme">
      <layer name="my_theme"
         insert-after="custom"/>
     </skin-path>
    ...

4 - viewlets configuration must inherit from css3theme (profiles/default/viewlets.xml)::

    ...
     <order manager="plone.portalfooter" skinname="My theme"
           based-on="css3theme">
     </order>
    ...
     <hidden manager="plone.portalheader" skinname="My theme"
            based-on="css3theme">
     </hidden>
    ...

5 - css3theme must be installed while you install your theme (profiles/default/metadata.xml)::

    <?xml version="1.0"?>
    <metadata>
      <version>1000</version>
        <dependencies>
            <dependency>profile-redomino.css3theme:default</dependency>
        </dependencies>
    </metadata>


