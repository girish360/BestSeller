import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public client:any = {};

  public status:boolean = false;

  public token_key = 'bestseller_token';

  constructor() {


  }

  set_storage( key ,data ){

    localStorage.setItem( key, data );

  }

  get_storage( key ){

   return localStorage.getItem(key);

  }

  remove_storage(key){

    localStorage.removeItem(key);

  }

}
