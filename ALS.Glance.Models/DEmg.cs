using ALS.Glance.Models.Core;

namespace ALS.Glance.Models
{
    public class DEmg : ModelWithAllMeta<long>
    {

        public string Data { get; set; }

        public virtual Fact Fact { get; set; }
        public virtual long FactId { get; set; }
    }
}
