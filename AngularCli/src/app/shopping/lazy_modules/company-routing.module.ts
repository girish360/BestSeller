
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from '../components/company/company.component';

import { SearchComponent } from '../components/company/search/search.component';

import { AboutComponent } from '../components/company/about/about.component';

import { HomeComponent } from '../components/company/home/home.component';

import { ProductsComponent } from '../components/products/products.component';

import { CategoriesComponent } from '../components/company/categories/categories.component'; // company categories ........

import { ResolverService } from '../resolvers/resolver_supplier.service';

const routes: Routes = [

  {
    path: '' , component : CompanyComponent,

    resolve:{  company : ResolverService  },

    children:[

      {

        path:'' , component:HomeComponent,

      },

      { path:'search' , component:SearchComponent },

      { path:'about' , component:AboutComponent },

      { path:'categories' , component:CategoriesComponent },

      { path:'products' , component:ProductsComponent },

    ]
  }

];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class CompanyRoutingModule { }
