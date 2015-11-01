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

SET IDENTITY_INSERT [dbo].[D_Muscle] ON 
INSERT [dbo].[D_Muscle] ([Id], [Name], [Abbreviation], [CreatedOn], [UpdatedOn]) VALUES (1, N'Anterior Tibialis', N'AT', GETDATE(), GETDATE())
INSERT [dbo].[D_Muscle] ([Id], [Name], [Abbreviation], [CreatedOn], [UpdatedOn]) VALUES (2, N'Flexor Carpi Radialis', N'FCR', GETDATE(), GETDATE())
INSERT [dbo].[D_Muscle] ([Id], [Name], [Abbreviation], [CreatedOn], [UpdatedOn]) VALUES (3, N'Sternocleido Mastoideus', N'SCM', GETDATE(), GETDATE())
SET IDENTITY_INSERT [dbo].[D_Muscle] OFF

SET IDENTITY_INSERT [dbo].[D_Time] ON 
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (1, 0, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (2, 1, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (3, 2, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (4, 3, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (5, 4, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (6, 5, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (7, 6, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (8, 7, N'Night', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (9, 8, N'Morning', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (10, 9, N'Morning', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (11, 10, N'Morning', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (12, 11, N'Morning', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (13, 12, N'Morning', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (14, 13, N'Afternoon', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (15, 14, N'Afternoon', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (16, 15, N'Afternoon', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (17, 16, N'Afternoon', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (18, 17, N'Afternoon', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (19, 18, N'Evening', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (20, 19, N'Evening', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (21, 20, N'Evening', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (22, 21, N'Evening', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (23, 22, N'Evening', GETDATE(), GETDATE())
INSERT [dbo].[D_Time] ([Id], [Hour], [TimeOfDay], [CreatedOn], [UpdatedOn]) VALUES (24, 23, N'Night', GETDATE(), GETDATE())
SET IDENTITY_INSERT [dbo].[D_Time] OFF
SET IDENTITY_INSERT [dbo].[D_Patient] ON 

INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (1, N'2015-194', N'Xavier Pedro Linares', N'M', CAST(N'1974-11-20T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-06-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (2, N'2014-445', N'Valentina Neuza Gómez Villena Balladares', N'F', CAST(N'1969-03-25T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-05-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (3, N'2014-433', N'Tânia Gutiérrez Almeida', N'F', CAST(N'1971-09-28T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-05-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (4, N'2014-083', N'Salvador Abelho Soverosa', N'M', CAST(N'1981-05-22T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-04-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (5, N'2014-030', N'Rita Deise Aguilar Mendoça Sampayo', N'F', CAST(N'1980-10-26T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-03-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (6, N'2013-092', N'Raissa Passos Lencaster', N'F', CAST(N'1967-06-17T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-03-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (7, N'2014-263', N'Rafaela Cunha Mayor', N'F', CAST(N'1975-07-09T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-02-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (8, N'2014-066', N'Octávio Bahía Belmont', N'M', CAST(N'1962-07-18T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-09-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (9, N'2014-346', N'Núria Tira-Picos Garcia', N'F', CAST(N'1974-03-13T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-12-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (10, N'2013-383', N'Miriam Raposo Valverde', N'F', CAST(N'1980-03-24T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-06-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (11, N'2015-245', N'Miguel Zarco Mansilla Semedo Betancour', N'M', CAST(N'1973-07-06T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-08-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (12, N'2013-126', N'Miguel Martinho Simão', N'M', CAST(N'1974-12-03T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-05-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (13, N'2014-304', N'Mélanie Keil Afonso', N'F', CAST(N'1976-06-22T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-10-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (14, N'2015-202', N'Mauro Martins Fernandes', N'M', CAST(N'1976-04-13T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-11-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (15, N'2015-089', N'Mateus Jadir Abreu Forte', N'M', CAST(N'1956-03-01T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-03-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (16, N'2014-388', N'Mateus Fontinha Lameiras', N'M', CAST(N'1980-06-07T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-12-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (17, N'2015-295', N'Lourenço Batista Rodovalho Pegado Cordero', N'M', CAST(N'1979-05-22T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-10-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (18, N'2013-264', N'Lia Ruas Pádua', N'F', CAST(N'1976-03-30T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-03-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (19, N'2014-082', N'Leonor Carrasqueira Cardoso', N'F', CAST(N'1972-04-16T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-04-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (20, N'2013-215', N'Joele Cortez Grilo', N'F', CAST(N'1971-11-27T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-10-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (21, N'2015-355', N'João Farias Pontes', N'M', CAST(N'1967-02-11T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-05-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (22, N'2014-214', N'Heldo Nádege Outeir Penteado Carmo', N'M', CAST(N'1976-10-23T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-09-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (23, N'2015-375', N'Gomes Gentil Quinaz Furtado Avasto', N'M', CAST(N'1980-08-01T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-02-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (24, N'2015-292', N'Diana Veleda Lameira', N'F', CAST(N'1955-06-26T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-05-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (25, N'2014-389', N'Célio Rosmaninho Vaz', N'M', CAST(N'1970-12-28T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-10-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (26, N'2013-146', N'Anteia Demétria Beltrán Penteado Xavier', N'F', CAST(N'1966-12-07T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-04-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (27, N'2015-122', N'Anolido Juvenal Cantanhe Sales Liberato', N'M', CAST(N'1971-01-06T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2014-07-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (28, N'2014-352', N'Ângela Trigueiro Mondragão', N'F', CAST(N'1966-01-13T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2013-12-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (29, N'2013-212', N'Amélia Jalmira Veleda Cedraz Caetano', N'F', CAST(N'1974-04-06T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-12-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
INSERT [dbo].[D_Patient] ([Id], [PatientId], [Name], [Sex], [BornOn], [DiagnosedOn], [CreatedOn], [UpdatedOn]) VALUES (30, N'2013-311', N'Alex Denil Botelho Junqueira Soto Mayor', N'M', CAST(N'1977-03-20T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2012-03-01T00:00:00.0000000+00:00' AS DateTimeOffset), GETDATE(), GETDATE())
SET IDENTITY_INSERT [dbo].[D_Patient] OFF

:r .\Script.Date.sql
:r .\Script.Emg.sql
:r .\Script.Fact.sql		

ALTER TABLE [dbo].[D_Emg] ADD CONSTRAINT [FK_dbo.Emg_dbo.Fact_Id] FOREIGN KEY ([FactId]) REFERENCES [dbo].[Fact] ([Id])