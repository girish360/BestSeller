
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { WishListRoutingModule } from './wish-list-routing.module';

import { WishListComponent } from './wish-list.component';

import { ShareModule } from '../../share/share.module';


@NgModule({

  imports: [

    CommonModule,

    WishListRoutingModule,

    ShareModule

  ],

  declarations: [

    WishListComponent,



  ]

})
export class WishListModule { }
