import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';

import {  Http, Response , Headers} from '@angular/http';

import { HttpService } from './http.service';

@Injectable()

export class AuthService extends HttpService{

  protected router: Router;

  constructor( protected http:Http ) {

    super( http );

    this.isActivate();

  }

 protected isActivate(){

    if ( localStorage.getItem('token') ) {

      // logged in so return true

      return true;
    }
    // not logged in so redirect to login page
    return false;

  }

 protected clearToken(){

    localStorage.removeItem('token');



  }


  protected setToken( id_token ){

    localStorage.setItem('token', id_token);

  }

}
