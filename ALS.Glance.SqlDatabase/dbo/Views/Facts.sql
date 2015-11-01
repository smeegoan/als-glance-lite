

CREATE VIEW [dbo].[Facts] WITH SCHEMABINDING AS
SELECT f.Id,f.AUC,
d.Date DateDate,d.Day DateDay,d.DayInMonth DateDayInMonth,d.Month DateMonth,d.MonthName DateMonthName,d.Year DateYear,d.DayOfWeek DateDayOfWeek,d.DayOfWeekName DateDayOfWeekName,d.Weekday DateWeekday,d.MonthInYear DateMonthInYear,d.Quarter DateQuarter,d.QuarterInYear DateQuarterInYear,
m.Abbreviation MuscleAbbreviation,m.Name MuscleName,
p.Id PatientId,p.PatientId PatientPatientId,p.Name PatientName,p.Sex PatientSex,p.BornOn PatientBornOn,p.DiagnosedOn PatientDiagnosedOn,
t.Hour TimeHour,t.TimeOfDay TimeTimeOfDay
FROM dbo.Fact f
INNER JOIN dbo.D_Date d on d.Id=f.DateId
INNER JOIN dbo.D_Muscle m on m.Id=f.MuscleId
INNER JOIN dbo.D_Patient p on p.Id=f.PatientId
INNER JOIN dbo.D_Time t on t.Id=f.TimeId
GO
CREATE UNIQUE CLUSTERED INDEX [idx_Facts]
    ON [dbo].[Facts]([Id] ASC, [PatientId] ASC);

