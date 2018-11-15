import { Component, OnInit ,ViewChild ,ElementRef } from '@angular/core';

import {FormControl,FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators ,ValidatorFn,ValidationErrors } from '@angular/forms';

import { ActivatedRoute} from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';

import { DataService } from '../../services/data.service';

import{ AuthService } from '../../services/auth.service'

import { SetRouterService } from '../../../share_services/set-router.service';

declare var $:any;

/** Error when invalid  or form is submitted. without touched  */

export class matcherPassword implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const isSubmitted = form && form.submitted;

    const password = control.parent.get('password').value;

    const confirmPassword = control.parent.get('confirmPassword').value;

    return !!( control  && password !== confirmPassword && isSubmitted  );

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const isSubmitted = form && form.submitted;

    return !!( control && control.invalid && isSubmitted );

  }
}

export const matchPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const password = control.get('password').value;

  const confirmPassword = control.get('confirmPassword').value;

  return password === confirmPassword ? null :{ match:true };

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

  ) { this.createRegisterForm(); this.createLoginForm();  }

  ngOnInit() {}

  //login view child input ......

  @ViewChild('emailInput')

  private emailInput:ElementRef;

  @ViewChild('passwordInput')

  private passwordInput:ElementRef;

  //register view child input ....

  @ViewChild('registerEmailInput')

  private registerEmailInput:ElementRef;

  @ViewChild('registerFirstNameInput')

  private registerFirstNameInput:ElementRef;

  @ViewChild('registerLastNameInput')

  private registerLastNameInput:ElementRef;

  @ViewChild('registerPasswordInput')

  private registerPasswordInput:ElementRef;

  @ViewChild('registerConfirmPasswordInput')

  private registerConfirmPasswordInput:ElementRef;
  //
  public pattern_password = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{3,}';  // password pattern

  public loading = false; // loading spinner in button when send request

  private login_server_error:any = { // login server error

    email:false,  // kept all emails that are tried but are incorrect....
    password:false // kept all passwords that are tried but are incorrect ......

  };

  private register_server_error:any = { // register server error

    email:false // keept all emails that are tried but are incorrect ...

   };

  public registerFistSubtmit = false; // register first submit

  public loginFirstSubmit = false; // login first submit

  match_pass = new matcherPassword(); // error state matcher when confirm password  does not math with password

  matcher =  new MyErrorStateMatcher(); // error state matcher for inputs

  userRegistrationForm: FormGroup; // register form group controler

  userLoginForm : FormGroup; // login form group controler

  createRegisterForm() { // create from group controller for register  .....

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

      email: ['', [
        Validators.required
      ]],

      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          Validators.pattern(this.pattern_password),
          Validators.minLength(8),

        ]],
        confirmPassword: ['']
      }, {validator: matchPassword})
    });
  }

  createLoginForm() {// create form group controller for login

    this.userLoginForm = this.formBuilder.group({
      email: ['', [
        Validators.required
      ]],

      password: ['', [
          Validators.required,
          Validators.pattern(this.pattern_password),
          Validators.minLength(8),

      ]]

    });
  }

  // get login controller

  get loginEmail(){ return this.userLoginForm.get('email') }

  get loginPassword(){ return this.userLoginForm.get('password') }

   // get register controller .....

  get firstName() { return this.userRegistrationForm.get('firstName'); }

  get lastName() { return this.userRegistrationForm.get('lastName'); }

  get email() { return this.userRegistrationForm.get('email'); }

  get password() { return this.userRegistrationForm.get('passwordGroup.password'); }

  get confirmPassword() { return this.userRegistrationForm.get('passwordGroup.confirmPassword'); }

  get passwordGroup(){return this.userRegistrationForm.get('passwordGroup');  }

  onRegisterUser( values ){ // send request in server to crerate account .................

    if( this.userRegistrationForm.valid ){

      this.loading = true;

      this.auth.login_request = true;

      this.dataservices.Http_Post( 'shopping/auth/register_user', values )

          .subscribe(result => {

            if (result.body) {

              let token = result.headers.get('x-token'); // get token from  response header

              let refresh_token = result.headers.get('x-refresh-token'); // get refresh_token from  response header

              if( token && refresh_token ) {

                this.auth.token = token; // set token in variable

                this.auth.refresh_token = refresh_token; // set refresh token in variable

                this.auth.set_storage(this.auth.token_key, token);

                this.auth.set_storage(this.auth.refresh_token_key, refresh_token);

              }

              this.auth.client = result.body;

              this.loading = false;

              this.dataservices.update_app(true);

              this.setRouter.set_router({path: 'shopping/', data: false, relative: false}, this.route);

            }

          }, error => {

            switch (error.status){

              case  403:

                this.loading = false;

                this.userRegistrationForm.controls['email'].setErrors({'incorrect': true});

                this.registerEmailInput.nativeElement.focus();

                if( this.register_server_error.email instanceof Array && this.register_server_error.email !== false ){

                  let new_incorrect_email = { value : values.email }; // set this email in correct try one other .......

                  this.register_server_error.email.push( new_incorrect_email ); // set this email in correct try one other .......

                }else{
                  this.register_server_error.email = [ { value:values.email} ]; // set this email in correct try one other .......
                }

                break;
            }

          });

      this.auth.login_request = false;

    }else{

      this.set_register_focus();

    }

    this.registerFistSubtmit = true;

  }

  onLoginUser(values){  // method check user when user click button in login ................

    if( this.userLoginForm.valid ){

      this.loading = true;

      this.auth.login_request = true;

      this.dataservices.Http_Post('shopping/auth/credentials', values)

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

              this.loading = false;

              this.dataservices.update_app(true);

              this.setRouter.set_router({path: 'shopping/', data: false, relative: false}, this.route);

            }

          }, error => {

            switch (error.status){

              case  404:

                this.loading = false;

                this.userLoginForm.controls['email'].setErrors({'incorrect': true});

                this.emailInput.nativeElement.focus();

                if( this.login_server_error.email instanceof Array && this.login_server_error.email !== false ){

                  let new_incorrect_email = { value : values.email }; // set this email in correct try one other .......

                  this.login_server_error.email.push( new_incorrect_email ); // set this email in correct try one other .......

                }else{
                  this.login_server_error.email = [ { value:values.email} ]; // set this email in correct try one other .......
                }

                break;

              case 401:

                this.loading = false;

                this.userLoginForm.controls['password'].setErrors({'incorrect': true});

                this.passwordInput.nativeElement.focus();

                if( this.login_server_error.password instanceof Array && this.login_server_error.password !== false ){

                  let new_incorrect_password = { value : values.password }; // set this email in correct try one other .......

                  this.login_server_error.password.push( new_incorrect_password ); // set this email in correct try one other .......

                }else{
                  this.login_server_error.password = [ { value:values.password} ]; // set this email in correct try one other .......
                }

                break
            }

          });

      this.auth.login_request = false;



    }else{

      this.set_login_focus(); // check which input should focus on it ............

    }
    this.loginFirstSubmit = true;
  }

  enterLoginInput(form){ // on keydown.enter  login inputs

    if( form.invalid )

      this.set_login_focus();

  }

  enterRegisterInput(form){ // on keydown.enter register inputs

    if( form.invalid )

      this.set_register_focus();
  }

  set_login_focus(){ //  set focus when user click enter on input's login form and when click button but inputs are invalid ....

    if( this.loginEmail.invalid ){

      this.emailInput.nativeElement.focus();

    }
    else if( this.loginPassword.invalid ){

      this.passwordInput.nativeElement.focus();
    }

  }

  set_register_focus(){ // set register input focus or if is not any input invalid submit the form with enter .....

    if( this.firstName.invalid )
      this.registerFirstNameInput.nativeElement.focus();
    else if( this.lastName.invalid )
      this.registerLastNameInput.nativeElement.focus();
    else if ( this.email.invalid)
       this.registerEmailInput.nativeElement.focus();
    else if(this.password.invalid)
     this.registerPasswordInput.nativeElement.focus();
    else if( this.passwordGroup.hasError('match') )
      this.registerConfirmPasswordInput.nativeElement.focus();


  }

  registerInput( values ){ // handler input new character in any inputs of register

    if( this.register_server_error.email instanceof Array && this.register_server_error.email !== false ){

      let foundet = this.register_server_error.email.some(function (item){

        return item.value === values.email;

      });

      if( foundet ){

        this.userRegistrationForm.controls['email'].setErrors({'incorrect':true}); // set  incorret email error .......

      }
    }
  }

  loginInput( values ){ // handler input new character in any inputs of login

    if( this.login_server_error.email instanceof Array && this.login_server_error.email !== false ){

      let foundet = this.login_server_error.email.some(function (item){

        return item.value === values.email;

      });

      if( foundet ){

        this.userLoginForm.controls['email'].setErrors({'incorrect':true}); // set  incorret email error .......

      }
    }

    if( this.login_server_error.password instanceof Array && this.login_server_error.password !== false ){

      let foundet = this.login_server_error.password.some(function (item){

        return item.value === values.password;

      });

      if( foundet ){

        this.userLoginForm.controls['password'].setErrors({'incorrect':true}); // set incorret password error .....

      }
    }

  }

  tabClick(tab){ // tabs  login and register content ......

  }

}
