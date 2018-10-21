import { Component, OnInit } from '@angular/core';

import { trigger, sequence, transition, animate, style, state,keyframes } from '@angular/animations';

import { ProductService } from '../../services/product.service'; // ProductServices extend HeaderServices that cartList and  wishList ...............

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  animations: [
    trigger('openClose', [
      state('closed', style({display:'none'}),{params:{top:0 , left:0 , beforeTop:0}}),
      state('open', style({top:'{{top}}px', left:'{{left}}px'}),{params:{top:0 , left:0 , beforeTop:0}}),

      transition('open => closed', [
        style({ opacity: '1'}),
        sequence([
          animate("0.1s ease", style({  opacity: '0.1',  transform: 'translateY(50px)'  })),
        ])
      ]),

      transition('closed => open', [
        style({ opacity: '0',   top:'{{beforeTop}}px', left:'{{left}}px' }),
        sequence([
          animate("0.2s ease", style({  opacity: '1', transform: 'translateY(-50px)'  }))
        ])
      ])
    ]),

  ]
})
export class ContextMenuComponent implements OnInit {

  constructor(private productsService :ProductService) { }

  ngOnInit() {
  }

}
