import { Injectable } from '@angular/core';

import { DataService } from  './data.service';

@Injectable()

export class HomeService {

  public resolver = false;

  public categories_products : any = [];

  public store_data_carousel :any = {

    current_page_products:0,

    current_page_categories :0,

    total_categories:0,

    categories_for_page:5,

    category_id:false

  }; // inital  can change later ....

  constructor( private dataservices :DataService) {

  }

  load_home(){

    this.store_data_carousel = {

      current_page_products:0,

      current_page_categories :0,

      total_categories:0,

      categories_for_page:5,

      category_id:false

    };

     return this.dataservices.Http_Get( 'shopping/home/categories',this.store_data_carousel ) // make request ......

  }

}
