import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';

@Injectable()

export class AuthService {

  constructor( private router: Router ) {

    this.canActivate();

  }


  canActivate() {

    if ( localStorage.getItem('token') ) {

      // logged in so return true

      return true;
    }
    // not logged in so redirect to login page
    return false;

  }

  clearToken(){

    localStorage.removeItem('token');

  }


  setToken(id_token ){

    localStorage.setItem('token', id_token);

  }

}
