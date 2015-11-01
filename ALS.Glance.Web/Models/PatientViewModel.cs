using System;
using System.Collections.Generic;
using ALS.Glance.Models;
using ALS.Glance.Models.Core;

namespace ALS.Glance.Web.Models
{
    public class PatientViewModel : Model<long>
    {
        public string Name { get; set; }
        public Tuple<string,string> VersionedSettings { get; set; }
        public short YearMax { get; set; }

        public short YearMin { get; set; }

        public IEnumerable<DimMuscle> Muscles { get; set; }
    }
}