
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform( wishList: any, value: any ): any {

    if ( value === undefined || value.length == 0 ) return wishList;

    return wishList.filter( function( wish_prod ){

      return wish_prod.product_title.toLowerCase().includes(value.toLowerCase());

    })

  }

}
