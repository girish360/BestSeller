import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import {routes} from './app.router';
import { AppComponent } from './app.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { SinginSingupComponent } from './singin-singup/singin-singup.component';
import { HeaderComponent } from './header/header.component';
import { CategorysSubscribesComponent } from './categorys-subscribes/categorys-subscribes.component';
import { ClientProductsComponent } from './client-products/client-products.component';
import { ChatComponent } from './chat/chat.component';
import { HtppServicesComponent } from './htpp-services/htpp-services.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CompanyComponent } from './company/company.component';
import { BodyComponent } from './body/body.component';
import { DataServiceService } from './htpp-services/data-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    HtppServicesComponent,
    SlideshowComponent,
    NotfoundComponent,
    CompanyComponent,
    BodyComponent


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

  ],
  providers: [AppComponent , HtppServicesComponent ,VisitorsComponent ,DataServiceService,ClientProductsComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
