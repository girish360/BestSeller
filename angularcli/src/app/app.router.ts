import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ControllerComponent } from './Start/controller/controller.component';

import { BusinessComponent } from './Business/business/business.component';

import { SinginSingupComponent } from './Shopping/singin-singup/singin-singup.component';

import { NotfoundComponent } from './Shopping/notfound/notfound.component';

import { VisitorsComponent } from './Shopping/visitors/visitors.component';

import { CompanyComponent } from './Shopping/company/company.component';

import { ClientProductsComponent } from './Shopping/client-products/client-products.component';

import { WishListComponent } from './Shopping/wish-list/wish-list.component';

import { SearchComponent } from './Shopping/search/search.component';

import { CardComponent } from './Shopping/card/card.component';

import { ChatComponent } from './Shopping/chat/chat.component';

import { CategorysSubscribesComponent } from './Shopping/categorys-subscribes/categorys-subscribes.component';

import { ProductDetailsComponent } from './Shopping/product-details/product-details.component';

export const router: Routes = [
    {
        path: '', component: ControllerComponent,
    },

    {
        path: 'shopping', component: VisitorsComponent,

        children: [
            {
                path: '', component: ClientProductsComponent,
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
                path: 'menu', component: CategorysSubscribesComponent
            },
            {
                path :'product_details' , component : ProductDetailsComponent
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