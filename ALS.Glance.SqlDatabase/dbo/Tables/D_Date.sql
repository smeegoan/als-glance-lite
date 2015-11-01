CREATE TABLE [dbo].[D_Date] (
    [Id]            BIGINT             IDENTITY (1, 1) NOT NULL,
    [Date]          DATETIMEOFFSET (7) NOT NULL,
    [Day]           TINYINT            NOT NULL,
    [DayInMonth]    NVARCHAR (50)      NOT NULL,
    [Month]         TINYINT            NOT NULL,
    [MonthName]     NVARCHAR (50)      NOT NULL,
    [Year]          SMALLINT           NOT NULL,
    [DayOfWeek]     NVARCHAR (50)      NOT NULL,
    [DayOfWeekName] NVARCHAR (50)      NOT NULL,
    [Weekday]       NVARCHAR (50)      NOT NULL,
    [MonthInYear]   NVARCHAR (50)      NOT NULL,
    [Quarter]       TINYINT            NOT NULL,
    [QuarterInYear] NVARCHAR (30)      NOT NULL,
    [CreatedOn]     DATETIMEOFFSET (7) CONSTRAINT [DF__D_Date__CreatedO__2D27B809] DEFAULT (getdate()) NOT NULL,
    [UpdatedOn]     DATETIMEOFFSET (7) CONSTRAINT [DF__D_Date__UpdatedO__2E1BDC42] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_dbo.Date] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [UQ__D_Date__D9DE21FD4D462D00] UNIQUE NONCLUSTERED ([Date] ASC)
);



