using System.Reflection;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace ALS.Glance.Web.Ioc.Installers
{
    public class ControllerInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                  Classes.FromAssembly(Assembly.GetExecutingAssembly())
                  .BasedOn<IController>()
                  .WithService.Self()
                  .LifestyleTransient());

        }
    }
}