import { Component, OnInit , ChangeDetectorRef ,ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

import { ScrollbarService } from '../../../share_services/scrollbar.service';


import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit {

  constructor( private cd :ChangeDetectorRef,  private clientService :ClientService, private route : ActivatedRoute , private dataservices : DataService  , private scroll : ScrollbarService) {

    this.route.data.subscribe( response => {

      this.scroll.window(0, 0);

      if ( this.dataservices.resolve ){ // response from  resolve .....

        this.dataservices.loaded_component = true;

        if( response.client ){  // response from database is is not false this company exist

          this.dataservices.not_founded = false;

        }else{ // dont exists  this company .......

          this.dataservices.not_founded = true;
        }

        this.dataservices.update_client(true);

        this.cd.markForCheck();

      } else {

        this.dataservices.loaded_component = false;

        this.route.params.subscribe( params => {

          this.clientService.load_client( { params:params } ).subscribe( response =>{

            this.dataservices.loaded_component = true;

            if( response ){

              this.dataservices.not_founded = false;

            }else{

              this.dataservices.not_founded = true;
            }

            this.dataservices.update_client(true);

            this.cd.markForCheck();

          });
        });
      }
    });
  }

  ngOnInit() {
  }

}
