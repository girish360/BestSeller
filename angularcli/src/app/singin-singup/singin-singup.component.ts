import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

  public client_account = true;

  public business_account = false;

  public check_email_loading = false;

  public button_login:boolean;

  public write_type_login = ' Client login';

  public value_email;

  public click_login_button=false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() { }




  ngOnInit() {




  }

  set_type_account( type_account ){

      if( type_account == 'client' ){

         if( this.client_account != true ){

           this.client_account = !this.client_account;

           this.business_account = !this.business_account;

           this.write_type_login = 'Client login';
         }
         return;
      }
      if( this.business_account != true ){

        this.client_account = !this.client_account;

        this.business_account = !this.business_account;

        this.write_type_login = 'Business login';
      }
  }

  check_email(){

    if( !this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required') ){

        if(this.click_login_button == false){
           this.button_login = false;
        }else{
          this.button_login = true;
        }
        return;
     }
     this.button_login = true;
  }

  get_email(email){
alert(email.value);
   this.click_login_button = true;
   this.check_email_loading = true;



  }



}
