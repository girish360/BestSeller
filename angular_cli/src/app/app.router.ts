

import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ControllerComponent } from './cover_app/components/controller/controller.component';



export const router: Routes = [

    {
        path: '', component: ControllerComponent
    },

    {
        path: 'shopping',  loadChildren : './shopping/shopping.module#ShoppingModule',
    },

    {
        path: 'supplier',  loadChildren : './supplier/supplier.module#SupplierModule',
    },


];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);