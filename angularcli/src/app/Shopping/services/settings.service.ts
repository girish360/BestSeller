import { Injectable } from '@angular/core';

import { DataService } from '../services/data.service';

import { MenuService } from '../menu/menu.service';

@Injectable()

export class SettingsService {

  public menu:any = false;


  constructor(
      private dataservices:DataService ,

      private menuservice :MenuService
  ) {

    this.dataservices.Http_Get( 'shopping/settings/menu' , false ) // make request ......

        .subscribe( //  take success

            data => {

              this.menu =  data;

              this.menuservice.menu.next( this.menu );



            },

            error => console.log( error['data'] ) // take error .....

        );
  }

}
