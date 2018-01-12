import { Injectable } from '@angular/core';

import * as crypto from 'crypto-js';

@Injectable()
export class EncryptDecryptService {

  constructor() { }

  private data_encription:any;

  private data_decription:any;

  public secret_key_company_profile = 'KSweb_company_id-profile_12837';

  public hash(  data ){

   return crypto.MD5(data);

  }

  public encryp_AES( data , key){
    return this.data_encription =  crypto.AES.encrypt( data , key);
  }

  public decrypt_AES( data , key ){

    var bytes  = crypto.AES.decrypt( data.toString(), key );

    return this.data_decription =  bytes.toString(crypto.enc.Utf8);
  }

}
