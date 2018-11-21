import { Inject, Injectable ,EventEmitter ,OnInit } from '@angular/core';

import { HttpService } from '../../share_services/http.service';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import 'rxjs/Rx'

import{ BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/interval';

import {Observable} from 'rxjs/Observable';

import{Subject} from 'rxjs/Subject';

@Injectable({
    providedIn: 'root'
})

export class DataService extends HttpService implements OnInit{

 // identify if cartlist should change

    public resolve:boolean = false;

    public app_rendered :any = false;

    public loaded_component:any = false; // when response is came from server this property become true

    public not_founded:any = false; // when page don't exists this property become true

    private app_progress =  new BehaviorSubject<boolean>(true); // loading page

    public progress = this.app_progress.asObservable();// loading page as async

    private app_spinner =  new BehaviorSubject<boolean>(false); //loading products

    public spinner = this.app_spinner.asObservable();// loading products

    private app_menu =  new BehaviorSubject<boolean>(true); // refresh app menu component

    public menu = this.app_menu.asObservable();// menu as async

    private app_products =  new BehaviorSubject<boolean>(true); // refresh app products component

    public products = this.app_products.asObservable();// products as async

    private app_company =  new BehaviorSubject<boolean>(true); // refresh app company component

    public company = this.app_company.asObservable();// company as async

    private app_header =  new BehaviorSubject<boolean>(true); // refresh app company component

    public header = this.app_header.asObservable();// company as async

    private app_async =  new BehaviorSubject<boolean>(true); // refresh all components in shopping departament

    private app_client = new BehaviorSubject<boolean>(true);

    public client = this.app_client.asObservable();

    private app_search = new BehaviorSubject<boolean>(true);

    public search = this.app_search.asObservable();

    public async = this.app_async.asObservable();// refresh all component as async


    public Header_property:any = {

        selectedIndex:'empty'

    };

    public language :any =[];

    public Response:any;

    public object_request = {};

    public user_info : any;

    public change_inner = false;

    public menu_style : any = {};

    public tabIndex = 0;

  constructor(  protected http:HttpClient  ) {

     super( http );

  }

  ngOnInit(){

  }

  public Make_Request_InServer(  status , value ){ // method that get response from http method  with promise ( resolve  and reject )

    this.object_request = { status: status , value: value };

    return new Promise( ( resolve , reject ) => {

        this.Http_Post('' ,this.object_request )

        .subscribe(

            data => {


                resolve( data );

            },

            error => (error : any) =>  {  reject( false )  }

        );
    });

  }

  update_loader( new_poperty ){

         this.app_progress.next( new_poperty );
  }

  update_spinner( new_poperty ){

      this.app_spinner.next( new_poperty );
  }

  update_language( new_language ){

      this.language = new_language;
  }

  update_body( boolean ){

      this.change_inner = boolean;
  }
  update_menu( boolean ){

      this.app_menu.next ( boolean ) ;
  }

    update_products( boolean ){

        this.app_products.next ( boolean ) ;
    }

    update_company( boolean ){

        this.app_company.next ( boolean ) ;
    }

    update_header( boolean ){

        this.app_header.next( boolean );
    }

    update_client(boolean){

        this.app_client.next(boolean);
    }

    update_search( boolean ){

        this.app_search.next(boolean);
    }


    update_app(boolean){

        this.app_async.next(boolean);
    }





}

