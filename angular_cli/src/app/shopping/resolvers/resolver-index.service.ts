import { Injectable } from '@angular/core';

import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../services/data.service';

import { AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverIndexService implements Resolve<any> {

  constructor( private auth : AuthService) { }

  resolve( route:ActivatedRouteSnapshot , state: RouterStateSnapshot ): Observable<any> | Promise<any> | Boolean | Object {

    this.auth.token = this.auth.get_storage( this.auth.token_key ); // get token from local store or null if dose not exists

    this.auth.refresh_token = this.auth.get_storage( this.auth.refresh_token_key ); // get refresh token from local store or null if dose not exists

    return true;

  }


}
