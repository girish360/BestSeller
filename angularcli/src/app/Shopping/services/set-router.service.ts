import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable()

export class SetRouterService extends EncryptDecryptService{

    constructor(  private router: Router ) {

     super();

    }

  public set_router( routing , route  ) {

      if ( routing.data == false ) { // router without any data in url ..... ...........................

        if( routing.relative == true ){

          this.router.navigate( [ routing.path ],

              {
                relativeTo: route
              }
          );

        }else{

          this.router.navigate( [ routing.path ] );
        }
        return;
      }

      // router with data in url ..........................................

      let paramsInUrl:any = {};

      if( routing.data instanceof Array ){   //  array of object with params ..........................................

          for( let param of routing.data ){ // loop

              paramsInUrl[param.keyparams] = param.params.toString();
          }

      }else{ // single param ....................................

          paramsInUrl = { [routing.data.keyparams] : routing.data.params.toString() };
      }


      if( routing.relative == true){

        this.router.navigate( [ routing.path ] ,

            {
                relativeTo: route ,  queryParams: paramsInUrl
            }


        );

      }else{

        this.router.navigate( [ routing.path ] ,

            {
                queryParams: paramsInUrl
            }
        );
      }
    return;
  }

}
