using System;
using System.Collections.Generic;
using ALS.Glance.Models.Core;

namespace ALS.Glance.Models
{
    public class DimDate : ModelWithAllMeta<long>
    {     
        public DateTime DateIso { get; set; }

        public byte Day { get; set; }

        public string DayInMonth { get; set; }

        public byte Month { get; set; }

        public string MonthName { get; set; }

        public short Year { get; set; }

        public string DayOfWeek { get; set; }

        public string DayOfWeekName { get; set; }

        public string Weekday { get; set; }

        public string MonthInYear { get; set; }

        public byte Quarter { get; set; }

        public string QuarterInYear { get; set; }

        public virtual ICollection<Fact> Fact { get; set; }

        public DimDate()
        {
            Fact = new List<Fact>();
        }
    }
}
