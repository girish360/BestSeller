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
        'button_login':false,
        'write_type_login':'Client login',
        'click_login_button':false,
        'write_button':'Next',
        'steps':'1',
        'loading':false,
        'error':''

    };

    public user_details_loginForm:any = {

        'username':'',
        'password':'',

    };

  public error_status = false;

    public user_details:any = {};

    email_FormControl_login = new FormControl('', [

        Validators.required,

    ]);

    password_FormControl_login = new FormControl('', [

        Validators.required,
        Validators.minLength(6)

    ]);

    matcher = new MyErrorStateMatcher();



    name(){

    }
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

    check_form_login(){

        if(this.login_property.steps == '1'){

            if( !this.email_FormControl_login.hasError('required') ) {

                if (this.login_property.click_login_button == false) {

                    this.login_property.button_login = false;

                } else {

                    this.login_property.button_login = true;

                }

                return;
            }

        }else{

            if( !this.password_FormControl_login.hasError('minlength')  && !this.password_FormControl_login.hasError('required') ){

                if( this.login_property.click_login_button == false ){

                    this.login_property.button_login = false;

                }else{

                    this.login_property.button_login = true;

                }

                return;
            }

        }

        this.login_property.button_login = true;
    }

    check_user(){

        if(this.error_status != true) {

            if (this.login_property.steps == '1') {

                //request from email .............

                this.login_property.loading = true;

                let response = this.dataservices.Make_Request_InServer("user_email", this.user_details_loginForm.username);

                response.then(result => {

                    if (result != 'false') {

                        this.login_property.loading = false;

                        this.user_details = result[0];

                        this.login_property.steps = '2';

                    } else {

                        this.login_property.loading = false;

                        $('.error').css({visibility: 'visible'}).animate({
                            width: '100%'
                        });

                        this.error_status = true;
                    }

                });
            }
            else if (this.login_property.steps == '2') {

                //request from pass with email ..................
            }
        }
    }

    hide_error(){

        $('.error').animate({

            width:'1%'

        },function(){

            $('.error').css( {visibility:'hidden' })

        });
    }
    keypres(){

         if(this.error_status == true){

             this.hide_error();

             this.error_status = false;

         }

    }
    another_account(){

        this.login_property.steps='1';

    }



}
