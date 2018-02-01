import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( wishList_products: any, value: any ): any {

    if ( value === undefined || value.length == 0 ) return wishList_products;

    return wishList_products.filter( function( wish_product  ){

         return wish_product.title.toLowerCase().includes(value.toLowerCase());

    })
  }
}
