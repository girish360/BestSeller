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
import { HtppServicesComponent } from './htpp-services/htpp-services.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CompanyComponent } from './company/company.component';
import { BodyComponent } from './body/body.component';

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
    HttpModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
