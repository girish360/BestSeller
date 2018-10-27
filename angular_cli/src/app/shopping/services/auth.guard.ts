import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor( private auth:AuthService ){

  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.status;

  }



}
