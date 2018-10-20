
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company_routing.module';

import { CompanyComponent } from '../components/company/company.component';

import { SlideshowComponent } from '../components/slideshow/slideshow.component';

import { NgxCarouselModule } from 'ngx-carousel'; // carousel

import 'hammerjs';

import { ShareModule } from '../../share_module/share.module';

import { SearchComponent } from '../components/company/search/search.component';

import { AboutComponent } from '../components/company/about/about.component';

import { HomeComponent } from '../components/company/home/home.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CompanyService } from '../services/company.service';

import { CategoriesComponent } from '../components/company/categories/categories.component'; // company categories ........

import { ResolverService } from '../resolvers/resolver_supplier.service';

import { AgmCoreModule } from '@agm/core';

@NgModule({

  imports: [

      CommonModule,

      CompanyRoutingModule,

      NgxCarouselModule,

      ShareModule,

      InfiniteScrollModule,

      AgmCoreModule.forRoot({
          apiKey: "AIzaSyCcuMQUe3S0Qk7WTfy8XnBxQPk79eiTTrk",
          libraries: ["places"]
      }),


  ],

    declarations: [

        CompanyComponent,

        SlideshowComponent,

        SearchComponent,

        AboutComponent,

        HomeComponent,

        CategoriesComponent,

    ],
    providers: [


        CompanyService,

        ResolverService,




    ]

})
export class CompanyModule { }
