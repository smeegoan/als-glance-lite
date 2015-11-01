namespace ALS.Glance.Models
{
    public class AgeBounds
    {
        public double Min { get; set; }
        public double Max { get; set; }
    }

    public class D
    {
        public AgeBounds GetAgeBounds { get; set; }
    }

}
