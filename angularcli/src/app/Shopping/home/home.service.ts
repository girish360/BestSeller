import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  public categories_products : any = [];

  public store_data_carousel :any = { current_page : 0  , total_categories : 0 , categories_for_page : 5 }; // inital  can change later ....


  constructor() {

  }

}
