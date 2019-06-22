import { Component, OnInit } from '@angular/core';
import {IdentificationService} from '../services/identification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  public isConnected = false;


  constructor(
    private identificationService: IdentificationService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  async ngOnInit() {
    this.isConnected = await this.identificationService.isLegit();
    console.log(this.isConnected);
  }


  public logout() {
    this.identificationService.logout();
    this.router.navigateByUrl('/');
  }
}
