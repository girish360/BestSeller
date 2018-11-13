import { Component, OnInit , OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { SearchService } from '../../services/search.service';

@Component({

  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']

})
export class SearchComponent implements OnInit {



  constructor( private route:ActivatedRoute , private searchService: SearchService) {


    this.route.queryParams.subscribe( params => {

      this.searchService.search_data.value = params.keyword;

      this.searchService.search_new_value();

    });
  }

  ngOnInit() {

  this.searchService.search_component = true;

  }

  ngOnDestroy(){

    this.searchService.search_component = false;

  }

}
