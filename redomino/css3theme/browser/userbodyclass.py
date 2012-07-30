# Authors: Maurizio Lupo <maurizio.lupo@redomino.com> and contributors (see docs/CONTRIBUTORS.txt)
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 2 as published
# by the Free Software Foundation.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
# 02111-1307, USA.

from Products.Five.browser import BrowserView
from zope.component import getUtilitiesFor, getUtility
from plone.registry.interfaces import IRegistry

from utility import str2set, set2str

class UserBodyClasses(BrowserView):

    def modify(self, add = None, remove = None, toggle = None, reset = False):
        registry = getUtility(IRegistry)

        useraddableclasses = set(registry.get('redomino.css3theme.useraddableclasses', []))

        if not reset:
            userclasses = str2set(self.request.cookies.get('redomino.css3theme.userclasses', None))      
        else:
            userclasses = set()


        def addfunc(userclasses, classes):
            userclasses |= classes

        def removefunc(userclasses, classes):
            userclasses -= classes

        def togglefunc(userclasses, classes):
            for c in classes:
                if c in userclasses:
                    userclasses.remove(c)
                else:
                    userclasses.add(c)

        for func in ['add', 'remove', 'toggle']:
            classes = locals()[func]
            if not classes:
                continue

            classes = classes & useraddableclasses
            locals()['%sfunc' % func](userclasses, classes)

        if userclasses:
            self.request.response.setCookie('redomino.css3theme.userclasses', set2str(userclasses), path="/")
        else:
#            import time
#            from email.Utils import formatdate
#            expiration_seconds = time.time()# + (5*60*60) # 5 hours from now
#            expires = formatdate(expiration_seconds, usegmt=True) 

#            self.request.response.setCookie('redomino.css3theme.userclasses', '', expires=expires)
#            self.request.response.setCookie('redomino.css3theme.userclasses', None,  path = '/', max_age = 0)
            self.request.response.setCookie('redomino.css3theme.userclasses', "None", path="/")
#            self.request.response.expireCookie('redomino.css3theme.userclasses') 


    def __call__(self):
        if self.request.form:
            form = self.request.form

            add = str2set(form.get('add', None))
            remove = str2set(form.get('remove', None))
            toggle = str2set(form.get('toggle', None))
            reset = 'reset' in form
            
            self.modify(add, remove, toggle, reset)

        self.request.RESPONSE.redirect(self.context.absolute_url())

