using System.Collections.Generic;
using ALS.Glance.Models.Core;

namespace ALS.Glance.Models
{
    public class DTime : ModelWithAllMeta<long>
    {

        public short Hour { get; set; }

        public string TimeOfDay { get; set; }

        public virtual ICollection<Fact> Fact { get; set; }


        public DTime()
        {
            Fact = new List<Fact>();
        }
    }
}
