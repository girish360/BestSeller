
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

import { HomeService } from './home/home.service';

import { MatPaginatorModule } from '@angular/material/paginator';



// end services .....................................................................................

// componets .....................................................

import { IndexComponent } from './index/index.component'; // index shopping

import { HomeComponent } from './home/home.component'; // home shopping

import { HeaderComponent } from './header/header.component'; // header shopping

import { BodyComponent } from './body/body.component'; // body shopping

import { MenuComponent } from './menu/menu.component';

import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

import { FooterComponent } from './footer/footer.component'; //  menu  left  in shopping




// end components ............................................................................................

@NgModule({

  declarations: [
    IndexComponent,
    HeaderComponent,
    BodyComponent,
    MenuComponent,
    HomeComponent,
    SubscriptionsComponent,
    FooterComponent


  ],

  imports: [
    CommonModule,
    ShoppingRoutingModule,
    NgxCarouselModule,
    ShareModule,
    InfiniteScrollModule,
    MatPaginatorModule


  ],

  providers: [
    DataService,
    HeaderService,
    ProductService,
    HomeService
  ]

})

export class ShoppingModule { }

