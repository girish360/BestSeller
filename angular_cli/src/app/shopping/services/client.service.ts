import { Injectable } from '@angular/core';

import { Observable  } from "rxjs";

import {DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
      private dataservices:DataService

  ) { }

  public load_client( params ): Observable<any> { // load client method   .................

    let client = params.params.client;

    let client_name;

    let client_id;

    if ( client.includes("@") ) {

      let index = client.indexOf('@');

      client_name = client.substring(0, index);

      client_id = client.substring(index + 1, client.length);

      if (!isNaN(client_id) && ( client_name instanceof String || isNaN(parseInt(client_name)) )) {

        let client_data = {

          client_id: client_id,

          client_name: client_name

        }; // inital  can change later ....

        return  this.dataservices.Http_Get('shopping/client/load_client', client_data); // make request ......

      }else { // // does not exists this page name must be string and id must be number ..........

        return Observable.of(false);

      }

    }else{ // does not exists this page @ symbol is not included ..........

      return Observable.of(false);

    }

  }

}
