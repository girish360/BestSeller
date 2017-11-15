import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";


import {routes} from './app.router';
import { AppComponent } from './app.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { SinginSingupComponent } from './singin-singup/singin-singup.component';
import { HeaderComponent } from './header/header.component';
import { CategorysSubscribesComponent } from './categorys-subscribes/categorys-subscribes.component';
import { ClientProductsComponent } from './client-products/client-products.component';



@NgModule({
  declarations: [
    AppComponent,
    VisitorsComponent,
    SinginSingupComponent,
    HeaderComponent,
    CategorysSubscribesComponent,
    ClientProductsComponent


  ],
  imports: [
    BrowserModule,
    routes,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
