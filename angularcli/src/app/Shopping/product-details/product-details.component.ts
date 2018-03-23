import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import { DataService } from '../services/data.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product_id:any;

  my_product: Subscription;

  product_details:any = [];

  constructor( private dataservices :DataService,  private crypto : EncryptDecryptService , private route: ActivatedRoute , private router: Router  ) {

    this.route.params.subscribe( params => {


      this.product_id = crypto.decrypt_AES( params['name'] , crypto.secret_key_encrypt_id )


    });

    this.dataservices.create_object_request( 'product_details',  this.product_id  );

    this.my_product = this.dataservices.Http_Post( this.dataservices.object_request ) // make request ......

        .subscribe( //  take success

            data => {

              if ( data['status'] == 'product_details' ) {

               this.product_details = data['data']['product'];

               console.log( this.product_details);
              }
            },

            error => console.log( error['data'] ) // take error .....

        );



  }

  ngOnInit() {
  }

}
