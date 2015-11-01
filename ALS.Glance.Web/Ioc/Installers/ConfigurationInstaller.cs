using System.Reflection;
using System.Web.Http.Controllers;
using ALS.Glance.DataAgents.Implementations;
using ALS.Glance.DataAgents.Interfaces;
using ALS.Glance.Models.Core;
using ALS.Glance.Web.Properties;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace ALS.Glance.Web.Ioc.Installers
{
    public class ConfigurationInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IALSGlanceDA>()
                    .ImplementedBy<ALSGlanceDA>()
                    .DynamicParameters(
                        (k, d) =>
                        {
                            var s = k.Resolve<Settings>();
                            d["apiUrl"] = s.ApiUrl;
                        })
                    .LifestyleSingleton(),
                Component.For<Settings>()
                    .UsingFactoryMethod(() => Settings.Default)
                    .LifestyleSingleton(),
                Component.For<WebApiCredentials>()
                    .Named("Credentials")
                    .DynamicParameters(
                        (k, d) =>
                        {
                            var s = k.Resolve<Settings>();
                            d["UserName"] = s.User;
                            d["Password"] = s.Password;
                            d["ApplicationId"] = s.ApplicationId;
                        })
                    .LifestyleSingleton()
                );
        }
    }
}