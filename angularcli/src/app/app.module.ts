import { BrowserModule } from '@angular/platform-browser';

import { NgModule , APP_INITIALIZER    } from '@angular/core';

import { HttpModule } from "@angular/http";

import {routes} from './app.router';

import { AppComponent } from './app.component';

import { VisitorsComponent } from './visitors/visitors.component';

import { SinginSingupComponent } from './singin-singup/singin-singup.component';

import { HeaderComponent } from './header/header.component';

import { CategorysSubscribesComponent } from './categorys-subscribes/categorys-subscribes.component';

import { ClientProductsComponent } from './client-products/client-products.component';

import { ChatComponent } from './chat/chat.component';

import { SlideshowComponent } from './slideshow/slideshow.component';

import { NotfoundComponent } from './notfound/notfound.component';

import { CompanyComponent } from './company/company.component';

import { BodyComponent } from './body/body.component';

import { WishListComponent } from './wish-list/wish-list.component';

import { SearchComponent } from './search/search.component';

import { CardComponent } from './card/card.component';

import { ProductDetailsComponent } from './product-details/product-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CaruselComponent } from './carusel/carusel.component';

import { NgxCarouselModule } from 'ngx-carousel';

import { HttpService } from './services/http.service';

import { DataService } from './services/data.service';

import { FilterPipe } from './filter.pipe';

import { EncryptDecryptService } from './services/encrypt-decrypt.service';

import { AuthService } from './services/auth.service';

import 'hammerjs';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';


export function initProducts( configService: DataService ): Function {

  return () => configService.Make_Request_InServer( 'products' , { 'type': 'default', 'number_click': 1 } ); // makes http request and returns Promise correctly

}

export function initLanguage ( configService: DataService ):Function {

  return () => configService.Make_Request_InServer( 'language', '1' );

}

export function initCategory ( configService: DataService ):Function {

  return () => configService.Make_Request_InServer( 'category', 'category' );

}

export function initWishlist ( configService: DataService ):Function {

  return () => configService.Make_Request_InServer( 'get_wishList', 'wish' );

}

@NgModule({
  declarations: [
    AppComponent,
    VisitorsComponent,
    SinginSingupComponent,
    HeaderComponent,
    CategorysSubscribesComponent,
    ClientProductsComponent,
    ChatComponent,
    SlideshowComponent,
    NotfoundComponent,
    CompanyComponent,
    BodyComponent,
    FilterPipe,
    CaruselComponent,
    WishListComponent,
    SearchComponent,
    CardComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgxCarouselModule

  ],
  providers: [


      AppComponent ,
      HttpService ,
      VisitorsComponent ,
      DataService,

    { provide: APP_INITIALIZER,
      useFactory: initProducts,
      deps: [DataService ,HttpService],
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: initLanguage,
      deps: [DataService ,HttpService],
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: initCategory,
      deps: [DataService ,HttpService],
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: initWishlist,
      deps: [DataService ,HttpService],
      multi: true
    },

      ClientProductsComponent,
      EncryptDecryptService,
      CaruselComponent,
      AuthService



  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
