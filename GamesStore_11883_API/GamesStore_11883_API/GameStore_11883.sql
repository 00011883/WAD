use GameAPIDB
go
insert into [dbo].[Authors]
([Name], [Description], [PosterUrl])
values (
    'Riot Games', 
    'Riot Games, Inc. is an American video game developer, publisher and esports tournament organizer based in Los Angeles, California.', 
    'https://www.riotgames.com/darkroom/800/87521fcaeca5867538ae7f46ac152740:2f8144e17957078916e41d2410c111c3/002-rg-2021-full-lockup-offwhite.jpg'
)
insert into [dbo].[Authors]
([Name], [Description], [PosterUrl])
values (
    'Rockstar Games', 
    'Rockstar Games, Inc. is an American video game publisher based in New York City. The company was established in December 1998 as a subsidiary of Take-Two Interactive, using the assets Take-Two had previously acquired from BMG Interactive.', 
    'https://cdn.dribbble.com/users/1732431/screenshots/4902347/media/0ab5af099dbcf00a89a25edf29a3c74f.png'
)
insert into [dbo].[Authors]
([Name], [Description], [PosterUrl])
values (
    'CD Projekt', 
    'CD Projekt S.A. is a Polish video game developer, publisher and distributor based in Warsaw, founded in May 1994 by Marcin Iwiński and Michał Kiciński. Iwiński and Kiciński were video game retailers before they founded the company, which initially acted as a distributor of foreign video games for the domestic market.', 
    'https://www.cdprojekt.com/en/wp-content/uploads-en/2016/01/cdp_004-1024x760.jpg'
)
insert into [dbo].[Authors]
([Name], [Description], [PosterUrl])
values (
    'Mundfish', 
    'Mundfish is a video game development company based in Russia. The company was founded in 2016 and is focused on creating unique and innovative games that provide players with immersive and engaging experiences.', 
    'https://trademarks.justia.com/media/og_image.php?serial=88188420'
)

go
insert into [dbo].[Games]
([Name], [Description], [ShortDescription], [Price], [PosterUrl], [ImgUrl], [Logo], [AuthorID])
values (
    'Valorant', 
    'Riot Games presents VALORANT: a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities. Learn about VALORANT and its stylish gameplay.', 
    '5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.', 
    150, 
    'https://m.media-amazon.com/images/M/MV5BNmNhM2NjMTgtNmIyZC00ZmVjLTk4YWItZmZjNGY2NThiNDhkXkEyXkFqcGdeQXVyODU4MDU1NjU@._V1_.jpg',
    'https://www.riotgames.com/darkroom/1440/d0807e131a84f2e42c7a303bda672789:3d02afa7e0bfb75f645d97467765b24c/valorant-offwhitelaunch-keyart.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png',
    1
)
insert into [dbo].[Games]
([Name], [Description], [ShortDescription], [Price], [PosterUrl], [ImgUrl], [Logo], [AuthorID])
values (
    'Grand Theft Auto V', 
    'Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.', 
    'Action-adventure game played from either a third-person or first-person perspective.', 
    59.99, 
    'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51MFu2e82VL.jpg',
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/How-to-Switch-Characters-in-GTA-5-scaled.jpg',
    'https://www.freepnglogos.com/uploads/gta-5-logo-png/grand-theft-auto-v-1.png',
    2
)
insert into [dbo].[Games]
([Name], [Description], [ShortDescription], [Price], [PosterUrl], [ImgUrl], [Logo], [AuthorID])
values (
    'The Witcher 3: Wild Hunt', 
    'The Witcher 3: Wild Hunt is a story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as Geralt of Rivia, a monster hunter tasked with finding a child from an ancient prophecy.', 
    'A story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.', 
    19.99, 
    'https://picfiles.alphacoders.com/198/thumb-198636.jpg',
    'https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2015/05/25/the_witcher_3_wild_hunt_wide_wallpaper-1920x12001.jpg',
    'https://upload.wikimedia.org/wikipedia/fr/thumb/4/44/The_Witcher_3_Wild_Hunt_Logo.png/2560px-The_Witcher_3_Wild_Hunt_Logo.png',
    3
)
insert into [dbo].[Games]
([Name], [Description], [ShortDescription], [Price], [PosterUrl], [ImgUrl], [Logo], [AuthorID])
values (
    'Atomic Heart', 
    'Atomic Heart is an adventure role-playing action game with a closed world, which takes place in an alternative Soviet Union of 1955. Science, equality and fraternity are the main symbols of Freedom in this reality.', 
    'Adventure role-playing action game with a closed world, which takes place in an alternative Soviet Union of 1955.', 
    59.99, 
    'https://upload.wikimedia.org/wikipedia/en/d/d3/Atomic_Heart_cover.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/668580/capsule_616x353.jpg',
    'https://mundfish.com/wp-content/themes/atomicheart/img/main-sub-logo.png',
    4
)
insert into [dbo].[Games]
([Name], [Description], [ShortDescription], [Price], [PosterUrl], [ImgUrl], [Logo], [AuthorID])
values (
    'League of Legends', 
    'League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the others base.', 
    'Team-based strategy game where two teams of five powerful champions face off to destroy the others base.', 
    150, 
    'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LoL_1200x1600-15ad6c981af8d98f50e833eac7843986',
    'https://portforward.com/league-of-legends/league-of-legends-header-small.webp',
    'https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png',
    1
)
go

select *
from [dbo].[Authors] a join [dbo].[Games] g on g.AuthorID = a.ID