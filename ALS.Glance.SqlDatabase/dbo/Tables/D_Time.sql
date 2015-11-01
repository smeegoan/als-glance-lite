CREATE TABLE [dbo].[D_Time] (
    [Id]        BIGINT             IDENTITY (1, 1) NOT NULL,
    [Hour]      SMALLINT           NOT NULL,
    [TimeOfDay] NVARCHAR (50)      NOT NULL,
    [CreatedOn] DATETIMEOFFSET (7) DEFAULT (getdate()) NOT NULL,
    [UpdatedOn] DATETIMEOFFSET (7) DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_dbo.Time] PRIMARY KEY CLUSTERED ([Id] ASC)
);

