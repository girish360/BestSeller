
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform( allProducts: any, value: any ): any {

    if ( value === undefined || value.length == 0 ) return allProducts;

    return allProducts.filter( function( products ){

      return products.title.toLowerCase().includes(value.toLowerCase());

    })

  }

}
