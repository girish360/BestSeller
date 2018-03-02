import { Component, OnInit , Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],

})

export class CompanyComponent implements OnInit {

    public get_Language:object;

    private company_id:any;

    private id:any;


    constructor( private crypto : EncryptDecryptService , private route: ActivatedRoute , private router: Router  ) {

        this.route.params.subscribe( params => {

            this.company_id = crypto.decrypt_AES( params['name'] , crypto.secret_key_company_profile );

        });

    }



    ngOnInit() {



    }


}
