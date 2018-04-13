
import { NgModule     } from '@angular/core';



import { CommonModule } from '@angular/common';

import { ShareModule } from '../share/share.module';

import { ShoppingRoutingModule } from './shopping-routing.module'; // shopping  config router

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgxCarouselModule } from 'ngx-carousel'; // carousel

import 'hammerjs';

import { DataService } from './services/data.service';

import { HeaderService } from './header/header.service'; // header service

import { ProductService } from './products/product.service'; // product service

// end services .....................................................................................


// componets .....................................................

import { IndexComponent } from './index/index.component'; // index shopping

import { HomeComponent } from './home/home.component'; // home shopping

import { HeaderComponent } from './header/header.component'; // header shopping

import { BodyComponent } from './body/body.component'; // body shopping

import { MenuComponent } from './menu/menu.component'; //  menu  left  in shopping



// end components ............................................................................................

@NgModule({

  declarations: [

    IndexComponent,
    HeaderComponent,
    BodyComponent,

    MenuComponent,
    HomeComponent,

  ],

  imports: [
    CommonModule,
    ShoppingRoutingModule,

    NgxCarouselModule,
    ShareModule,

    InfiniteScrollModule

  ],

  providers: [
    DataService,
    HeaderService,
    ProductService
  ]




})
export class ShoppingModule { }

