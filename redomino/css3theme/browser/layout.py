from plone.app.layout.globals.layout import LayoutPolicy as LayoutPolicyOriginal
from plone.app.layout.navigation.interfaces import INavigationRoot
from zope.component import getMultiAdapter
from Acquisition import aq_base, aq_inner, aq_parent

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
        
        return body_class
