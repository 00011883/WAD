import { animate, style, transition, trigger } from '@angular/animations';

export const imageChange = trigger('imageChange', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('500ms ease-in-out', style({ opacity: 0 }))
  ])
]);
