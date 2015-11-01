CREATE TABLE [dbo].[D_Patient] (
    [Id]          BIGINT             IDENTITY (1, 1) NOT NULL,
    [PatientId]   NVARCHAR (30)      NOT NULL,
    [Name]        NVARCHAR (500)     NOT NULL,
    [Sex]         CHAR (1)           NOT NULL,
    [BornOn]      DATETIMEOFFSET (7) NOT NULL,
    [DiagnosedOn] DATETIMEOFFSET (7) NOT NULL,
    [CreatedOn]   DATETIMEOFFSET (7) CONSTRAINT [DF__D_Patient__Creat__1DE57479] DEFAULT (getdate()) NOT NULL,
    [UpdatedOn]   DATETIMEOFFSET (7) CONSTRAINT [DF__D_Patient__Updat__1ED998B2] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_dbo.Patient] PRIMARY KEY CLUSTERED ([Id] ASC)
);

