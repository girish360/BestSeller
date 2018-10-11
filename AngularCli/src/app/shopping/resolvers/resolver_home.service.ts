import { Injectable } from '@angular/core';

import{ Resolve , RouterStateSnapshot , ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from "rxjs/Observable";

import { DataService } from '../services/data.service';

import { HomeService } from '../services/home.service';

@Injectable()

export class ResolverHomeService  implements Resolve<any>{

  constructor(
      private dataservices : DataService,

      private homeservice : HomeService
  )
  {


  }

  resolve( route :ActivatedRouteSnapshot , state : RouterStateSnapshot ):Observable<any> | Promise<any> | Boolean | Object{

    if( this.dataservices.app_rendered ){

       this.homeservice.resolver = true;

       return this.homeservice.load_home();

     }else{

       this.homeservice.resolver = false;

       return false;

     }

  }

}
