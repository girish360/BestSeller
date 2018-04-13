
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ShareModule } from '../../share/share.module';

import { ProductsComponent } from './products.component'; // show products for a category

@NgModule({

  imports: [

    CommonModule,

    ProductsRoutingModule,

    ShareModule

  ],
  declarations: [

    ProductsComponent

  ]
})
export class ProductsModule { }
