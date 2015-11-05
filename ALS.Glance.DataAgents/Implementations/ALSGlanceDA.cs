using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ALS.Glance.DataAgents.Interfaces;
using ALS.Glance.Models;
using ALS.Glance.Models.Core;
using Simple.OData.Client;

namespace ALS.Glance.DataAgents.Implementations
{
    public class ALSGlanceDA : IALSGlanceDA
    {
        private readonly string _apiUrl;

        public ALSGlanceDA(string apiUrl)
        {
            _apiUrl = apiUrl;
        }

        public async Task<IEnumerable<DimPatient>> GetPatientsAsync(WebApiCredentials credentials, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            return await new ODataClient(credentials.ToSettings().WithUrl(_apiUrl))
                .For<DimPatient>()
                .FindEntriesAsync(ct);
        }


        public async Task<DimPatient> GetPatientAsync(WebApiCredentials credentials, int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            return await new ODataClient(credentials.ToSettings().WithUrl(_apiUrl))
                .For<DimPatient>()
                .Key(id)
                .FindEntryAsync(ct);
        }

        public async Task<ApplicationSettings> GetSettingsAsync(WebApiCredentials credentials, string userId, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            return await new ODataClient(credentials.ToSettings().WithUrl(_apiUrl))
              .For<ApplicationSettings>()
              .Filter(e => e.ApplicationId == credentials.ApplicationId && e.UserId == userId)
              .FindEntryAsync(ct);
        }

        public virtual async Task<AgeBounds> GetAgeBoundsAsync(WebApiCredentials credentials, CancellationToken ct)
        {        
            var result= await new ODataClient(credentials.ToSettings().WithUrl(_apiUrl))
                .Unbound<D>()
                .Function("GetAgeBounds")
                .ExecuteAsSingleAsync(ct);
            return result.GetAgeBounds;
        }

        public virtual async Task<YearBounds> GetYearBoundsAsync(WebApiCredentials credentials, int id, CancellationToken ct)
        { 
            var result= await new ODataClient(credentials.ToSettings().WithUrl(_apiUrl))
                .Unbound<D>()
                .Function("GetYearBounds")
                .Set(new {Keycol= id})
                .ExecuteAsSingleAsync(ct);
            return result.GetYearBounds;
        }

        public async Task<IEnumerable<DimMuscle>> GetMusclesAsync(WebApiCredentials credentials, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            return await new ODataClient(credentials.ToSettings().WithUrl(_apiUrl))
             .For<DimMuscle>()
             .FindEntriesAsync(ct);
        }

    }
}
