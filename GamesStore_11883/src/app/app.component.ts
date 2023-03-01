import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, ResponsiveOverlayOptions } from 'primeng/api';

const responsiveOptions: ResponsiveOverlayOptions = {
  // style?: any;                                     // Style of component in given breakpoint or media query
  // styleClass?: string;                             // Style class of component in given breakpoint or media query
  // contentStyle?: any;                              // Style of content in given breakpoint or media query
  // contentStyleClass?: string;                      // Style class of content in given breakpoint or media query
  // breakpoint?: string;                             // Breakpoint required to show component in modal mode. Exp: '640px', '10rem' etc.
  // media?: string;                                  // Media query required to show component in modal mode. Exp: '@media screen and (max-width: 640px)', '@media screen and (min-width: 640px) and (max-width: 900px)' etc.
  // direction?: ResponsiveOverlayDirectionType;      // Direction in which the component will be displayed in modal mode.
  // hideOnEscape?: boolean;                          // Hides overlay when escape key pressed.
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'GamesStore_11883';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.overlayOptions = {
      responsive: responsiveOptions,
      mode: 'modal',
      appendTo: 'body'
    };
  }
}
