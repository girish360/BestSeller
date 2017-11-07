import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent} from './app.component';

import { SinginSingupComponent } from './singin-singup/singin-singup.component';
import { AboutComponent } from './about/about.component';

export const router: Routes = [
    {path: '',redirectTo:'',pathMatch:'full'},
    {path:'login',component: SinginSingupComponent},

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);