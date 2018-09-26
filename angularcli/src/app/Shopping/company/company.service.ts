import { Injectable } from '@angular/core';

import{BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class CompanyService {

  public categories_products : any = [];

  public company_data_carousel :any = {

    current_page_products: 0,

    current_page_categories : 0,

    total_categories : 0,

    categories_for_page : 5,

    company_id:false,

    company_name:false

  }; // inital  can change later ....

  public company_properties:any = {

    sticky_company :false,

    focus_input_search: false,

  };

  public search_products:any = [];

  public text_search:any;

  public company_info :any={ id:null , name : null };

  public categories:any = []; //all categories for a company

  constructor(){

  }

}
