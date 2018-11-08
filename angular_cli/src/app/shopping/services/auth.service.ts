import { Injectable } from '@angular/core';

import { DataService } from './data.service';

import { Observable } from 'rxjs/Observable';

import { HttpClient   } from '@angular/common/http';

import { SetRouterService } from '../../share_services/set-router.service';

import { ProductService } from './product.service';

import{ Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public client:any = {};

  public token_key = 'bestseller_token';

  public refresh_token_key = 'bestseller_refresh_token';

  public refresh_token:any;

  public token:any;

  public login_request:boolean = false;

  public refresh_token_request:boolean = false;

  constructor( private productsService :ProductService, private set_router :SetRouterService ,private dataservices : DataService , private http : HttpClient , private router: Router ) {

  }

  refreshToken( clientSignature ): Observable<any> { //  refresh token when any request bring 401 status  Unauthorized .. ... ..

    return this.dataservices.Http_Get('shopping/auth/refresh_token', false );

  }

  logout() {

    this.remove_storage(this.refresh_token_key);

    this.remove_storage( this.token_key);

    this.token = false;

    this.refresh_token = false;

    this.productsService.hide_dropdown_button('dropclient','.bodydropclient');

    this.set_router.set_router( { path:'shopping/', data:false ,relative:false },false);

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

  guid(){

    let nav = window.navigator;
    let screen = window.screen;
    let mimeTypes = nav.mimeTypes.length;
    let userAgent = nav.userAgent.replace(/\D+/g, '');
    let plugins = nav.plugins.length;
    let height = screen.height || '';
    let width = screen.width || '';
    let pixelDepth = screen.pixelDepth || '';

    return mimeTypes+userAgent+plugins+height+width+pixelDepth;

  }



}
