import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable()

export class SetRouterService extends EncryptDecryptService{

  constructor(  private router: Router ) {

     super();

  }



  public set_router( data , route  ) {

      if ( data.data == false ) { // router without any data in url ..... ...........................

        if( data.relative == true ){

          this.router.navigate( [ data.path ],

              {
                relativeTo: route
              }

          );

        }else{

          this.router.navigate( [ data.path ] );
        }
        return;
      }

      // router with data in url ..........................................

      let encryp_id = this.encryp_AES( data.data , this.secret_key_encrypt_id );

      if(data.relative == true){

        this.router.navigate( [ data.path , encryp_id.toString() ],

            {
              relativeTo: route
            }

        );

      }else{

        this.router.navigate( [ data.path , encryp_id.toString() ] );
      }
    return;
  }

}
