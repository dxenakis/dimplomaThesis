import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import {Route} from '../models/Route';
import {RouteService} from '../services/Route.Service';



@Component({
  selector: 'app-map-view',
  templateUrl: './MapView.component.html',
  styleUrls: ['./MapView.component.css'],


})

export class MapViewComponent implements OnInit {


  private title: string  ;
  private lat  = 37.97906880;
  private lng  = 23.78265510 ;
  private data: any = null;
  private routes: Route [];
  private RouteTracking ;
  private Response: string;
  private origin: {}
  private destination: {}
  private waypoints: Array <any>;
  markers = [[37.97906880, 23.78265510],
    [38.08275800, 23.80305340],
    [39.16909050, 23.25160100],
    [41.67243400, 26.55573390] ];



  ngOnInit(): void {
    this.routeService.Route(0);
  }


  constructor (private routeService: RouteService  ) {this.waypoints = [];  this.routes  =  this.routeService.Route(0);

  }



  OnRouteTracking (event: Event ) {
  this.RouteTracking = (<HTMLInputElement>event.target).value;
  console.log('From OnRouteTracking..:' + this.RouteTracking);
  this.routing()
}

  async routing() {
    this.routes = [];
    this.waypoints = [];
    this.origin = null ;
    this.destination = null;
    console.log('from routing..:' + this.RouteTracking);

    this.data = await this.routeService.Route(this.RouteTracking);

    if (this.data !== null) {

      for (let i = 0; i < this.data.data.length; i++) {
        const routes = this.data.data[i];
        if (this.data.Response !== 'true') {
        this.Response = this.data.Response; }

        this.routes[i] = routes;

        }
   }  else {this.routes = []; }


    for (let i = 0; i < this.routes.length; i++) {
     if (this.routes[i].State === 'Current' ) {
       this.destination = { lat: this.routes[i].latitude, lng: this.routes[i].longtitude }
     }
      if (this.routes[i].State === 'Start') {
        this.origin = {lat: this.routes[i].latitude, lng: this.routes[i].longtitude};
      }
      else  {
        this.waypoints.push({location: {lat: this.routes[i].latitude, lng: this.routes[i].longtitude}});
      }
    }



  console.log('origin: ' + this.origin);
  console.log('destination: ' + this.destination);
  console.log('waypoints: ' + this.waypoints);
  }


}
