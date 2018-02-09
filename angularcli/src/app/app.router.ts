import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent} from './app.component';
import { SinginSingupComponent } from './singin-singup/singin-singup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { CompanyComponent } from './company/company.component';
import { ClientProductsComponent } from './client-products/client-products.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { SearchComponent } from './search/search.component';
import { CardComponent } from './card/card.component';
import { MoreHeaderComponent } from './more-header/more-header.component';
import { ChatComponent } from './chat/chat.component';
import { CategorysSubscribesComponent } from './categorys-subscribes/categorys-subscribes.component';

import { BodyComponent } from './body/body.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
export const router: Routes = [
    {
        path: '', component: VisitorsComponent,


        children: [
            {
                path: '', component: ClientProductsComponent
            },
            {
                path: 'company', component: CompanyComponent
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
                path: 'more', component: MoreHeaderComponent
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
            },

        ]
    },

    {
        path: 'bussines', component: CompanyComponent
    },

    {
        path:'company',component: CompanyComponent

    },
    {
        path:'**',component: NotfoundComponent
    }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);