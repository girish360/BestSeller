
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { LoginRegisterRoutingModule } from './login-register-routing.module';

import { LoginRegisterComponent } from '../components/login-register/login-register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShareModule } from '../../share_module/share.module';

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
