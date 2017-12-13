import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent} from './app.component';
import { SinginSingupComponent } from './singin-singup/singin-singup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { CompanyComponent } from './company/company.component';
import { ClientProductsComponent } from './client-products/client-products.component';

import { DataServiceService } from './htpp-services/data-service.service';




import { BodyComponent } from './body/body.component';

export const router: Routes = [
    {
        path: '', component: VisitorsComponent,


        children: [
            {
                path: '', component: ClientProductsComponent ,


            },

            {
                path: 'company', component: CompanyComponent,

            },
            {
                path: 'login', component: SinginSingupComponent
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