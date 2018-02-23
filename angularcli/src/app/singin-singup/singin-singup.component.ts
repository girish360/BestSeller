import { Component, OnInit} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';

import { DataService } from '../services/data.service';

declare var $:any;


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-singin-singup',
  templateUrl: './singin-singup.component.html',
  styleUrls: ['./singin-singup.component.css']
})



export class SinginSingupComponent implements OnInit {

    constructor( private dataservices : DataService ) {

    }

    public login_property ={

        'client_account':true ,
        'business_account':false,
        'check_email_loading':false,
        'button_login':false,
        'write_type_login':'Client login',
        'click_login_button':false

    };

    public user_detail = {

        'username':'',
        'password':'',
        'type_login':''

    };



  emailFormControl = new FormControl('', [

    Validators.required,
    Validators.email,

  ]);

  matcher = new MyErrorStateMatcher();




  ngOnInit() {


  }

  set_type_account( type_account ){

      if( type_account == 'client' ){

         if( this.login_property.client_account != true ){

           this.login_property.client_account = !this.login_property.client_account;

           this.login_property.business_account = !this.login_property.business_account;

           this.login_property.write_type_login = 'Client login';
         }
         return;
      }
      if( this.login_property.business_account != true ){

        this.login_property.client_account = !this.login_property.client_account;

        this.login_property.business_account = !this.login_property.business_account;

        this.login_property.write_type_login = 'Business login';
      }
  }

  check_email(){

    if( !this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required') ){

        if(this.login_property.click_login_button == false){

           this.login_property.button_login = false;

        }else{

          this.login_property.button_login = true;

        }

        return;
     }
     this.login_property.button_login = true;
  }

  get_email(email){

         alert(email.value);

         this.login_property.click_login_button = true;

         this.login_property.check_email_loading = true;

  }



}
