import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const arr = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

@NgModule({
  imports: arr,
  exports: arr
})
export class SharedModule {}
