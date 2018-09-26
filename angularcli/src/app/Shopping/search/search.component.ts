import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({

  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']

})
export class SearchComponent implements OnInit {

  constructor( private route:ActivatedRoute ) {


    this.route.queryParams.subscribe( params => {

        let keyword = params.keyword;



    });
  }

  ngOnInit() {
  }

}
