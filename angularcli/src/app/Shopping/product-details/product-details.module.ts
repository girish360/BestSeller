
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';

import { ProductDetailsComponent } from './product-details.component';

import { NgxCarouselModule } from 'ngx-carousel'; // carousel

import 'hammerjs';

import { ShareModule } from '../../share/share.module';

@NgModule({

  imports: [

    CommonModule,

    ProductDetailsRoutingModule,

    NgxCarouselModule,

    ShareModule

  ],

  declarations: [ProductDetailsComponent]
})
export class ProductDetailsModule { }
