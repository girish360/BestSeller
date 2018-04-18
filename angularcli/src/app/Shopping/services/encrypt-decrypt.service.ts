import { Injectable } from '@angular/core';

import * as crypto from 'crypto-js';

@Injectable()

export class EncryptDecryptService {

  constructor() {

     let hash_key =  this.hash(this.key);

     let hash_iv =  this.hash(this.iv);

     this.hash_key = hash_key;

     this.hash_iv = hash_iv;


  }

  private data_encription:any;

  private data_decription:any;

  private key ='.0!?best_seller!secretkey95,KSWEB.';

  private iv ='.0!?best_seller!ivkey95,KSWEB.';

  private hash_key : any;

  private hash_iv : any;

  private  secret_key = crypto.enc.Hex.parse("551512955e5010f51c4ea7f0c885fbaa");

  private secret_iv =  crypto.enc.Hex.parse("9323a060b68764eb57732335e30728ea");

  public hash( data ){

    return crypto.MD5( data );

  }

  public encryp_AES( data  ){

    this.data_encription =  crypto.AES.encrypt( `${ data }` , this.secret_key ,{iv:this.secret_iv});

    return this.data_encription = this.data_encription.ciphertext.toString(crypto.enc.Base64);

  }

  public decrypt_AES( data  ){

    let bytes  = crypto.AES.decrypt( data.toString(), this.secret_key,{iv:this.secret_iv} );

    return this.data_decription =  bytes.toString(crypto.enc.Utf8);

  }

}
