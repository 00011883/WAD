import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
