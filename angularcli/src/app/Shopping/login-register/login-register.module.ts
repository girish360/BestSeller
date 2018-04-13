
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { LoginRegisterRoutingModule } from './login-register-routing.module';

import { LoginRegisterComponent } from './login-register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShareModule } from '../../share/share.module';

@NgModule({

  imports: [

    CommonModule,

    LoginRegisterRoutingModule,

    FormsModule,

    ReactiveFormsModule,

    ShareModule


  ],

  declarations: [
    LoginRegisterComponent
  ]

})

export class LoginRegisterModule { }
