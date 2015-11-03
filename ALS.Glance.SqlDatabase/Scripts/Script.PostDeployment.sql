/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'admin', N'admin')
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'user', N'user')

--P>5-F(5dNhymT=%!
INSERT [dbo].[AspNetUsers] ([Id], [Description], [CreatedOn], [UpdatedOn], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'ALS Glance', NULL, CAST(N'2015-06-10 19:08:15.5711308' AS DateTime2), CAST(N'2015-06-10 19:08:15.5711308' AS DateTime2), NULL, 1, N'ADCppRVVrJVid4D6SpUtZvKmp3hKVygSMs7Pw+b8qzCbMJ4snxNty+QRBtO+F2M/qw==', N'845f3a61-c249-4ab6-82a4-4a171ac72513', NULL, 0, 0, NULL, 0, 0, N'ALS Glance')
INSERT [dbo].[AspNetUsers] ([Id], [Description], [CreatedOn], [UpdatedOn], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'als.glance.web', NULL, CAST(N'2015-06-10 19:08:15.5711308' AS DateTime2), CAST(N'2015-06-10 19:08:15.5711308' AS DateTime2), NULL, 1, N'ADCppRVVrJVid4D6SpUtZvKmp3hKVygSMs7Pw+b8qzCbMJ4snxNty+QRBtO+F2M/qw==', N'845f3a61-c249-4ab6-82a4-4a171ac72513', NULL, 0, 0, NULL, 0, 0, N'als.glance.web')

INSERT [dbo].[AspNetExtApplications] ([Id]) VALUES (N'ALS Glance')

INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'als.glance.web', N'user')

