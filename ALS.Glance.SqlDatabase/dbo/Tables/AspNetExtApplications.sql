CREATE TABLE [dbo].[AspNetExtApplications] (
    [Id] NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_dbo.AspNetExtApplications] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.AspNetExtApplications_dbo.AspNetUsers_Id] FOREIGN KEY ([Id]) REFERENCES [dbo].[AspNetUsers] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_Id]
    ON [dbo].[AspNetExtApplications]([Id] ASC);

