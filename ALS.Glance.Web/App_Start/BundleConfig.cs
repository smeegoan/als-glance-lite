using System.Web;
using System.Web.Optimization;

namespace ALS.Glance.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery-ui-*"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/commonjs").Include(
                "~/Scripts/Charts/CrossFilter/crossfilter.js",
                "~/Scripts/Charts/d3.v3.js",
                "~/Scripts/Charts/dc.js",
                "~/Scripts/intro.js",
                "~/Scripts/apiclient.js",
                "~/Scripts/moment.js",
                "~/Scripts/alsglance.js",
                "~/Scripts/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/telemetryjs").Include(
                "~/Scripts/telemetry.js"));

            bundles.Add(new ScriptBundle("~/bundles/patientjs").Include(
                 "~/Scripts/regression.js",
                "~/Scripts/jquery.cookie.js", 
                "~/Scripts/daterangepicker.js",
                "~/Scripts/colorbrewer.js",
                "~/Scripts/colorbrewer_schemes.js",
                "~/Scripts/jquery.bootstrap-touchspin.js",
                 "~/Scripts/Charts/dygraph-combined.js",
                "~/Scripts/devoops.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrapjs").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatablejs").Include(
                      "~/Scripts/jquery.dataTables.js",
                      "~/Scripts/dataTables.bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/misccss").Include(
                "~/Content/dc.css",
                "~/Content/introjs.css",
                "~/Content/devoops.css",
                "~/Content/daterangepicker-bs3.css",
                "~/Content/jquery.bootstrap-touchspin.css",
                "~/Content/colorbrewer.css",
                "~/Content/toastr.css",
                "~/Content/bootstrap.css",
                "~/Content/font-awesome.min.css",
                "~/Content/alsglance.css"));

            bundles.Add(new StyleBundle("~/Content/usabilityformcss").Include(
                "~/Content/usabilityform.css"));
        }
    }
}
