namespace ALS.Glance.Models.Core.Connection
{
    public class ConnectionString : IConnectionString
    {
        private readonly string _value;
        public string Value { get { return _value; } }

        public ConnectionString(string value)
        {
            _value = value;
        }

        public static implicit operator string(ConnectionString connectionString)
        {
            return connectionString.Value;
        }

        public static implicit operator ConnectionString(string value)
        {
            return new ConnectionString(value);
        }
    }
}
