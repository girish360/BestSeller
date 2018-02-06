import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { MoreHeaderComponent } from './more-header/more-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CaruselComponent } from './carusel/carusel.component';
import { NgxCarouselModule } from 'ngx-carousel';
import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';
import { FilterPipe } from './filter.pipe';
import { EncryptDecryptService } from './services/encrypt-decrypt.service';
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
    MoreHeaderComponent
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
      ClientProductsComponent,
      EncryptDecryptService,
      CaruselComponent

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
