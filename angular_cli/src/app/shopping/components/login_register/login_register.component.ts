import { Component, OnInit , DoCheck} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import {  ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';

import { DataService } from '../../services/data.service';

import{ AuthService } from '../../services/auth.service'

import { SetRouterService } from '../../../share_services/set-router.service';

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

  templateUrl: './login_register.component.html',

  styleUrls: ['./login_register.component.css']

})

export class LoginRegisterComponent implements OnInit {

  constructor( private dataservices : DataService ,
               private auth :AuthService,
               private setRouter :SetRouterService,
               private route :ActivatedRoute
  ) { }

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

  ngDoCheck()
{

  this.check_form_login();

}



  check_form_login(){

    if( this.error_status_from_server != true ) {


      if (!this.password_FormControl_login.hasError('minlength') &&
            !this.password_FormControl_login.hasError('required') &&
            !this.email_FormControl_login.hasError('required') ) {

          this.login_property.button_login = false;

        } else {

          this.login_property.button_login = true;


      }


    }else{

      this.login_property.button_login = true;
    }
  }



  check_user(){  // method check user when user click button in login ................

    this.login_property.loading = true;

    this.auth.login_request = true;

    this.dataservices.Http_Post('shopping/auth/credentials',

            { 'username':this.user_details_loginForm.username , 'password':this.user_details_loginForm.password })

             .subscribe( result => {

               if ( result.body ) {

                 let token = result.headers.get('x-token'); // get token from  response header

                 let refresh_token = result.headers.get('x-refresh-token'); // get refresh_token from  response header

                 if( token && refresh_token  ){

                   this.auth.token = token; // set token in variable

                   this.auth.refresh_token = refresh_token; // set refresh token in variable

                   this.auth.set_storage(this.auth.token_key , token );

                   this.auth.set_storage(this.auth.refresh_token_key , refresh_token );

                 }

                 this.auth.client = result.body;

                 this.login_property.loading = false;

                 this.user_details = result.body;

                 this.dataservices.update_app(true);

                 this.setRouter.set_router( { path:'shopping/client/'+this.auth.client.first_name , data:false , relative:false},this.route);

               } else {

                 this.login_property.loading = false;

                 this.show_error();

                 this.login_property.button_login = true;

                 this.error_status_from_server = true;

                 this.login_property.error='Email or Password doesnt match';
               }


             },error => {} );


    this.auth.login_request = false;
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



  }

}
