
import { NgModule     } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping_routing.module'; // shopping  config router

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgxCarouselModule } from 'ngx-carousel'; // carousel

import 'hammerjs';

import { DataService } from './services/data.service';

import { HeaderService } from './services/header.service'; // header service

import { ProductService } from './services/product.service'; // product service

import { HomeService } from './services/home.service';

import { SettingsService } from './services/settings.service';

import { MenuService } from './services/menu.service';

import { MatPaginatorModule } from '@angular/material/paginator';

import { AuthGuard } from './guards/auth.guard';

import { SearchService } from './services/search.service';

import { ResolveService } from './guards/resolve.service';

import { IndexService } from './services/index.service';

import { CompanyService } from './services/company.service';

import { SwipeMenuService } from './services/swipe-menu.service';

// end services .....................................................................................

// componets .....................................................

import { ShareModule } from '../share_module/share.module';

import { IndexComponent } from './components/index/index.component'; // index shopping

import { HomeComponent } from './components/home/home.component'; // home shopping

import { HeaderComponent } from './components/header/header.component'; // header shopping

import { BodyComponent } from './components/body/body.component'; // body shopping

import { SearchComponent } from './components/search/search.component';

import { MenuComponent } from './components/menu/menu.component';

import { FooterComponent } from './components/footer/footer.component';

import { UsersComponent } from './components/users/users.component'; //  menu  left  in shopping

import { WishListComponent } from './components/wish_list/wish_list.component';

import { CardListComponent } from './components/card_list/card_list.component';

import { AgmCoreModule } from '@agm/core';

import { SwipeMenuComponent } from './components/swipe-menu/swipe-menu.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SettingsContentComponent } from './components/settings-content/settings-content.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';

// end components ............................................................................................

@NgModule({

  declarations: [
    IndexComponent,
    HeaderComponent,
    BodyComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    UsersComponent,
    WishListComponent,
    CardListComponent,
    SearchComponent,
    SwipeMenuComponent,
    ScrollTopComponent,
    SettingsContentComponent,
    ContextMenuComponent

  ],

  imports: [
    CommonModule,
    ShoppingRoutingModule,
    NgxCarouselModule,
    ShareModule,
    InfiniteScrollModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCcuMQUe3S0Qk7WTfy8XnBxQPk79eiTTrk",
      libraries: ["places"]
    }),
  ],

  providers: [
    DataService,
    HeaderService,
    ProductService,
    HomeService,
    SettingsService,
    MenuService,
    AuthGuard,
    ResolveService,
    IndexService,
    CompanyService,
    SearchService,
    SwipeMenuService
  ]

})

export class ShoppingModule { }

