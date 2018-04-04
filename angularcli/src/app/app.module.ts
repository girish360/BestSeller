
// services ......................................................................................

import { BrowserModule } from '@angular/platform-browser';

import { NgModule , APP_INITIALIZER    } from '@angular/core';

import { HttpModule } from "@angular/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {routes} from './app.router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgxCarouselModule } from 'ngx-carousel';

import 'hammerjs';

import { HttpService } from './Shopping/services/http.service';

import { DataService } from './Shopping/services/data.service';

import { FilterPipe } from './filter.pipe';

import { EncryptDecryptService } from './Shopping/services/encrypt-decrypt.service';

import { AuthService } from './Shopping/services/auth.service';

import { SetRouterService } from './Shopping/services/set-router.service';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { HeaderService } from './Shopping/header/header.service';

import { ProductService } from './Shopping/products/product.service';

// end services .....................................................................................


// componets .....................................................

import { AppComponent } from './app.component';

import { ControllerComponent } from './Start/controller/controller.component';

import { IndexComponent } from './Shopping/index/index.component';

import { HomeComponent } from './Shopping/home/home.component';

import { BusinessComponent } from './Business/business/business.component';

import { SinginSingupComponent } from './Shopping/singin-singup/singin-singup.component';

import { HeaderComponent } from './Shopping/header/header.component';

import { ChatComponent } from './Shopping/chat/chat.component';

import { SlideshowComponent } from './Shopping/slideshow/slideshow.component';

import { NotfoundComponent } from './Shopping/notfound/notfound.component';

import { CompanyComponent } from './Shopping/company/company.component';

import { BodyComponent } from './Shopping/body/body.component';

import { WishListComponent } from './Shopping/wish-list/wish-list.component';

import { SearchComponent } from './Shopping/search/search.component';

import { CardComponent } from './Shopping/card/card.component';

import { ProductDetailsComponent } from './Shopping/product-details/product-details.component';

import { CaruselComponent } from './Shopping/carusel/carusel.component';

import { MenuComponent } from './Shopping/menu/menu.component'; //  menu  left  in shopping

import { ProductsComponent } from './Shopping/products/products.component'; // show products for a category

import { CategoriesComponent } from './Shopping/categories/categories.component'; // show categories with some products


// end components ............................................................................................


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




@NgModule({
  declarations: [
    AppComponent,
    SinginSingupComponent,
    HeaderComponent,
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
    ProductDetailsComponent,
    ControllerComponent,
    BusinessComponent,
    MenuComponent,
    ProductsComponent,
    CategoriesComponent,
    IndexComponent,
    HomeComponent


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
    NgxCarouselModule,
    DeviceDetectorModule.forRoot()

  ],
  providers: [

    AppComponent ,
    HttpService ,
    DataService,
    EncryptDecryptService,
    AuthService,
    SetRouterService,
    HeaderService,
    ProductService,
    ProductsComponent


  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
