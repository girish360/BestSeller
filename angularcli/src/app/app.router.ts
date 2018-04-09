import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ControllerComponent } from './Start/controller/controller.component';

import { BusinessComponent } from './Business/business/business.component';

import { SinginSingupComponent } from './Shopping/singin-singup/singin-singup.component';

import { NotfoundComponent } from './Shopping/notfound/notfound.component';

import { IndexComponent } from './Shopping/index/index.component';

import { HomeComponent } from './Shopping/home/home.component';

import { CompanyComponent } from './Shopping/company/company.component';

import { WishListComponent } from './Shopping/wish-list/wish-list.component';

import { SearchComponent } from './Shopping/search/search.component';

import { CardComponent } from './Shopping/card/card.component';

import { ChatComponent } from './Shopping/chat/chat.component';

import { MenuComponent } from './Shopping/menu/menu.component';

import { ProductDetailsComponent } from './Shopping/product-details/product-details.component';

import { ProductsComponent } from './Shopping/products/products.component';

export const router: Routes = [
    {
        path: '', component: ControllerComponent,
    },
    {
        path: 'shopping', component: IndexComponent,

        children: [
            {
                path: '', component: HomeComponent,
            },
            {
                path: 'products/:name/:id/:name', component: ProductsComponent
            },
            {
                path: ':name/:name', component: CompanyComponent
            },
            {
                path: 'login', component: SinginSingupComponent
            },
            {
                path: 'wish', component: WishListComponent
            },
            {
                path: 'card', component: CardComponent
            },
            {
                path: 'search', component: SearchComponent
            },
            {
                path: 'chat', component: ChatComponent
            },
            {
                path: 'menu', component: MenuComponent
            },
            {
                path :':name/:name/:name' , component : ProductDetailsComponent
            }
        ]
    },
    {
        path: 'business', component: BusinessComponent,

        children:[

        ]
    },
    {
        path:'**',component: NotfoundComponent
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);