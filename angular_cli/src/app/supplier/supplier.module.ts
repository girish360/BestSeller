
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';

import { IndexComponent } from './components/index/index.component';

@NgModule({

  imports: [

    CommonModule,

    SupplierRoutingModule

  ],

  declarations: [IndexComponent]
})
export class SupplierModule { }
