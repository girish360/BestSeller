import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';

import { ShareModule } from '../../share/share.module';

@NgModule({

  imports: [
    CommonModule,
    SearchRoutingModule,
    ShareModule

  ],

  declarations: [SearchComponent]
})
export class SearchModule { }
