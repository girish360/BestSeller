import { Injectable } from '@angular/core';

import { DataService } from './data.service';

import { SetRouterService } from'../../share_services/set-router.service';

declare var $:any;

@Injectable()

export class SearchService {

  public search_component:any = false;

  private time_search:number;

  public search_results:any=[];

  public recent_serches:any = { status:true , data: [] };

  public search_data: any = { searchFor:'products',  value:'', search:false, server_status:true , dropdown:false };

  public filter_products: any = { time:'any_time' , location:'world' , price:'any_price', category:'any_category' };

  public filter_supplier: any = { time:'any_time' , location:'world' , price:'any_price', category:'any_category' };

  constructor( private setRouter :SetRouterService,private dataservices: DataService) {


  }

  focus_search( el_search ){

    if( !this.search_component ){

      if( !this.search_data.dropdown ){

        this.show_dropdown_search('dropdown_search','body_search');

        this.search_data.dropdown = true;

        if( this.search_data.value.length != 0 ){
          this.search_new_value();
        }

      }



    }

  }

   set_data_request(){

     let request_data;

     if(this.search_data.searchFor =='products'){

       request_data = {data: this.search_data ,filters : this.filter_products};

    }
    else if(this.search_data.searchFor =='supplier'){

       request_data = { data: this.search_data ,filters : this.filter_supplier };
    }

    return request_data;

   }

  search_new_value(){

    clearTimeout(this.time_search);

    this.search_data.server_status = true;

    if( this.search_data.value.length != 0 ){

      this.search_data.search = true;

    }else{

      this.search_results =  [];

      this.search_data.search = false;
    }

    this.time_search = setTimeout(() => {

      if( !this.search_component ) {

        if (this.search_data.value.length != 0) {

          let data = this.set_data_request();

          this.dataservices.Http_Get('shopping/header/search', data )

              .subscribe( //  take success

                  data => {

                    if (data) {

                      this.search_results = data;

                      this.search_data.server_status = true;

                    }

                    else {

                      this.search_results = [];

                      this.search_data.server_status = false;

                    }

                    this.search_data.search = false;

                   this.dataservices.update_header(true);
                  }
              );

        } else {

          this.search_results = [];

          this.dataservices.update_header(true);
        }
      }else{

        this.setRouter.set_router({ path:'shopping/results' , data:{ keyparams:'keyword' , params: this.search_data.value} ,relative:false },false);

      }


    }, 1000) //play with delay
  }

  change_filter_search(){


    clearTimeout(this.time_search);

    this.search_data.server_status = true;

    if( this.search_data.value.length != 0 ){

      this.search_data.search = true;

    }else{

      this.search_results =  [];

      this.search_data.search = false;
    }

    this.time_search = setTimeout(() => {

      if( !this.search_component ) {

        if (this.search_data.value.length != 0) {

          let data = this.set_data_request();

         console.log(data);

          this.dataservices.Http_Get('shopping/header/search', data)

              .subscribe( //  take success

                  data => {

                    if (data) {

                      this.search_results = data;

                      this.search_data.server_status = true;

                    }

                    else {

                      this.search_results = [];

                      this.search_data.server_status = false;

                    }

                    this.search_data.search = false;

                    this.dataservices.update_header(true);
                  }
              );

        } else {

          this.search_results = [];

          this.dataservices.update_header(true);
        }
      }else{

        this.setRouter.set_router({ path:'shopping/results' , data:{ keyparams:'keyword' , params: this.search_data.value} ,relative:false },false);

      }


    }, 500) //play with delay
  }

  get_recent_searches() {

    this.dataservices.Http_Get('recentSearches', this.search_data)

        .subscribe( //  take success

            data => {


              if (data) {

                this.recent_serches.data = data;


              }
              this.dataservices.update_header(true);


            }
        );
  }


  public hide_search_content(){

    this.search_data.dropdown = false;

    this.hide_dropdown_search('dropdown_search','body_search');

    this.dataservices.update_header(true);

  }

  public change_search(  ){

   alert('dfg');
    this.change_filter_search();

  }

  public show_dropdown_search( dropdown_class, body_inside  ){



    $(function(){

      $('.'+dropdown_class).css({top: '40px', opacity: '0.1'});

      $('.'+body_inside).css({ top: '15px'});

      $('.'+dropdown_class).show().animate({ // animation effect show dropdown productsService......

        top: '6px',

        opacity: 1

      }, 50);

      $('.'+body_inside).animate({

        top: '0px'

      }, 100);

    });

  }

  public hide_dropdown_search( dropdown_class, body_inside){

    $('.'+body_inside).css({ top: '0px' });

    $('.'+dropdown_class).css({top:'40px',opacity:'1'}); // css style...

    $('.'+dropdown_class).animate({ // animation effect hide dropdown productsService......

      top: '70px',

      opacity: '0.1',

    }, 100, function () { //  function after effect ............

      $('.'+dropdown_class).hide();

    });

    $('.'+body_inside).animate({

      top: '15px'

    }, 200);

  }

}
