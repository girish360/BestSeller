import { Injectable } from '@angular/core';

import { DataService } from '../services/data.service';

import {Observable} from "rxjs/Observable";

@Injectable()

export class CompanyService {

  public categories_products : any = [];

  public carousel_data :any = {

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

  public company:any={ };

  public resolve  = false;

  public categories:any = []; //all categories for a company

  constructor(private dataservices : DataService){

  }

  public load_company( params ): Observable<any>{

      let company = params.params.company;

      let company_name;

      let company_id;

      if (company.includes("@")) {

        let index = company.indexOf('@');

        company_name = company.substring(0, index);

        company_id = company.substring(index + 1, company.length);

        if (!isNaN(company_id) && ( company_name instanceof String || isNaN(parseInt(company_name)) )) {

          this.carousel_data = {

            current_page_products: 0,

            current_page_categories: 0,

            total_categories: 0,

            categories_for_page: 5,

            company_id: company_id,

            company_name: company_name

          }; // inital  can change later ....

          return  this.dataservices.Http_Get('shopping/company/check', this.carousel_data); // make request ......

        }else { // // does not exists this page name must be string and id must be number ..........

          return Observable.of(false);

        }

      }else { // does not exists this page @ symbol is not included ..........

        return Observable.of(false);

      }

  }

}
