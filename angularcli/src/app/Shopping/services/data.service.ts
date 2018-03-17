import { Inject, Injectable ,EventEmitter ,OnInit } from '@angular/core';

import { HttpService } from './http.service';

import {Observable} from 'rxjs/Observable';

import { AuthService } from './auth.service';

import {  Http, Response , Headers} from '@angular/http';

import 'rxjs/add/operator/map';

import 'rxjs/Rx'

@Injectable()

export class DataService extends AuthService implements OnInit{

  constructor( private httpservice : HttpService , protected http:Http  ) {

     super( http );

      let language  = this.Make_Request_InServer( 'language', '1' );

      language.then(response =>{

          this.language=response;

      });


  }
  ngOnInit(){

  }

  public Header_property:any = {
      selectedIndex:'empty'
  };

  public body_loader=false;

  public language:any={};

  public cartList:any = [] ;

  public products:any = [];

  public Response:any;

  public object_request = {};

  public categorys:any = [];



  public  create_object_request( status , value ) {

      this.object_request = { status: status , value: value };

  }

  public Make_Request_InServer(  status , value ){ // method that get response from http method  with promise ( resolve  and reject )

    this.object_request = { status: status , value: value };

    return new Promise( ( resolve , reject ) => {

        this.httpservice.Http_Post( this.object_request )

        .subscribe(

            data => {

                this.check_response( data );

                resolve( data['data'] );

            },

            error => (error : any) =>  {  reject( false )  }

        );
    });

  }

    check_response( data ){

      if ( data['status'] == 'products' ) {

          this.products = data['data'];

      }

      else if (data['status'] == 'category') {

          this.categorys = data['data']
      }

      else if( data['status']=='language' ) {

          this.language = data['data'];


      }
      else if( data['status']=='cartList' ) {

          this.cartList = data['data'];

      }
  }

  update_loader( new_poperty ){

         this.body_loader = new_poperty;

  }

  update_language( new_language ){

      this.language = new_language;
  }

  update_cartList( new_cartList ){

      this.cartList = new_cartList;
  }

}

