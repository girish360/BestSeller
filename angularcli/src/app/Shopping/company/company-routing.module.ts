
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';

import { SearchComponent } from './search/search.component';

import { AboutComponent } from './about/about.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: '' , component : CompanyComponent,

    children:[

      { path:'' , component:HomeComponent },

      { path:'home' , component:HomeComponent },

      { path:'search' , component:SearchComponent },

      { path:'about' , component:AboutComponent },

    ]
  }

];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class CompanyRoutingModule { }
