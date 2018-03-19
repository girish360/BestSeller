import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product_id:any;

  constructor( private crypto : EncryptDecryptService , private route: ActivatedRoute , private router: Router  ) {

    this.route.params.subscribe( params => {


      this.product_id = crypto.decrypt_AES( params['name'] , crypto.secret_key_encrypt_id )


    } );

  }

  ngOnInit() {
  }

}
