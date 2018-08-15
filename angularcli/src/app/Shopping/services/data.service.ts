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

 // identify if cartlist should change

    public subject_language = new  BehaviorSubject<boolean>(true);

    public status_language = this.subject_language.asObservable();

    private subject_progress =  new BehaviorSubject<boolean>(true); // loading page

    public loading_progress = this.subject_progress.asObservable();// loading page

    private subject_spinner =  new BehaviorSubject<boolean>(false); //loading products

    public loading_spinner = this.subject_spinner.asObservable();// loading products

    private subject_menu =  new BehaviorSubject<boolean>(true); //loading products

    public status_menu = this.subject_menu.asObservable();// loading products


    public Header_property:any = {

        selectedIndex:'empty'

    };

    public language :any =[];

    public Response:any;

    public object_request = {};

    public user_info : any;

    public change_inner = false;

    public menu_style : any = {'height':'calc( 100vh - 40px  )'};

  constructor( private httpservice : HttpService , protected http:Http  ) {

     super( http );

  }
  ngOnInit(){

  }



  public Make_Request_InServer(  status , value ){ // method that get response from http method  with promise ( resolve  and reject )

    this.object_request = { status: status , value: value };

    return new Promise( ( resolve , reject ) => {

        this.httpservice.Http_Post('' ,this.object_request )

        .subscribe(

            data => {


                resolve( data['data'] );

            },

            error => (error : any) =>  {  reject( false )  }

        );
    });

  }

  update_loader( new_poperty ){

         this.subject_progress.next( new_poperty );
  }

  update_spinner( new_poperty ){

      this.subject_spinner.next( new_poperty );
  }

  update_language( new_language ){

      this.language = new_language;
  }

  update_body( boolean ){

      this.change_inner = boolean;
  }
  update_menu( boolean ){

      this.subject_menu.next ( boolean ) ;
  }



}

