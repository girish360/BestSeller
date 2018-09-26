

import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ControllerComponent } from './Start/controller/controller.component';

import { NotFoundComponent } from './share/not-found/not-found.component';

export const router: Routes = [

    {
        path: '', component: ControllerComponent,
    },

    {
        path: 'shopping',  loadChildren : './Shopping/shopping.module#ShoppingModule',
    },

    {
        path: 'business',  loadChildren : './business/business.module#BusinessModule',
    },

    {
        path:'**',component: NotFoundComponent
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);