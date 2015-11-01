using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ALS.Glance.Web.Security
{
    public class MvcAuthorizeAttribute : AuthorizeAttribute
    {
        private MvcAuthorizeAttribute(string[] roles)
        {
            Roles = string.Join(",", roles);
        }
        public MvcAuthorizeAttribute() : this(new string[0]) { }

        public MvcAuthorizeAttribute(string role) : this(new[] { role }) { }

        public MvcAuthorizeAttribute(string role1, string role2) : this(new[] { role1, role2 }) { }

        public MvcAuthorizeAttribute(string role1, string role2, string role3) : this(new[] { role1, role2, role3 }) { }

        public MvcAuthorizeAttribute(string role1, string role2, string role3, string role4) : this(new[] { role1, role2, role3, role4 }) { }

    }
}