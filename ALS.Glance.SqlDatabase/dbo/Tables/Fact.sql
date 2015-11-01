CREATE TABLE [dbo].[Fact] (
    [Id]        BIGINT           IDENTITY (1, 1) NOT NULL,
    [AUC]       DECIMAL (20, 19) NOT NULL,
    [DateId]    BIGINT           NOT NULL,
    [MuscleId]  BIGINT           NOT NULL,
    [PatientId] BIGINT           NOT NULL,
    [TimeId]    BIGINT           NOT NULL,
    [EmgId]     BIGINT           NULL,
    CONSTRAINT [PK__Fact__3214EC0781C37284] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.Fact_dbo.Date_DateId] FOREIGN KEY ([DateId]) REFERENCES [dbo].[D_Date] ([Id]),
    CONSTRAINT [FK_dbo.Fact_dbo.Emg_EmgId] FOREIGN KEY ([EmgId]) REFERENCES [dbo].[D_Emg] ([Id]),
    CONSTRAINT [FK_dbo.Fact_dbo.Muscle_MuscleId] FOREIGN KEY ([MuscleId]) REFERENCES [dbo].[D_Muscle] ([Id]),
    CONSTRAINT [FK_dbo.Fact_dbo.Patient_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[D_Patient] ([Id]),
    CONSTRAINT [FK_dbo.Fact_dbo.Time_TimeId] FOREIGN KEY ([TimeId]) REFERENCES [dbo].[D_Time] ([Id]),
    CONSTRAINT [UQ__Fact__ADAA286BA5D820B8] UNIQUE NONCLUSTERED ([DateId] ASC, [MuscleId] ASC, [PatientId] ASC, [TimeId] ASC)
);









