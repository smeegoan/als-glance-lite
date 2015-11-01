CREATE TABLE [dbo].[AspNetUsers] (
    [Id]                   NVARCHAR (128)     NOT NULL,
    [AccessFailedCount]    INT                NOT NULL,
    [Email]                NVARCHAR (MAX)     NULL,
    [EmailConfirmed]       BIT                NOT NULL,
    [LockoutEnabled]       BIT                NOT NULL,
    [PasswordHash]         NVARCHAR (MAX)     NULL,
    [PhoneNumber]          NVARCHAR (MAX)     NULL,
    [PhoneNumberConfirmed] BIT                NOT NULL,
    [SecurityStamp]        NVARCHAR (MAX)     NULL,
    [TwoFactorEnabled]     BIT                NOT NULL,
    [LockoutEndDateUtc]    DATETIME           NULL,
    [UserName]             NVARCHAR (256)     NOT NULL,
    [Description]          NVARCHAR (512)     NULL,
    [CreatedOn]            DATETIMEOFFSET (7) NULL,
    [CreatedBy]            NVARCHAR (MAX)     NULL,
    [UpdatedOn]            DATETIMEOFFSET (7) NULL,
    [UpdatedBy]            NVARCHAR (MAX)     NULL,
    CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex]
    ON [dbo].[AspNetUsers]([UserName] ASC);

