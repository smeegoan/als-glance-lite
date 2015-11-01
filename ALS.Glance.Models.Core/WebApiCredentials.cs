namespace ALS.Glance.Models.Core
{
    public class WebApiCredentials
    {
        public string ApplicationId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public string OnBehalfOf { get; set; }
    }
}
