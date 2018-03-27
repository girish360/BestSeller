import { Injectable } from '@angular/core';

import * as crypto from 'crypto-js';

@Injectable()
export class EncryptDecryptService {

  constructor() { }

  private data_encription:any;

  private data_decription:any;

  private  key = crypto.enc.Hex.parse("0123456789abcdef0123456789abcdef");
  private iv =  crypto.enc.Hex.parse("abcdef9876543210abcdef9876543210");

  public secret_key_encrypt_id = 'KSweb_company_id-profile_12837';

  public secret_key_product_profile = 'KSweb_product_id-profile_12837';

  public hash(  data ){

    return crypto.MD5(data);

  }

  public encryp_AES( data , key ){

     this.data_encription =  crypto.AES.encrypt( `${ data }` , this.key ,{iv:this.iv});

     return this.data_encription = this.data_encription.ciphertext.toString(crypto.enc.Base64);


  }

  public decrypt_AES( data , key ){

    var bytes  = crypto.AES.decrypt( data.toString(), key,{iv:this.iv} );

    return this.data_decription =  bytes.toString(crypto.enc.Utf8);

  }

}
