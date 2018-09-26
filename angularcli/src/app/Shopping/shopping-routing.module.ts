
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

import { HomeComponent } from './home/home.component';

import { MenuComponent } from './menu/menu.component';

import { ProductsComponent } from './products/products.component'; // show products for a category

import { NotFoundComponent } from '../share/not-found/not-found.component';

const routes: Routes = [

  {
    path: '', component: IndexComponent,

    children: [

      { path: '', component: HomeComponent },

      { path: 'products/:name', component:ProductsComponent },

      { path: 'company/:details',  loadChildren :'./company/company.module#CompanyModule'},

      { path: 'product-details/:name', loadChildren: './product-details/product-details.module#ProductDetailsModule'},

      { path: 'login-register', loadChildren : './login-register/login-register.module#LoginRegisterModule'},

      { path: 'wish-list/:id', loadChildren : './wish-list/wish-list.module#WishListModule'},

      { path: ':keyword', loadChildren: './search/search.module#SearchModule'},

      // { path: 'card', component: CardComponent},
      //
      // { path: 'search', component: SearchComponent},
      //
      // { path: 'chat', component: ChatComponent},

      { path: 'menu', component: MenuComponent},

      { path:'**',component: NotFoundComponent }

    ]

  }

];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class ShoppingRoutingModule { }
