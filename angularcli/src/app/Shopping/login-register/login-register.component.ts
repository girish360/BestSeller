import { Component, OnInit , DoCheck} from '@angular/core';

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

  selector: 'app-login-register',

  templateUrl: './login-register.component.html',

  styleUrls: ['./login-register.component.css']

})

export class LoginRegisterComponent implements OnInit {

  constructor( private dataservices : DataService ) { }

  public login_property:any = {

    'client_account':true ,
    'business_account':false,
    'button_login':true,
    'write_type_login':'Client login',
    'write_button':'Next',
    'steps':'1',
    'loading':false,
    'error':''

  };

  public user_details_loginForm:any = {

    'username':'',
    'password':'',

  };

  public error_status_from_server = false;

  public user_details:any = {};

  email_FormControl_login = new FormControl('', [

    Validators.required,

  ]);

  password_FormControl_login = new FormControl('', [

    Validators.required,
    Validators.minLength(6)

  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {


  }

  ngDoCheck(){

    this.check_form_login();

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


  check_form_login(){

    if( this.error_status_from_server != true ) {

      if (this.login_property.steps == '1') {

        if (!this.email_FormControl_login.hasError('required')) {

          this.login_property.button_login = false;

        } else {

          this.login_property.button_login = true;


        }

      } else {

        if (!this.password_FormControl_login.hasError('minlength') && !this.password_FormControl_login.hasError('required')) {

          this.login_property.button_login = false;

        } else {

          this.login_property.button_login = true;


        }

      }
    }else{

      this.login_property.button_login = true;
    }
  }



  check_user(){  // method check user when user click button in login ................
    if( this.error_status_from_server != true ) {

      if (this.login_property.steps == '1') { // check email ore usrname in database
        //request from email .............
        this.login_property.loading = true;

        let response = this.dataservices.Make_Request_InServer("check_email", this.user_details_loginForm.username);

        response.then(result => {

          if (result != 'false') {

            this.login_property.loading = false;

            this.user_details = result[0];

            this.login_property.steps = '2';

          } else {

            this.login_property.loading = false;

            this.show_error();

            this.login_property.button_login = true;

            this.error_status_from_server = true;

            this.login_property.error='This Email dont exists';
          }

        });
      }
      else if (this.login_property.steps == '2') { // check password with this email ore username that is seted before password
        this.login_property.loading = true;

        let response = this.dataservices.Make_Request_InServer("check_password",
            { 'username':this.user_details_loginForm.username , 'password':this.user_details_loginForm.password } );

        response.then(result => {

          if (result != 'false') {

            this.login_property.loading = false;

            this.user_details = result[0];

            this.login_property.steps = '2';

            console.log(result);

          } else {

            this.login_property.loading = false;

            this.show_error();

            this.login_property.button_login = true;

            this.error_status_from_server = true;

            this.login_property.error='Password isnot match with your email';
          }

        });
      }
    }
  }
  kot(){
    let response = this.dataservices.Make_Request_InServer("kot","kot");

    response.then(result => {

      console.log(result);

    });

  }


  hide_error(){

    $('.error').animate({

      width:'1%'

    },function(){

      $('.error').css( {visibility:'hidden' })

    });
  }

  show_error(){

    $('.error').css({visibility: 'visible'}).animate({

      width: '100%'

    });
  }

  keypres(){

    if( this.error_status_from_server == true ){

      this.hide_error();

      this.error_status_from_server = false;
    }


  }

  another_account(){

    this.login_property.steps='1';

  }

}
