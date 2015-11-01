using System;
using System.ServiceModel;
using System.ServiceModel.Description;
using ALS.Glance.Models.Core;

namespace ALS.Glance.DataAgents.Core.Components
{
    public class Service<T>
    {
        public static void Use(Action<T> action)
        {
            if (action == null) throw new ArgumentNullException("action");

            var channelFactory = new ChannelFactory<T>("*");
            Use(channelFactory, action);
        }

        public static void Use(Action<T> action, string endpointAddress)
        {
            if (action == null) throw new ArgumentNullException("action");
            if (endpointAddress == null) throw new ArgumentNullException("endpointAddress");

            var channelFactory = new ChannelFactory<T>("*", new EndpointAddress(endpointAddress));
            Use(channelFactory, action);
        }

        public static void Use(Action<T> action, string endpointAddress, string endPointConfigurationName)
        {
            if (action == null) throw new ArgumentNullException("action");
            if (endpointAddress == null) throw new ArgumentNullException("endpointAddress");
            if (endPointConfigurationName == null) throw new ArgumentNullException("endPointConfigurationName");

            var channelFactory = new ChannelFactory<T>(endPointConfigurationName, new EndpointAddress(endpointAddress));
            Use(channelFactory, action);
        }

        public static void Use(Action<T> action, Credentials credentials)
        {
            if (action == null) throw new ArgumentNullException("action");
            if (credentials == null) throw new ArgumentNullException("credentials");

            var channelFactory = new ChannelFactory<T>("*");

            var clientCredentials = channelFactory.Endpoint.Behaviors.Find<ClientCredentials>();
            clientCredentials.UserName.UserName = credentials.Username;
            clientCredentials.UserName.Password = credentials.Password;

            Use(channelFactory, action);
        }

        public static void Use(Action<T> action, Credentials credentials, string endpointAddress)
        {
            if (action == null) throw new ArgumentNullException("action");
            if (credentials == null) throw new ArgumentNullException("credentials");
            if (endpointAddress == null) throw new ArgumentNullException("endpointAddress");

            var channelFactory = new ChannelFactory<T>("*", new EndpointAddress(endpointAddress));

            var clientCredentials = channelFactory.Endpoint.Behaviors.Find<ClientCredentials>();
            clientCredentials.UserName.UserName = credentials.Username;
            clientCredentials.UserName.Password = credentials.Password;

            Use(channelFactory, action);
        }

        private static void Use(ChannelFactory<T> channelFactory, Action<T> action)
        {
            var client = channelFactory.CreateChannel();

            var controlFlag = false;

            try
            {
                action(client);
                ((IClientChannel)client).Close();
                ((IClientChannel)client).Dispose();
                channelFactory.Close();
                controlFlag = true;
            }
            finally
            {
                if (!controlFlag)
                {
                    ((IClientChannel)client).Abort();
                    ((IClientChannel)client).Dispose();
                    channelFactory.Abort();
                }
            }
        }
    }
}