import { Component, OnInit , Input ,OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

import {Subscription} from "rxjs/Subscription";

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],

})

export class CompanyComponent implements OnInit , OnDestroy {

    public get_Language:object;

    private company_id:any;

    private id:any;

    private subscription : Subscription;

    cryp :any;


    constructor( private dataservices:DataService , private crypto : EncryptDecryptService , private route: ActivatedRoute , private router: Router  ) {

        this.subscription = this.route.params.subscribe( params => {

            this.company_id = crypto.decrypt_AES( params['name'] , crypto.secret_key_encrypt_id );

            this.cryp = crypto.encryp_AES(1,crypto.secret_key_encrypt_id);

        });

        this.dataservices.update_loader(true);
        setTimeout(()=>{

            this.dataservices.update_loader(false);

        },1000);

    }

    ngOnInit() {

    }

    ngOnDestroy():void{

        this.subscription.unsubscribe();

    }


}
