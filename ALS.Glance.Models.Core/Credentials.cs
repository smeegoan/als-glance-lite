namespace ALS.Glance.Models.Core
{
    public class Credentials
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public Credentials(string userName, string password)
        {
            Username = userName;
            Password = password;
        }
    }
}
