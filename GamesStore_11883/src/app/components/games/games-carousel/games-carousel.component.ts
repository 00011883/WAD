import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { imageChange } from 'src/app/app.animation';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games-carousel',
  templateUrl: './games-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [imageChange]
})
export class GamesCarouselComponent implements OnInit {
  @Input() games!: Game[];

  isLoading = true;
  intervalId!: NodeJS.Timer;
  timer = 9;
  timerDuration = 9;
  currentSlide = 1;
  sub!: Subscription;

  constructor(private cdRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.startCounter();
  }

  setContent(id: number): void {
    if (id === this.currentSlide) this.router.navigate(['/games/' + id]);
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
      this.currentSlide = 1;
    } else {
      this.currentSlide += 1;
    }
    this.cdRef.detectChanges();
  }
  get isLastSlide(): boolean {
    return this.currentSlide === this.games.length - 1;
  }
}
