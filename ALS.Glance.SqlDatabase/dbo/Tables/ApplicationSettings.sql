CREATE TABLE [dbo].[ApplicationSettings] (
    [Id]            BIGINT             IDENTITY (1, 1) NOT NULL,
    [UserId]        NVARCHAR (128)     NOT NULL,
    [ApplicationId] NVARCHAR (128)     NOT NULL,
    [Value]         NVARCHAR (4000)    NULL,
    [CreatedOn]     DATETIMEOFFSET (7) NOT NULL,
    [UpdatedOn]     DATETIMEOFFSET (7) NOT NULL,
    [Version]       ROWVERSION         NOT NULL,
    CONSTRAINT [PK_dbo.ApplicationSettings] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.ApplicationSettings_dbo.AspNetExtApiApplications_ApplicationId] FOREIGN KEY ([ApplicationId]) REFERENCES [dbo].[AspNetExtApplications] ([Id])
);








GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_dbo.ApplicationSettings_UserIdApplicationId]
    ON [dbo].[ApplicationSettings]([UserId] ASC, [ApplicationId] ASC);

