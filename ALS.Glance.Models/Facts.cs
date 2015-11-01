using System;
using ALS.Glance.Models.Core;

namespace ALS.Glance.Models
{

        public class Facts: Model<long>
        {

            public decimal AUC { get; set; } // AUC


            public DateTimeOffset DateDate { get; set; } // date


            public byte DateDay { get; set; } // Day

            public string DateDayInMonth { get; set; } // DayInMonth


            public byte DateMonth { get; set; } // Month


            public string DateMonthName { get; set; } // MonthName


            public short DateYear { get; set; } // Year


            public string DateDayOfWeek { get; set; } // DayOfWeek


            public string DateDayOfWeekName { get; set; } // DayOfWeekName


            public string DateWeekday { get; set; } // Weekday


            public string DateMonthInYear { get; set; } // MonthInYear


            public byte DateQuarter { get; set; } // Quarter


            public string DateQuarterInYear { get; set; } // QuarterInYear


            public string MuscleAbbreviation { get; set; } // MuscleAbbreviation


            public string MuscleName { get; set; } // Muscle


            public string PatientPatientId { get; set; } // PatientId


            public long PatientId { get; set; } // Name
            
            public string PatientName { get; set; } // Name


            public string PatientSex { get; set; } // Sex


            public DateTimeOffset PatientBornOn { get; set; } // BornOn


            public DateTimeOffset PatientDiagnosedOn { get; set; } // DiagnosedOn


            public short TimeHour { get; set; } // Hour


            public string TimeTimeOfDay { get; set; } // TimeOfDay
        }

    

}
