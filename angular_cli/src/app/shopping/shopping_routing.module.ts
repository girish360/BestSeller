
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

import { ResolverIndexService } from './resolvers/resolver-index.service';

import { WishListComponent } from './components/wish_list/wish_list.component';

import { CardListComponent } from './components/card_list/card_list.component';

import { SearchComponent } from './components/search/search.component';

const routes: Routes = [

  {
    path: '', component: IndexComponent, resolve : {index :ResolverIndexService },

    children: [

      { path: '', component: HomeComponent,resolve :{ home :ResolverHomeService } },

      { path: 'products/:name', component:ProductsComponent,resolve:{  products : ResolverService  } },

      { path: 'company/:details',  loadChildren :'./lazy_modules/company.module#CompanyModule'},

      { path: 'product_details/:name', loadChildren: './lazy_modules/product_details.module#ProductDetailsModule'},

      { path: 'login_register', loadChildren : './lazy_modules/login_register.module#LoginRegisterModule'},

      { path: 'wish_list', component : WishListComponent},

      { path: 'cart_list', component : CardListComponent},

      { path: 'menu', component: MenuComponent},

      { path: ':keyword', component:SearchComponent},

      { path: 'client/:name', component: UsersComponent,

        canActivate: [AuthGuard],

      },

      //  { path: 'card_list', component: CardComponent},
      //
      // { path: 'search', component: SearchComponent},
      //
      // { path: 'chat', component: ChatComponent},



      { path:'**',component: NotFoundComponent }

    ]

  }

];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class ShoppingRoutingModule { }
