import { Injectable } from '@angular/core';

import{BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()

export class CompanyService {

  public categories_products : any = [];

  public store_data_carousel :any = {

    current_page_products: 0 ,

    current_page_categories : 0  ,

    total_categories : 0 ,

    categories_for_page : 5,

    company_id:false,

    category_id:false

  }; // inital  can change later ....

  public categories_products_async =  new BehaviorSubject<boolean>(true); // identify if cartlist should change

  public status_categories_products = this.categories_products_async.asObservable();// identify if cartlist should change

  constructor() {


  }

}
