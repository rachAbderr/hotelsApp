import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplaceComma } from './pipes/replace-comma.pipe';
import { StarRatingComponent } from './childComponents/star-rating/star-rating.component';



@NgModule({
  declarations: [
    ReplaceComma,
    StarRatingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReplaceComma,
    StarRatingComponent,
  ],
})
export class SharedModule { }
