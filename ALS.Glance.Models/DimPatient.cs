using System;
using System.Collections.Generic;
using ALS.Glance.Models.Core;

namespace ALS.Glance.Models
{
    public class DimPatient : ModelWithAllMeta<long>
    {
        public string PatientId { get; set; }
        public string Gender { get; set; }
        public string Name { get; set; }
        public decimal AtHigh { get; set; }
        public decimal AtLow { get; set; }
        public decimal FcrHigh { get; set; }
        public decimal FcrLow { get; set; }
        public decimal FcmHigh { get; set; }
        public decimal FcmLow { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime Diagnosedon { get; set; }

    }
}
