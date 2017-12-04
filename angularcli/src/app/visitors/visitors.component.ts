import { Component, OnInit } from '@angular/core';

import { HtppServicesComponent } from '../htpp-services/htpp-services.component';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css'],
  providers : [HtppServicesComponent]
})
export class VisitorsComponent implements OnInit {

  constructor( private Httpservice : HtppServicesComponent ) { }

  private get_Language = {};

  private wishList_products = [];



  ngOnInit() {

    this.get_languageFromServer(); // fill language

    this.get_WishListFromServer(); // fill wish list

  }

  setLanguageFromHeader( language ){

    this.get_Language = language;

  }

  get_wish_product( wish_product ){

      this.wishList_products.push ( wish_product ); // push wish product in wishList products
  }

  get_WishListFromServer(){ // take wish list from  server ............

    this.Httpservice.create_obj( 'get_wishList', 'wish' );

    this.Httpservice.Http_Post()
        .subscribe(
            data => {
              if( data['status'] == 'get_wishList' ){
                if(data['data']['Value']!=='false') {
                  this.wishList_products = data['data'] , console.log(data['data']);
                }
              }
            },
            error => console.log( error +'gabim' )

        );

  }

  push_WishProduct_Server(){


  }


  get_languageFromServer(){ //  take language from server .........

    this.Httpservice.create_obj( 'language' , 'English' );

    this.Httpservice.Http_Post()
        .subscribe(data=>{ this.get_Language = data }
            ,error=>(console.log( error +'gabim' ))
        );
  }


}
