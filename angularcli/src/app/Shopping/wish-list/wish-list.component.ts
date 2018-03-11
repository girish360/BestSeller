import { Component, OnInit,DoCheck } from '@angular/core';

import {  trigger, sequence, transition, animate, style, state } from '@angular/animations';

import { HttpService } from '../services/http.service';

import { DataService } from '../services/data.service';

import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  animations: [
    trigger('wishList_animations', [
      transition('* => void', [
        style({ height: '*', opacity: '1', transform: 'translateX(0)'}),
        sequence([
          animate(".25s ease", style({ height: '*', opacity: '.2', transform: 'translateX(40px)', 'box-shadow': 'none'  })),
          animate(".1s ease", style({ height: '0', opacity: 0, transform: 'translateX(40px)', 'box-shadow': 'none'  }))
        ])
      ]),
      transition('void => active', [
        style({ height: '0', opacity: '0', transform: 'translateX(40px)', 'box-shadow': 'none' }),
        sequence([
          animate(".1s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)'  }))
        ])
      ])
    ])
  ]
})
export class WishListComponent implements OnInit,DoCheck {



  public active = 'active';

  constructor( private header: HeaderService , private dataservices : DataService, private Httpservices : HttpService ) {


  }

  ngDoCheck(){


  }


  ngOnInit() {
  }


}
