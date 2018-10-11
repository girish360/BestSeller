
import { Injectable } from '@angular/core';

import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../services/data.service';

import { ProductService } from '../services/product.service';

@Injectable()

export class ResolverService implements Resolve<any> {

  constructor( private dataservices :DataService , private productServices:ProductService) { }

  resolve( route:ActivatedRouteSnapshot , state: RouterStateSnapshot ): Observable<any> | Promise<any> | Boolean | Object {

    if( this.dataservices.app_rendered ){

      this.productServices.resolver = true;

      return  this.productServices.load_products( route.queryParams ) ;

    }else{

      this.productServices.resolver = false;

      return false;

    }

  }

}