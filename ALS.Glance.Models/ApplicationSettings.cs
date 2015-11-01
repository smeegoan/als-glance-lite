using System.Collections.Generic;
using ALS.Glance.Models.Core;
using ALS.Glance.Models.Core.Interfaces;

namespace ALS.Glance.Models
{
    public class ApplicationSettings : ModelWithAllMeta<long>,IHaveVersionAsByteArray
    {
        public virtual string UserId { get; set; }

          public virtual string ApplicationId { get; set; }

//        public virtual ApplicationUser Application { get; set; }

        public virtual string Value { get; set; }
        public IDictionary<string, object> Values { get; set; }

        public byte[] Version { get; set; }
    }
}
