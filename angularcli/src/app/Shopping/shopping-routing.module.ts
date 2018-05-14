
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

import { HomeComponent } from './home/home.component';

import { MenuComponent } from './menu/menu.component';

import { ProductsComponent } from './products/products.component'; // show products for a category

const routes: Routes = [

  {
    path: '', component: IndexComponent,

    children: [

      { path: '', component: HomeComponent },

      { path: 'products/:name/:id/:name', component:ProductsComponent },

      { path: ':name/:name',  loadChildren :'./company/company.module#CompanyModule'},

      { path: 'login', loadChildren : './login-register/login-register.module#LoginRegisterModule'},

      { path: 'wish', loadChildren : './wish-list/wish-list.module#WishListModule' },

      // { path: 'card', component: CardComponent},
      //
      // { path: 'search', component: SearchComponent},
      //
      // { path: 'chat', component: ChatComponent},

      { path: 'menu', component: MenuComponent},

      { path: ':name/:name/:name', loadChildren: './product-details/product-details.module#ProductDetailsModule'}
    ]
  }

];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class ShoppingRoutingModule { }
