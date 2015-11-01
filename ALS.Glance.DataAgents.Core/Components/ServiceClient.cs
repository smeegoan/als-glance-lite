using System;
using System.ServiceModel;
using System.Threading.Tasks;

namespace ALS.Glance.DataAgents.Core.Components
{
    public class ServiceClient<TClient, TChannel>
        where TClient : ClientBase<TChannel>
        where TChannel : class
    {
        private readonly TClient _client;
        private event Func<Exception, bool> ErrorHandlers;

        private ServiceClient(TClient client, string username = null, string password = null)
        {
            if (client == null) throw new ArgumentNullException("client");

            if (username != null && password != null && client.ClientCredentials != null)
            {
                client.ClientCredentials.UserName.UserName = username;
                client.ClientCredentials.UserName.Password = password;
            }
            _client = client;
        }

        public ServiceClient<TClient, TChannel> WithErrorHandler(Func<Exception, bool> errorHandler)
        {
            if (errorHandler == null) throw new ArgumentNullException("errorHandler");
            ErrorHandlers += errorHandler;
            return this;
        }

        public ServiceClient<TClient, TChannel> WithErrorHandler(params Func<Exception, bool>[] errorHandlers)
        {
            foreach (var errorHandler in errorHandlers)
                ErrorHandlers += errorHandler;

            return this;
        }

        public void Execute(Action<TClient> action)
        {
            try
            {
                action(_client);
                _client.Close();
            }
            catch (Exception e)
            {
                _client.Abort();
                if (ErrorHandlers == null || !ErrorHandlers(e))
                    throw;
            }
        }

        public TResult Execute<TResult>(Func<TClient, TResult> func)
        {
            try
            {
                var ret = func(_client);
                _client.Close();
                return ret;
            }
            catch (Exception e)
            {
                _client.Abort();
                if (ErrorHandlers == null || !ErrorHandlers(e))
                    throw;
                return default(TResult);
            }
        }

        public Task<TResult> Execute<TResult>(Func<TClient, Task<TResult>> func)
        {
            try
            {
                return func(_client)
                    .ContinueWith(antecedent =>
                    {
                        try
                        {
                            if (antecedent.IsFaulted)
                                throw antecedent.Exception ?? new Exception("Unknown Exception");
                            _client.Close();
                            return antecedent.Result;
                        }
                        catch (Exception e)
                        {
                            _client.Abort();
                            if (ErrorHandlers == null || !ErrorHandlers(e))
                                throw;
                            return default(TResult);
                        }
                    });//.ConfigureAwait(false);
            }
            catch (Exception e)
            {
                _client.Abort();
                if (ErrorHandlers == null || !ErrorHandlers(e))
                    throw; 

                var source = new TaskCompletionSource<TResult>();
                source.TrySetResult(default(TResult));
                return source.Task;
            }
        }

        #region Factory methods

        public static ServiceClient<TClient, TChannel> Using(TClient client)
        {
            return Using(client, null, null);
        }

        public static ServiceClient<TClient, TChannel> Using(TClient client, string username, string password)
        {
            return new ServiceClient<TClient, TChannel>(client, username, password);
        }

        #endregion
    }
}