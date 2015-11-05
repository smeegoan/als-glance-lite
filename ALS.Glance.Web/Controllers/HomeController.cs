using System;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Mvc;
using ALS.Glance.Core.Cache;
using ALS.Glance.Core.Security;
using ALS.Glance.DataAgents.Interfaces;
using ALS.Glance.Models;
using ALS.Glance.Models.Core;
using ALS.Glance.Web.Models;
using ALS.Glance.Web.Properties;
using ALS.Glance.Web.Security;
using Microsoft.AspNet.Identity;

namespace ALS.Glance.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IALSGlanceDA _glanceDa;
        private readonly WebApiCredentials _credentials;
        private readonly Settings _settings;
        private readonly string _apiUrl;

        public HomeController(IALSGlanceDA glanceDa, WebApiCredentials credentials, Settings settings)
        {
            _glanceDa = glanceDa;
            _credentials = credentials;
            _settings = settings;
            _apiUrl = settings.ApiUrl;
        }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult UsabilityForm()
        {
            return View();
        }


        [MvcAuthorize(Roles.Admin, Roles.User)]
        public async Task<JavaScriptResult> ApiAuth(CancellationToken ct)
        {
            _credentials.OnBehalfOf = User.Identity.GetUserId();
            //var auth = await WebApiODataContainer.Using(_apiUrl, _credentials)
            //    .AuthenticateAsync(ct);
            var script = string.Format(@"var alsglance = alsglance || {{}}; alsglance.dashboard = alsglance.dashboard || {{}}; alsglance.apiClient =new alsglance.ApiClientImpl({{baseUri: '{1}',authToken: '{0}'}});" +
                                       "alsglance.applicationId='{2}';" +
                                       "alsglance.dashboard.userId='{3}';",
                                        EncodeInBase64(string.Concat(_credentials.UserName, ":", _credentials.Password)),
                                       _apiUrl,
                                       Settings.Default.ApplicationId,
                                       User.Identity.GetUserId());
            return JavaScript(script);
        }

        [MvcAuthorize(Roles.Admin, Roles.User)]
        public async Task<ActionResult> Patients(int? id, CancellationToken ct)
        {
            _credentials.OnBehalfOf = User.Identity.GetUserId();
            if (id == null)
            {
                return await ViewPatients(ct);
            }
            var cache = new ResponseCache<PatientViewModel>(false, DefaultCacheTime.Long, _settings.ResponseCacheEnabled,
                _settings.ResponseCacheDefaultShortTimeInMinutes, _settings.ResponseCacheDefaultLongTimeInMinutes);
            var patientModel = cache.GetValue(Request);
            if (patientModel == null)
            {
                var muscles = await _glanceDa.GetMusclesAsync(_credentials, ct);
                var yearBounds = await _glanceDa.GetYearBoundsAsync(_credentials, id.Value, ct);
                var patient = await _glanceDa.GetPatientAsync(_credentials, id.Value, ct);
                patientModel = new PatientViewModel
                {
                    Name = patient.Name,
                    Keycol = id.Value,
                    YearMax = yearBounds.Max,
                    YearMin = yearBounds.Min,
                    Muscles = muscles.ToArray(),
                };
                cache.SetValue(Request, patientModel);
            }
            patientModel.VersionedSettings = new Tuple<string, string>(string.Empty, "{}");
            return View("Patient", patientModel);
        }
        #region Private Methods

        private static string EncodeInBase64(string valueToEncode)
        {
            var encoding = (Encoding)Encoding.UTF8.Clone();
            encoding.EncoderFallback = EncoderFallback.ExceptionFallback;

            return Convert.ToBase64String(encoding.GetBytes(valueToEncode));
        }

        private async Task<ActionResult> ViewPatients(CancellationToken ct)
        {
            var cache = new ResponseCache<AgeBounds>(false, DefaultCacheTime.Long, _settings.ResponseCacheEnabled,
                _settings.ResponseCacheDefaultShortTimeInMinutes, _settings.ResponseCacheDefaultLongTimeInMinutes);
            var ageBounds = cache.GetValue(Request);
            if (ageBounds == null)
            {
                ageBounds = await _glanceDa.GetAgeBoundsAsync(_credentials, ct);
                cache.SetValue(Request, ageBounds);
            }

            var model = new PatientsViewModel
            {
                AgeMax = Math.Ceiling(ageBounds.Max).ToString(System.Globalization.CultureInfo.InvariantCulture),
                AgeMin = Math.Floor(ageBounds.Min).ToString(System.Globalization.CultureInfo.InvariantCulture),
            };
            return View(model);
        }
        #endregion
    }
}