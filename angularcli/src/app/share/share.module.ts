
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FilterPipe } from '../filter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {

  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,

} from '@angular/material';

@NgModule({

  imports: [CommonModule],

  exports :[

    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    FilterPipe,
    FormsModule,
    ReactiveFormsModule
  ],

  declarations: [

    FilterPipe

  ],


})
export class ShareModule { }
