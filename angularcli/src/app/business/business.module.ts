
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';

import { IndexComponent } from './index/index.component';

@NgModule({

  imports: [

    CommonModule,

    BusinessRoutingModule

  ],

  declarations: [IndexComponent]
})
export class BusinessModule { }
