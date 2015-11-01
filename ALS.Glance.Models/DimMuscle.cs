using System.Collections.Generic;
using ALS.Glance.Models.Core;

namespace ALS.Glance.Models
{
    public class DimMuscle : ModelWithAllMeta<long>
    {
        public string Name { get; set; }

        public string Acronym { get; set; }
        public string Side { get; set; }
        public long MuscleId { get; set; }
    }
}
