
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginRegisterComponent } from '../components/login_register/login_register.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path:'', component : LoginRegisterComponent,

    canActivate: [AuthGuard],
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class LoginRegisterRoutingModule { }
