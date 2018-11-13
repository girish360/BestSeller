import { Component, OnInit , DoCheck} from '@angular/core';

import {FormControl,FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators ,ValidatorFn,ValidationErrors } from '@angular/forms';

import { ActivatedRoute  ,Params , Data , Router} from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';

import { DataService } from '../../services/data.service';

import{ AuthService } from '../../services/auth.service'

import { SetRouterService } from '../../../share_services/set-router.service';

declare var $:any;

/** Error when invalid control is dirty, touched, or submitted. */


export class matcherPassword implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const isSubmitted = form && form.submitted;

    return !!(control && control.parent.get('password').value !== control.parent.get('confirmPassword').value && control.dirty  );

  }

}

export const matchPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const password = control.get('password').value;

  const confirmPassword = control.get('confirmPassword').value;

  return password === confirmPassword ? null :{match:true};

};

export const existEmail: ValidatorFn = ( control: FormGroup): ValidationErrors | null => {

  return { exist:true };

};

export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

@Component({

  selector: 'app-login-register',

  templateUrl: './login_register.component.html',

  styleUrls: ['./login_register.component.scss']

})

export class LoginRegisterComponent implements OnInit {

  constructor( private dataservices : DataService ,
               private auth :AuthService,
               private setRouter :SetRouterService,
               private route :ActivatedRoute,
               private formBuilder : FormBuilder

  ) { this.createForm(); }

  public login_property:any = {

    client_account:true ,
    business_account:false,
    button_login:true,
    loading:false,
    error:''

  };

  public error_status_from_server = false;

  match_pass = new matcherPassword();

  userRegistrationForm: FormGroup;

  // login from group ...............

  signinForm = new FormGroup({

    email: new FormControl('',[ Validators.required ]) ,

    password: new FormControl('',[ Validators.required , Validators.minLength(6)])

  });

   // get login controller

  get emailSignin(){ return this.signinForm.get('email') }

  get passwordSignin(){ return this.signinForm.get('password') }

   // create account from group .....
  signupForm = new FormGroup({

    firstName: new FormControl('',[   Validators.required  ]),

    lastName: new FormControl('',[   Validators.required  ]),

    email: new FormControl('',[   Validators.required  ]),

    password: new FormControl('',[ Validators.required , Validators.minLength(6)]),

    confirmPassword: new FormControl()

  } , {  validators: matchPassword  });


  createForm() {

    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      emailGroup: this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]]
      }, {validator: existEmail}),
      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          Validators.pattern(regExps.password)
        ]],
        confirmPassword: ['', Validators.required]
      }, {validator: matchPassword})
    });
  }

   // get create account controller .....

  get firstName() { return this.userRegistrationForm.get('firstName'); }

  get lastName() { return this.userRegistrationForm.get('lastName'); }

  get email() { return this.userRegistrationForm.get('email'); }

  get password() { return this.userRegistrationForm.get('password'); }

  get confirmPassword() { return this.userRegistrationForm.get('confirmPassword'); }

  ngOnInit() {}

  ngDoCheck() {  }


 // send request in server to crerate account .................
  onSignup(){

    this.auth.login_request = true;

    this.login_property.loading = true;

    this.dataservices.Http_Post( 'shopping/auth/sign_up',this.signupForm.value )

        .subscribe(result => {

          if ( result.body ) {

            let token = result.headers.get('x-token'); // get token from  response header

            let refresh_token = result.headers.get('x-refresh-token'); // get refresh_token from  response header

            if (token && refresh_token) {

              this.auth.token = token; // set token in variable

              this.auth.refresh_token = refresh_token; // set refresh token in variable

              this.auth.set_storage(this.auth.token_key, token);

              this.auth.set_storage(this.auth.refresh_token_key, refresh_token);

            }

            this.auth.client = result.body;

            this.login_property.loading = false;

            this.dataservices.update_app(true);

            this.setRouter.set_router({path: 'shopping/', data: false, relative: false}, this.route);

          } else {

            this.login_property.loading = false;

            this.show_error();

            this.error_status_from_server = true;

            this.login_property.error = 'This email exist';
          }

        }, error => {
        });

    this.auth.login_request = false;

  }


  // send request in  server to check credencials ..........
  onSignin(){  // method check user when user click button in login ................

    this.login_property.loading = true;

    this.auth.login_request = true;

    this.dataservices.Http_Post('shopping/auth/credentials',this.signinForm.value)

        .subscribe(result => {

          if (result.body) {

            let token = result.headers.get('x-token'); // get token from  response header

            let refresh_token = result.headers.get('x-refresh-token'); // get refresh_token from  response header

            if (token && refresh_token) {

              this.auth.token = token; // set token in variable

              this.auth.refresh_token = refresh_token; // set refresh token in variable

              this.auth.set_storage(this.auth.token_key, token);

              this.auth.set_storage(this.auth.refresh_token_key, refresh_token);

            }

            this.auth.client = result.body;

            this.login_property.loading = false;

            this.dataservices.update_app(true);

            this.setRouter.set_router({path: 'shopping/', data: false, relative: false}, this.route);

          } else {

            this.login_property.loading = false;

            this.show_error();

            this.error_status_from_server = true;

            this.login_property.error = 'Email or Password doesnt match';
          }
        }, error => {

        });

      this.auth.login_request = false;

  }

  hide_error(){

    $('.error').animate({

      width:'1%'

    },100,function(){

      $('.error').css( {visibility:'hidden' })

    });
  }

  show_error(){

    $('.error').css({visibility: 'visible'}).animate({

      width: '100%'

    },100);
  }

  keypres(){

    if( this.error_status_from_server == true ){

      this.hide_error();

      this.error_status_from_server = false;
    }


  }

  tabClick(tab){

    this.hide_error();

    this.error_status_from_server = false;

  }



}
