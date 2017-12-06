import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
 private get_Language = {};
 private sub;
  constructor(private route:ActivatedRoute , private router:Router) { }


  ngOnInit() {
    this.sub = this.route.params.subscribe( params=> { this.get_Language = params['get_languag'] } );

  }

}
