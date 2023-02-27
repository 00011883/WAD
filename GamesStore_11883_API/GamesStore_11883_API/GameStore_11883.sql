use GameAPIDB
go
insert into [dbo].[Authors]
([Name], [Description], [PosterUrl])
values ('Riot Games Testers', 'Modern and revolutionary game development studio', '')

go
insert into [dbo].[Games]
([Name], [Description], [Price], [PosterUrl], [AuthorID])
values ('Valorant', '5 vs 5 Shooter Game', 150, '', 1)
go

select *
from [dbo].[Authors] a join [dbo].[Games] g on g.AuthorID = a.ID