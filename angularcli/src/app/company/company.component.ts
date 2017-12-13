import { Component, OnInit , Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Routes, RouterModule ,  Params , Data , } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],

})

export class CompanyComponent implements OnInit {

 public get_Language:object;

 private id_company:any;


    constructor( private route: ActivatedRoute , private router: Router  ) {

    }

  ngOnInit() {

      this.route.params.subscribe( params=> { this.id_company = params['get_languag'] } );

  }







}
