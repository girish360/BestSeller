import { Injectable } from '@angular/core';

@Injectable()

export class CompanyService {

  public company_id:any;

  public categories_products : any = [];

  public store_data_carousel :any = {

    current_page_products: 0 ,

    current_page_categories : 0  ,

    total_categories : 0 ,

    categories_for_page : 5,

    company_id:false,

    category_id:false

  }; // inital  can change later ....

  constructor() {


  }

}
