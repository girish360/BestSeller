
import { Injectable } from '@angular/core';

import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../services/data.service';

import { ProductService } from '../services/product.service';

import { HomeService } from '../services/home.service';

import { IndexService } from '../services/index.service';

import { CompanyService } from '../services/company.service';

import { ClientService } from '../services/client.service';

@Injectable()

export class ResolveService implements Resolve<any> {

  constructor( private dataservices :DataService ,
               private products:ProductService ,
               private home:HomeService,
               private index :IndexService,
               private company : CompanyService,
               private client:ClientService
  ) { }

  resolve( route:ActivatedRouteSnapshot , state: RouterStateSnapshot ): Observable<any> | Promise<any> | Boolean | Object {

    let component_name  = route.routeConfig.component.name;  // get component name in route that wait to activate

    let n = component_name.indexOf("Component"); // find number of name without " Component " word

    let service_name =  component_name.substr(0,n).toLowerCase();  // sub string without "Component"  word

    let method = 'load_'+service_name;  // method in service .......

    if( this.dataservices.app_rendered ){ // check if is not first load .......................

      this.dataservices.resolve = true;

      return  this[`${service_name}`][`${method}`]( route );

    }else{ //  the first load of app ........................................

      this.dataservices.resolve = false;

      if( service_name == 'index' ){ // index should get token if exists in first load ............

        return  this[`${service_name}`][`${method}`]( route );

      }

      return false;

    }

  }

}