import { Injectable  } from '@angular/core';

import { HeaderService } from './header.service';

import { DataService } from './data.service';

import{Observable} from 'rxjs/Observable';

import { Subscription} from 'rxjs/Subscription';

import { EncryptDecryptService } from '../../share_services/encrypt-decrypt.service';

import { ScrollbarService } from '../../share_services/scrollbar.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends HeaderService {

  isOpen = false;

  public resolver:any  = false;

  public product_options:any ={left:0,top:300};

  public products:any = []; // array with products ..........

  public info_products:any = {};

  public pages_details:any={};  // object page details   number click etc .....

  public pages_link:any=[]; // page link .....

  public data_products:any = {  type_products : 'default' , category_id: '' , page: 1 , keywerb :''};

  my_products :Subscription;

  constructor(

      private scroll : ScrollbarService,

      protected dataservices: DataService,

  ) {

    super(  dataservices );

  }

  public load_products( route ): Observable<any>{

    let params = route.queryParams;

    if( !isNaN( params.id )  &&  ( !isNaN( params.page ) || params.page == null  ) ){

      this.data_products.category_id = params.id; // get category_id from url

      if( params.page == null ){

        this.data_products.page = 1; // set dafault page number start from 1

      }else{

        this.data_products.page = params.page; // get number of page from url
      }

      return this.dataservices.Http_Get('shopping/products/category_products', this.data_products ) // make request to get products ......

    }else{ // this page does not exists ..........................

      return Observable.of(false); // return false this page does not exists becouse in url is not spefic the id of category

    }

  }

  open_options(event) {

    this.isOpen = false;

    setTimeout(()=>{

      this.isOpen = true;

    },50);


    let screen_size = this.scroll.screen_size();

    if( screen_size.y  >  event.clientY+250){

      this.product_options.left = event.clientX;

      this.product_options.top = event.clientY;

    }else{

      this.product_options.left = event.clientX;

      this.product_options.top = event.clientY-250;

    }
  }


  close_options() {

    this.isOpen = false;
  }


  public config_default_products(){

    this.data_products.type_products = 'default';

  }

  public config_search_products(){

    this.data_products.type_products = 'company';

  }

  public config_company_products(){

     this.data_products.type_products = 'search';
  }

  checked_products_inCart_and_inWish(){

    for( let i = 0 ;  i <  this.products.length ; i ++ ){

      let nr_wish = 0 ;

      let nr_cart = 0 ;

      for ( let j = 0; j < this.wish_properties.wishList.length; j++ ) {

        if ( this.products[i].product_id == this.wish_properties.wishList[j].product_id ) {

          nr_wish = 1 ;
        }
      }

      if( nr_wish > 0 ) {
        this.products[i].product_in_wishList = 'true';
      }else{
        this.products[i].product_in_wishList = 'false';

      }

      for ( let j = 0; j < this.cart_properties.cartList.length; j++ ) {

        if ( this.products[i].product_id == this.cart_properties.cartList[j].product_id ) {

          nr_cart = 1 ;
        }
      }

      if( nr_cart > 0 ) {
        this.products[i].product_in_cartList = 'true';
      }else{
        this.products[i].product_in_cartList = 'false';

      }
    }
  }

  check_delete_from_wishList(){

    this.delete_from_wishList(); // delete from wish list in header services  ..............................

    this.checked_products_inCart_and_inWish(); // remove checked  in products .........................

  }

  check_delete_from_cartList(){

    this.delete_from_cartList();
    this.checked_products_inCart_and_inWish();

  }

  change_products_for_page(){

    this.dataservices.update_loader(true);

    this.my_products = this.dataservices.Http_Get( 'shopping/products/category_products', this.data_products ) // make request ......

        .subscribe( //  take success
            data => {

              if( data['products'] != 'empty') { // Is not empty .............

                this.products = data['products'];

                this.checked_products_inCart_and_inWish();

                this.pages_link = [];

                if( data['pages_details'] != false ){

                  this.pages_details = data['pages_details'];

                  this.build_pages_link(this.pages_details);

                }

                this.dataservices.update_products(true);

              }

              this.scroll.window( 0, 0); // call function window to move scroll top
              setTimeout(() => {
                this.dataservices.update_loader(false);
              }, 1000)

            },
            error => console.log( error ) // take error .....
        );
  }

  build_pages_link( pages_details ) { // that create pages link for products ...............................................................................

    this.pages_link = []; // empty pages_link .........

    if (pages_details.total_pages > 1) {

      if (pages_details.page <= 3) { // check if pages is  smaller than 3 or equals ...........................

        if (pages_details.total_pages <= 8) {  // check if total pages are smaller than 8  or equals

          if (pages_details.page > 1) { // check if page that more bigger than 1  to add skip_previouse  icon ......................

            this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_previous', 'icon': true});
          }
          for (var i = 1; i <= pages_details.total_pages; i++) {  // loop with number page

            if (i == pages_details.page) { // check if  number_ click is equals with item in loop to add property active true .........

              this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

            } else { // pages not active .................................................

              this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
            }
          }
          if (pages_details.page + 5 <= pages_details.total_pages) { // check if number click + 5 is more bigger or equals to add fast_forward icon  with 5 pages ...........

            this.pages_link.push({'page': i, 'active': false, 'icon_material': 'fast_forward', 'icon': true});

          } else { //  add skip_next icon with  one page  increment  ....................
            if (pages_details.page < pages_details.total_pages) {

              this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_next', 'icon': true});

            }
          }
          return;  // return pages_link that is a array with some objects inside ...........................................................
        }
        else {  // here total_pages pages are more bigger than 8  ...........................

          if (pages_details.page == 1) { // check if number click is equals with one .............................................

            for (var i = 1; i <= pages_details.page + 7; i++) { // loop with number page

              if (i == pages_details.page) { // check if  number_ click is equals with item in loop to add property active true .........

                this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

              } else { // pages not active .................................................

                this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
              }

            }
          }
          else {

            if (pages_details.page == 2) {  // check if number click is equals with two .............................................

              this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_previous', 'icon': true});


              for (var i = 1; i <= pages_details.page + 5; i++) {

                if (i == pages_details.page) {

                  this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                } else {

                  this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
                }
              }
            }
            else {
              if (pages_details.page == 3) {

                this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_previous', 'icon': true});

                for (var i = 1; i <= pages_details.page + 4; i++) {

                  if (i == pages_details.page) {

                    this.pages_link.push({
                      'page': i,
                      'active': true,
                      'category_id': pages_details.category_id,
                      'icon_material': 'x',
                      'icon': false
                    });

                  } else {

                    this.pages_link.push({
                      'page': i,
                      'active': false,
                      'category_id': pages_details.category_id,
                      'icon_material': 'x',
                      'icon': false
                    });
                  }
                }
              }
            }
          }

          this.pages_link.push({
            'page': pages_details.total_pages,
            'active': false,
            'category_id': pages_details.category_id,
            'icon_material': 'x',
            'icon': false
          });


          if (pages_details.page + 5 <= pages_details.total_pages) {

            this.pages_link.push({'page': i, 'active': false, 'icon_material': 'fast_forward', 'icon': true});

          } else {

            this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_next', 'icon': true});
          }

          return;

        }

      } // end number click is smaller than 3 or equals ................
      else { // here number click is bigger than 3 ................

        if (pages_details.total_pages > pages_details.page + 3) {

          if (pages_details.page > 5) {

            this.pages_link.push({'page': i, 'active': false, 'icon_material': 'fast_rewind', 'icon': true});
          }
          else {
            this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_previous', 'icon': true});
          }

          this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'x', 'icon': false});

          for (var i = pages_details.page - 2; i <= pages_details.page + 3; i++) {

            if (i == pages_details.page) {

              this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

            } else {
              this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});

            }
          }

          this.pages_link.push({
            'page': pages_details.total_pages,
            'active': false,
            'icon_material': 'x',
            'icon': false
          });

          if (pages_details.page + 5 <= pages_details.total_pages) {

            this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'fast_forward', 'icon': true});

          } else {
            this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'skip_next', 'icon': true});
          }
          return;
        }
        else {
          if (pages_details.total_pages >= 10) {

            if (pages_details.page > 5) {

              this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'fast_rewind', 'icon': true});
            }
            else {

              this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'skip_previous', 'icon': true});

            }
            this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'x', 'icon': false});

            if (pages_details.page + 1 == pages_details.total_pages) {

              for (var i = pages_details.page - 5; i <= pages_details.total_pages; i++) {

                if (i == pages_details.page) {

                  this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                } else {

                  this.pages_link.push({
                    'page': i, 'active': false, 'icon_material': 'x', 'icon': false
                  });
                }
              }
            } else {
              if (pages_details.page == pages_details.total_pages) {

                for (var i = pages_details.page - 7; i <= pages_details.total_pages; i++) {

                  if (i == pages_details.page) {

                    this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                  } else {

                    this.pages_link.push({
                      'page': i, 'active': false, 'icon_material': 'x', 'icon': false
                    });
                  }
                }
              }
              else {

                if (pages_details.page + 3 == pages_details.total_pages) {

                  for (var i = pages_details.page - 3; i <= pages_details.total_pages; i++) {

                    if (i == pages_details.page) {

                      this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                    } else {

                      this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
                    }
                  }

                }
                else {
                  for (var i = pages_details.page - 4; i <= pages_details.total_pages; i++) {

                    if (i == pages_details.page) {

                      this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                    } else {

                      this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
                    }
                  }

                }

              }
            }

            if (pages_details.page != pages_details.total_pages) {

              this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_next', 'icon': true});

            }

            return;

          } else {

            if (pages_details.page > 5) {

              this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'fast_rewind', 'icon': true});
            }
            else {

              this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'skip_previous', 'icon': true});

            }
            this.pages_link.push({'page': 1, 'active': false, 'icon_material': 'x', 'icon': false});


            if (pages_details.total_pages <= 8) {

              for (var i = 2; i <= pages_details.total_pages; i++) {

                if (i == pages_details.page) {

                  this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                } else {

                  this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
                }
              }

            } else {

              if (pages_details.total_pages != pages_details.page) {

                for (var i = 3; i <= pages_details.total_pages; i++) {

                  if (i == pages_details.page) {

                    this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                  } else {

                    this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
                  }
                }

              } else {

                for (var i = 2; i <= pages_details.total_pages; i++) {

                  if (i == pages_details.page) {

                    this.pages_link.push({'page': i, 'active': true, 'icon_material': 'x', 'icon': false});

                  } else {

                    this.pages_link.push({'page': i, 'active': false, 'icon_material': 'x', 'icon': false});
                  }
                }

              }

            }

            if (pages_details.page != pages_details.total_pages) {

              this.pages_link.push({'page': i, 'active': false, 'icon_material': 'skip_next', 'icon': true});

            }

            return;
          }
        }
      }

    } // End function that build pages link ........................................................
  }
}
