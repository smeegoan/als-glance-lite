CREATE TABLE [dbo].[AspNetExtApiAuthenticationAccessTokens] (
    [Id]               BIGINT           IDENTITY (1, 1) NOT NULL,
    [ApiApplicationId] NVARCHAR (128)   NOT NULL,
    [BaseApiUserId]    NVARCHAR (128)   NOT NULL,
    [AccessToken]      UNIQUEIDENTIFIER NOT NULL,
    [ExpirationDate]   DATETIME2 (7)    NOT NULL,
    CONSTRAINT [PK_dbo.AspNetExtApiAuthenticationAccessTokens] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.AspNetExtApiAuthenticationAccessTokens_dbo.AspNetExtApiApplications_ApplicationId] FOREIGN KEY ([ApiApplicationId]) REFERENCES [dbo].[AspNetExtApplications] ([Id]),
    CONSTRAINT [FK_dbo.AspNetExtApiAuthenticationAccessTokens_dbo.AspNetExtApiAuthenticationTokens_ApiApplicationId_BaseApiUserId] FOREIGN KEY ([ApiApplicationId], [BaseApiUserId]) REFERENCES [dbo].[AspNetExtApiAuthenticationTokens] ([ApiApplicationId], [BaseApiUserId]) ON DELETE CASCADE
);




GO
CREATE NONCLUSTERED INDEX [IX_ExpirationDate]
    ON [dbo].[AspNetExtApiAuthenticationAccessTokens]([ExpirationDate] ASC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_AccessToken]
    ON [dbo].[AspNetExtApiAuthenticationAccessTokens]([AccessToken] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ApiApplicationId_BaseApiUserId]
    ON [dbo].[AspNetExtApiAuthenticationAccessTokens]([ApiApplicationId] ASC, [BaseApiUserId] ASC);

