using System;
using System.Net;
using ALS.Glance.Models.Core;
using Simple.OData.Client;

namespace ALS.Glance.DataAgents
{
    internal static class ODataExtensionMethods
    {
        public static ODataClientSettings ToSettings(this WebApiCredentials credentials)
        {
            var settings = new ODataClientSettings
            {
                Credentials = new NetworkCredential(credentials.UserName,
                    credentials.Password),
                BeforeRequest = requestMessage => {
                    requestMessage.Headers.Accept.Clear();
                    requestMessage.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    requestMessage.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/xml"));
                }
            };
            return settings;
        }

        public static ODataClientSettings WithUrl(this ODataClientSettings settings,string url)
        {
            settings.BaseUri = new Uri(url);         
            return settings;
        }
    }
}
