using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ALS.Glance.DataAgents.Core.Interfaces;
using ALS.Glance.Models;
using ALS.Glance.Models.Core;

namespace ALS.Glance.DataAgents.Interfaces
{
    public interface IALSGlanceDA : IDataAgent
    {
        Task<IEnumerable<DimPatient>> GetPatientsAsync(WebApiCredentials credentials, CancellationToken ct);
        Task<DimPatient> GetPatientAsync(WebApiCredentials credentials, int id, CancellationToken ct);

        Task<ApplicationSettings> GetSettingsAsync(WebApiCredentials credentials, string userId, CancellationToken ct);

        Task<AgeBounds> GetAgeBoundsAsync(WebApiCredentials credentials, CancellationToken ct);

        Task<YearBounds> GetYearBoundsAsync(WebApiCredentials credentials, int id, CancellationToken ct);

        Task<IEnumerable<DimMuscle>> GetMusclesAsync(WebApiCredentials credentials, CancellationToken ct);
    }
}
