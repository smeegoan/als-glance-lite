CREATE TABLE [dbo].[AspNetExtApiAuthenticationTokens] (
    [ApiApplicationId] NVARCHAR (128)   NOT NULL,
    [BaseApiUserId]    NVARCHAR (128)   NOT NULL,
    [RefreshToken]     UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_dbo.AspNetExtApiAuthenticationTokens] PRIMARY KEY CLUSTERED ([ApiApplicationId] ASC, [BaseApiUserId] ASC),
    CONSTRAINT [FK_dbo.AspNetExtApiAuthenticationTokens_dbo.AspNetExtApiApplications_ApiApplicationId] FOREIGN KEY ([ApiApplicationId]) REFERENCES [dbo].[AspNetExtApplications] ([Id]),
    CONSTRAINT [FK_dbo.AspNetExtApiAuthenticationTokens_dbo.AspNetExtApiUsers_BaseApiUserId] FOREIGN KEY ([BaseApiUserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);




GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_RefreshToken]
    ON [dbo].[AspNetExtApiAuthenticationTokens]([RefreshToken] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_BaseApiUserId]
    ON [dbo].[AspNetExtApiAuthenticationTokens]([BaseApiUserId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ApiApplicationId]
    ON [dbo].[AspNetExtApiAuthenticationTokens]([ApiApplicationId] ASC);

