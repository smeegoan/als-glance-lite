using System;
using System.Web.Mvc;
using System.Web.Routing;
using Castle.Windsor;

namespace ALS.Glance.Web.Ioc.Factories
{
    public class WindsorControllerFactory : DefaultControllerFactory
    {
        private const string CouldNotResolveTheControllerException = "Failed to resolve the controller of type ";


        private readonly IWindsorContainer _container;

        public WindsorControllerFactory(IWindsorContainer container)
        {
            if (container == null) throw new ArgumentNullException("container");

            _container = container;
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            //  if controller type is invalid, execute default
            if (controllerType == null || !typeof (IController).IsAssignableFrom(controllerType))
                return base.GetControllerInstance(requestContext, controllerType);

            try
            {
                return (IController) _container.Resolve(controllerType);
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(
                    string.Concat(CouldNotResolveTheControllerException, controllerType.FullName), e);
            }
        }

        public override void ReleaseController(IController controller)
        {
            var disposable = controller as IDisposable;
            if (disposable != null)
                disposable.Dispose();

            _container.Release(disposable);

        }
    }
}