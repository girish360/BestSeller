
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginRegisterComponent } from '../components/login-register/login-register.component';

const routes: Routes = [
  { path:'', component : LoginRegisterComponent }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class LoginRegisterRoutingModule { }
