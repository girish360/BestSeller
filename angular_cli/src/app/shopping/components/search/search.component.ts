import { Component, OnInit , OnDestroy ,ViewChild ,ElementRef ,HostListener ,ChangeDetectionStrategy} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { SearchService } from '../../services/search.service';

import { SetRouterService } from '../../../share_services/set-router.service';

import { MenuService } from '../../services/menu.service';

import {DataService } from '../../services/data.service';

import { trigger, sequence, transition, animate, style, state } from '@angular/animations';

import { FormControl } from '@angular/forms';

import { } from 'googlemaps';

import { MapsAPILoader } from '@agm/core';


@Component({

  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection :ChangeDetectionStrategy.OnPush,

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
    ]),

    trigger('filter_options', [

      state('closed', style({display:'none',position:'relative'})),

      state('open', style({position:'relative'})),

      transition('open => closed', [

        style({ opacity: '1',position:'absolute',margin: 'auto',top:0,left:'5px',right:0,bottom:0 }),

        animate(".40s ease", style({  opacity: '0.3', top:'40px' })),

      ]),

      transition('closed => open', [

        style({ opacity: '1' ,position:'absolute',margin: 'auto' ,top:'-40px',left:'5px',right:0,bottom:0}),


        animate(".40s ease", style({  opacity: '0.3', top:0  })),

      ])
    ]),
  ]

})
export class SearchComponent implements OnInit {

  @ViewChild("movescroll") public movescroll: ElementRef;

  @HostListener("mouseup") public enable_button(){

    this.mousedown = false;

  }

  constructor(
      private route:ActivatedRoute ,

      private searchService: SearchService,

      private sr: SetRouterService,

      private ms : MenuService,

      private ds : DataService,

      private mapsAPILoader : MapsAPILoader

  ) {

    this.route.queryParams.subscribe( params => {



      this.searchService.search_new_value();



    });
  }

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("searchInput") searchEl: ElementRef;

  @ViewChild("search") public searchElementRef: ElementRef;

  public pagex:number;

  public mousedown:boolean = false;

  public kot :number = 2;

  public walk_scroll:number;

  public block:boolean = false;

  public down(event){

    this.mousedown = true;

    this.block = false;

    this.pagex = event.clientX;

  }

  public up(event){

    this.mousedown = false;

    setTimeout(()=>{

      this.block = false;

    },100);
  }

  public move(event ,el){

    if( this.mousedown ){

      this.block = true;

      this.walk_scroll = event.clientX - this.pagex;

      this.pagex += this.walk_scroll;

      this.movescroll.nativeElement.scrollLeft -= this.walk_scroll;
    }
  }

  public route_on_search( result ){

    if(this.searchService.search_data.searchFor =='products' ){

      this.set_router( { path:'shopping/product_details/show' , data:{ keyparams:'id' , params:result.id} , relative:false });

    }else if(this.searchService.search_data.searchFor == 'company'){

      let company_path = 'shopping/company/'+result.name+'@'+result.id;

      this.set_router( { path:company_path, data: false  , relative:false } );

    }
  }

  public  set_router( data ){

    this.sr.set_router( data , this.route ); // set router .....

  }


  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  ngOnDestroy(){

    this.searchService.search_component = false;

  }

}
