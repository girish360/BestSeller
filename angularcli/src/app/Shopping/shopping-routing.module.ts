
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';

import { HomeComponent } from './components/home/home.component';

import { MenuComponent } from './components/menu/menu.component';

import { ProductsComponent } from './components/products/products.component'; // show products for a category

import { NotFoundComponent } from '../share_components/not-found/not-found.component';

import { UsersComponent } from './components/users/users.component'; //  menu  left  in shopping

import { AuthGuard } from './services/auth.guard';

import { ResolverService } from './resolvers/resolver.service';

import { ResolverHomeService } from './resolvers/resolver_home.service';

import { WishListComponent } from './components/wish-list/wish-list.component';

import { SearchComponent } from './components/search/search.component';

const routes: Routes = [

  {
    path: '', component: IndexComponent,

    children: [

      { path: '', component: HomeComponent,resolve :{ home :ResolverHomeService } },

      { path: 'products/:name', component:ProductsComponent,resolve:{  products : ResolverService  } },

      { path: 'company/:details',  loadChildren :'./lazy_modules/company.module#CompanyModule'},

      { path: 'product-details/:name', loadChildren: './lazy_modules/product-details.module#ProductDetailsModule'},

      { path: 'login_register', loadChildren : './lazy_modules/login-register.module#LoginRegisterModule'},

      { path: 'wish_list', component : WishListComponent},

      { path: ':keyword', component:SearchComponent},

      { path: 'users/:name', component: UsersComponent,

        canActivate: [AuthGuard],

      },

      //  { path: 'card_list', component: CardComponent},
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
