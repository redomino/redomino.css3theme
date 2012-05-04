from plone.app.layout.globals.layout import LayoutPolicy as LayoutPolicyOriginal
from plone.app.layout.navigation.interfaces import INavigationRoot
from zope.component import getMultiAdapter, getUtility
from Acquisition import aq_base, aq_inner, aq_parent
from plone.registry.interfaces import IRegistry


class LayoutPolicy(LayoutPolicyOriginal):

    def bodyClass(self, template, view):
        """Returns the CSS class to be used on the body tag.
        """
        body_class = LayoutPolicyOriginal.bodyClass(self, template, view)

        columns = []
        if self.have_portlets('plone.leftcolumn', view):
            columns.append('-one')
        if self.have_portlets('plone.rightcolumn', view):
            columns.append('-two')
        
        column_class = columns and ' has-columns%s' % ''.join(columns) or ' has-no-columns'
        body_class += column_class
        
        context = aq_inner(self.context)

        context_state = getMultiAdapter(
            (self.context, self.request), name=u'plone_context_state')

        if context_state.is_default_page():
            is_nav_root = INavigationRoot.providedBy(aq_base(aq_parent(context)))
        else:
            is_nav_root = INavigationRoot.providedBy(context)
        
        if is_nav_root:
            body_class += ' navigation-root'

        portal_state = getMultiAdapter(
            (context, self.request), name=u'plone_portal_state')

        if portal_state.anonymous():
            body_class += ' is-anonymous'

        # add classes from the registry
        registry = getUtility(IRegistry)
        classes = registry['redomino.css3theme.classes']
        if classes:
            body_class += ' %s' % ' '.join(classes)

        return body_class
