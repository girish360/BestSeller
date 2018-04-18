
// services ......................................................................................

import { BrowserModule } from '@angular/platform-browser';

import { NgModule , APP_INITIALIZER    } from '@angular/core';

import {routes} from './app.router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule } from "@angular/http";

import { HttpService } from './Shopping/services/http.service';

import { AuthService } from './Shopping/services/auth.service';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { EncryptDecryptService } from './Shopping/services/encrypt-decrypt.service'; // crypto service

import { ControllerService } from './Start/controller.service';

import { ScrollbarService } from './share/scrollbar.service';

// end services .....................................................................................

// componets .....................................................

import { AppComponent } from './app.component';

import { ControllerComponent } from './Start/controller/controller.component';

import { NotfoundComponent } from './Shopping/notfound/notfound.component';

import { SetRouterService } from './Shopping/services/set-router.service';

// end components ............................................................................................

@NgModule({

  declarations: [

    AppComponent,

    NotfoundComponent,

    ControllerComponent,
  ],

  imports: [

    BrowserModule,

    BrowserAnimationsModule,

    routes,

    HttpModule,

    DeviceDetectorModule.forRoot()

  ],

  providers: [

    AppComponent,

    SetRouterService,

    HttpService,

    AuthService,

    EncryptDecryptService,

    ControllerService,

    ScrollbarService

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
