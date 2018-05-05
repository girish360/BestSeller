
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';

import { CompanyComponent } from './company.component';

import { SlideshowComponent } from '../slideshow/slideshow.component';

import { NgxCarouselModule } from 'ngx-carousel'; // carousel

import 'hammerjs';

import { ShareModule } from '../../share/share.module';

import { SearchComponent } from './search/search.component';

import { AboutComponent } from './about/about.component';

import { HomeComponent } from './home/home.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CompanyService } from './company.service';


@NgModule({

  imports: [

      CommonModule,

      CompanyRoutingModule,

      NgxCarouselModule,

      ShareModule,

      InfiniteScrollModule

  ],

    declarations: [

        CompanyComponent,

        SlideshowComponent,

        SearchComponent,

        AboutComponent,

        HomeComponent
  ],
    providers: [


        CompanyService
    ]

})
export class CompanyModule { }
