
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';

import { CompanyComponent } from './company.component';

import { SlideshowComponent } from '../slideshow/slideshow.component';

import { NgxCarouselModule } from 'ngx-carousel'; // carousel

import 'hammerjs';

import { ShareModule } from '../../share/share.module';

@NgModule({

  imports: [

    CommonModule,

    CompanyRoutingModule,

    NgxCarouselModule,

    ShareModule

  ],

  declarations: [

      CompanyComponent,
      SlideshowComponent
  ]

})
export class CompanyModule { }
