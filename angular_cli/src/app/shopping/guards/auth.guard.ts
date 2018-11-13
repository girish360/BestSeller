import { Injectable } from '@angular/core';

import { CanActivate ,CanDeactivate , ActivatedRouteSnapshot, RouterStateSnapshot,CanLoad,CanActivateChild } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../services/data.service';

import { IndexService } from '../services/index.service';

import { SetRouterService } from '../../share_services/set-router.service';

import {LoginRegisterComponent} from '../components/login_register/login_register.component';


@Injectable()


export class AuthGuard implements CanActivate {

  constructor( private set_router : SetRouterService ,private index:IndexService, private auth:AuthService , private dataservices:DataService ){

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {

    let component_name = route.routeConfig.component.name;

     if( component_name == 'ClientComponent' ){

       if( !this.dataservices.app_rendered ){ // if is first load

         this.index.load_index();

         if( this.auth.token ){ //token exists  give access

           return true;

         }
         // token does not exists  go to login panel
         this.set_router.set_router( { path:'shopping/login_register', data:false ,relative:false },false);

         return false;

       }else{
         if( this.auth.token ){ //token exists  give access

           return true;

         }
         // token does not exists  go to login panel
         this.set_router.set_router( { path:'shopping/login_register', data:false ,relative:false },false);

         return false;
       }




     }else if( component_name == 'LoginRegisterComponent'){

       if(!this.dataservices.app_rendered){ // if is first load

         this.index.load_index();

       }

       if( this.auth.token ){ //token exists  give access

         this.set_router.set_router( { path:'shopping/', data:false ,relative:false },false);

         return false;

       }
       // token does not exists  go to login panel
       return true;

     }

  }



}
