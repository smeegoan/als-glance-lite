CREATE TABLE [dbo].[D_Muscle] (
    [Id]           BIGINT             IDENTITY (1, 1) NOT NULL,
    [Name]         NVARCHAR (200)     NOT NULL,
    [Abbreviation] NVARCHAR (30)      NOT NULL,
    [CreatedOn]    DATETIMEOFFSET (7) DEFAULT (getdate()) NOT NULL,
    [UpdatedOn]    DATETIMEOFFSET (7) DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_dbo.Muscle] PRIMARY KEY CLUSTERED ([Id] ASC)
);

