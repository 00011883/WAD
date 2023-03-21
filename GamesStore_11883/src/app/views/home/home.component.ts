import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GamesService } from './../../services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  games = [
    {
      id: 0,
      posterUrl:
        'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51MFu2e82VL.jpg',
      imageUrl:
        'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/How-to-Switch-Characters-in-GTA-5-scaled.jpg?fit=2560%2C1600&ssl=1',
      logoUrl:
        'https://www.freepnglogos.com/uploads/gta-5-logo-png/grand-theft-auto-v-1.png',
      title: 'Grand Theft Auto V',
      description:
        'Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.',
      shortDescription:
        'Action-adventure game played from either a third-person or first-person perspective.',
      price: 59.99,
      rating: 4.4,
      releaseDate: 'April 14, 2015'
    },
    {
      id: 1,
      posterUrl: 'https://picfiles.alphacoders.com/198/thumb-198636.jpg',
      title: 'The Witcher 3: Wild Hunt',
      imageUrl:
        'https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2015/05/25/the_witcher_3_wild_hunt_wide_wallpaper-1920x12001.jpg',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/fr/thumb/4/44/The_Witcher_3_Wild_Hunt_Logo.png/2560px-The_Witcher_3_Wild_Hunt_Logo.png',
      description:
        'The Witcher 3: Wild Hunt is a story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as Geralt of Rivia, a monster hunter tasked with finding a child from an ancient prophecy.',
      shortDescription:
        'A story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
      price: 19.99,
      rating: 4.4,
      releaseDate: 'May 18, 2015'
    },
    {
      id: 2,
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNmNhM2NjMTgtNmIyZC00ZmVjLTk4YWItZmZjNGY2NThiNDhkXkEyXkFqcGdeQXVyODU4MDU1NjU@._V1_.jpg',
      imageUrl:
        'https://www.riotgames.com/darkroom/1440/d0807e131a84f2e42c7a303bda672789:3d02afa7e0bfb75f645d97467765b24c/valorant-offwhitelaunch-keyart.jpg',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png',
      title: 'Valorant',
      description:
        'Riot Games presents VALORANT: a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities. Learn about VALORANT and its stylish gameplay.',
      shortDescription:
        '5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.',
      price: 0,
      rating: 3.9,
      releaseDate: 'June 20, 2020'
    },
    {
      id: 3,
      posterUrl:
        'https://upload.wikimedia.org/wikipedia/en/d/d3/Atomic_Heart_cover.jpg',
      imageUrl:
        'https://cdn.cloudflare.steamstatic.com/steam/apps/668580/capsule_616x353.jpg?t=1676995676',
      logoUrl:
        'https://mundfish.com/wp-content/themes/atomicheart/img/main-sub-logo.png',
      title: 'Atomic Heart',
      description:
        'Atomic Heart is an adventure role-playing action game with a closed world, which takes place in an alternative Soviet Union of 1955. Science, equality and fraternity are the main symbols of Freedom in this reality.',
      shortDescription:
        'Adventure role-playing action game with a closed world, which takes place in an alternative Soviet Union of 1955.',
      price: 59.99,
      rating: 3.5,
      releaseDate: 'February 20, 2023'
    },
    {
      id: 4,
      posterUrl:
        'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LoL_1200x1600-15ad6c981af8d98f50e833eac7843986',
      imageUrl:
        'https://portforward.com/league-of-legends/league-of-legends-header-small.webp',
      logoUrl:
        'https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png',
      title: 'League of Legends',
      description:
        "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base.",
      shortDescription:
        "Team-based strategy game where two teams of five powerful champions face off to destroy the other's base.",
      price: 0,
      rating: 3.0,
      releaseDate: 'October 27, 2009'
    }
  ];
  intervalId!: NodeJS.Timer;
  timer = 9;
  timerDuration = 9;
  currentSlide = 0;
  sub!: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.startCounter();
    this.getGames();
  }

  getGames(): void {
    this.sub = this.gamesService.getGames().subscribe((games) => {
      // this.games = games;
      console.log(games);
      this.cdRef.detectChanges();
    });
  }

  setContent(id: number): void {
    if (id === this.currentSlide) return;
    this.timer = this.timerDuration;
    this.currentSlide = id;
  }
  startCounter(): void {
    this.stopCounter();
    this.intervalId = setInterval(() => {
      if (this.timer === 0) {
        this.timer = this.timerDuration;
        this.moveSlide();
        this.startCounter();
      } else {
        this.timer--;
      }
    }, 1000);
  }
  stopCounter(): void {
    this.intervalId && clearInterval(this.intervalId);
  }
  moveSlide(): void {
    if (this.isLastSlide) {
      this.currentSlide = 0;
    } else {
      this.currentSlide += 1;
    }
    this.cdRef.detectChanges();
  }
  get isLastSlide(): boolean {
    return this.currentSlide === this.games.length - 1;
  }

  ngOnDestroy(): void {
    this.stopCounter();
    this.sub && this.sub.unsubscribe();
  }
}
