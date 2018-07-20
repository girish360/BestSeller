import { Injectable } from '@angular/core';

import * as crypto from 'crypto-js';

@Injectable()

export class EncryptDecryptService {

  constructor() {

     this.secret_key = crypto.enc.Hex.parse( this.hash( '?>~!.0!?best_seller!secretkey95,KSWEB></!`~`.' ).toString() ); // inital secret key

     this.secret_iv = crypto.enc.Hex.parse( this.hash( '?>~!.0!?best_seller!ivkey95,KSWEB></!`~`.' ).toString() ); // initial secret iv .........
  }

  private  secret_key:any;

  private secret_iv:any;

  private data_encription:any;

  private data_decription:any;

  public  hash( data ){

    return crypto.MD5( data );

  }

  public encryp_AES( data  ){

    this.data_encription =  crypto.AES.encrypt( `${ data }` , this.secret_key , { iv:this.secret_iv } );

    return this.data_encription = this.data_encription.ciphertext.toString( crypto.enc.Base64 );

  }

  public decrypt_AES( data ){

    let bytes  = crypto.AES.decrypt( data.toString(), this.secret_key, { iv:this.secret_iv } );

    return this.data_decription =  bytes.toString( crypto.enc.Utf8 );

  }



}
