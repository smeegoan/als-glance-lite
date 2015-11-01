using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using ALS.Glance.Web.Ioc;
using ALS.Glance.Web.Ioc.Factories;
using Castle.Windsor;

namespace ALS.Glance.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private IWindsorContainer _container;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //required to allow usability tests, ALLOW-FROM was not implemented because it is not supported by all browsers
            //https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options
            AntiForgeryConfig.SuppressXFrameOptionsHeader = true;

            //  IoC
            _container = IoCManager.NewContainer();
            ControllerBuilder.Current.SetControllerFactory(new WindsorControllerFactory(_container));         
        }
    }
}
