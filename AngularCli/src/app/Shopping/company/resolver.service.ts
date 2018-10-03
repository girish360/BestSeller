import { Injectable } from '@angular/core';

import { Resolve , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../services/data.service';

import { CompanyService } from './company.service';

@Injectable()

export class ResolverService implements Resolve<any> {



  constructor( private dataservices :DataService , private company:CompanyService) { }

  resolve( route:ActivatedRouteSnapshot , state: RouterStateSnapshot ): Observable<any> | Promise<any> | Boolean | Object {

      this.dataservices.update_loader(true);

      if( this.dataservices.app_rendered ){

          this.company.resolve = true;

          return  this.company.load_company( route.params ) ;

      }else{

          this.company.resolve = false;

          return false;

      }



  }

}
