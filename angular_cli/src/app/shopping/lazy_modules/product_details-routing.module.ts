
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from '../components/product_details/product_details.component';

const routes: Routes = [

  {
    path : '',
    component : ProductDetailsComponent
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})
export class ProductDetailsRoutingModule { }
