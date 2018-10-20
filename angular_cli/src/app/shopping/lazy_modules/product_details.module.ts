
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product_details-routing.module';

import { ProductDetailsComponent } from '../components/product_details/product_details.component';

import { NgxCarouselModule } from 'ngx-carousel'; // carousel

import 'hammerjs';

import { ShareModule } from '../../share_module/share.module';

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
