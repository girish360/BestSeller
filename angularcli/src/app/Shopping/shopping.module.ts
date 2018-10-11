
import { NgModule     } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module'; // shopping  config router

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

import { AuthGuard } from './services/auth.guard';

import { SearchService } from './services/search.service';

import { ResolverService } from './resolvers/resolver.service';

import { ResolverHomeService } from './resolvers/resolver_home.service';

import { IndexService } from './services/index.service';

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

import { WishListComponent } from './components/wish-list/wish-list.component';

import { CardListComponent } from './components/card-list/card-list.component';

import { AgmCoreModule } from '@agm/core';

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
    SearchComponent

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
    ResolverService,
    ResolverHomeService,
    IndexService,
    SearchService
  ]

})

export class ShoppingModule { }

