
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FilterPipe } from '../filter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from '../Shopping/products/products.component'; // show products for a category

import { NotFoundComponent } from './not-found/not-found.component';

import {

  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule

} from '@angular/material';


@NgModule({

  imports: [

    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatSlideToggleModule

  ],

  exports :[

    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    FilterPipe,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,


    NotFoundComponent,
    ProductsComponent





  ],

  declarations: [

    FilterPipe,
    ProductsComponent,
    NotFoundComponent

  ],


})
export class ShareModule { }
