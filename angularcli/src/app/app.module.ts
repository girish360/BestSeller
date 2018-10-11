
// services ......................................................................................

import { BrowserModule } from '@angular/platform-browser';

import { NgModule , APP_INITIALIZER    } from '@angular/core';

import { routes } from './app.router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule } from "@angular/http";

import { HttpService } from './share_services/http.service';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { EncryptDecryptService } from './share_services/encrypt-decrypt.service'; // crypto service

import { ControllerService } from './cover_app/controller.service';

import { ScrollbarService } from './share_services/scrollbar.service';

import { ShareModule } from './share_module/share.module';


// end services .....................................................................................

// componets .....................................................

import { AppComponent } from './app.component';

import { ControllerComponent } from './cover_app/components/controller/controller.component';

import { SetRouterService } from './share_services/set-router.service';

// end components ............................................................................................

@NgModule({

  declarations: [

    AppComponent,

    ControllerComponent,
  ],

  imports: [

    ShareModule ,

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

    EncryptDecryptService,

    ControllerService,

    ScrollbarService,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
