import { Inject, Injectable ,EventEmitter ,OnInit } from '@angular/core';

import { HttpService } from './http.service';

import { AuthService } from './auth.service';

import {  Http, Response , Headers} from '@angular/http';

import 'rxjs/add/operator/map';

import 'rxjs/Rx'

import{BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/interval';

import {Observable} from 'rxjs/Observable';

import{Subject} from 'rxjs/Subject';


@Injectable()

export class DataService extends AuthService implements OnInit{

  constructor( private httpservice : HttpService , protected http:Http  ) {

     super( http );

      let language  = this.Make_Request_InServer( 'language', '1' );

      language.then(response =>{

          this.language = response;

      });
  }
  ngOnInit(){

  }

 ; // identify if cartlist should change

    public subject_language = new  BehaviorSubject<boolean>(true);

     status_language = this.subject_language.asObservable();

  public Header_property:any = {

      selectedIndex:'empty'

  };

  public language :any =[];

  public body_loader=false;

  public Response:any;

  public object_request = {};


  public  create_object_request( status , value ) {

      this.object_request = { status: status , value: value };

  }

  public Make_Request_InServer(  status , value ){ // method that get response from http method  with promise ( resolve  and reject )

    this.object_request = { status: status , value: value };

    return new Promise( ( resolve , reject ) => {

        this.httpservice.Http_Post( this.object_request )

        .subscribe(

            data => {


                resolve( data['data'] );

            },

            error => (error : any) =>  {  reject( false )  }

        );
    });

  }



  update_loader( new_poperty ){

         this.body_loader = new_poperty;

  }

  update_language( new_language ){

      this.language = new_language;
  }



}

