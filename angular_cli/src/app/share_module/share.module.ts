
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FilterPipe } from '../filter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from '../shopping/components/products/products.component'; // show products for a category

import { NotFoundComponent } from '../share_components/not-found/not-found.component';

import { DragScrollModule } from 'ngx-drag-scroll';

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

import { AgmCoreModule } from '@agm/core';


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
    MatSlideToggleModule,
    DragScrollModule



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
    DragScrollModule,


    NotFoundComponent,
    ProductsComponent,






  ],

  declarations: [

    FilterPipe,
    ProductsComponent,
    NotFoundComponent

  ],


})
export class ShareModule { }
