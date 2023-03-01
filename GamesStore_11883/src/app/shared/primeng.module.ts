import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [CarouselModule, ButtonModule, SkeletonModule, TableModule]
})
export class PrimengModule {}
