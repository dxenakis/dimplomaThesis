import {Component, OnInit} from '@angular/core';
import {google} from '@agm/core/services/google-maps-types';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import {Observable} from 'rxjs/Observable';
import {HttpHeaders} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import {RouteServiceAll} from '../services/RouteAll.Service';



@Component({
  selector: 'app-rerouting',
  templateUrl: './Rerouting.component.html',
  styleUrls: ['./Rerouting.component.css'],


})
export class ReroutingComponent implements OnInit {

  public lat: Number = 37.97906880
  public lng: Number = 23.78265510
  public di: Number = 0;
  public origin: {}
  public destination: {}
  public destinations:  Array <any>;
  public waypoints: any;
  public Desti: String = '';
  public min: Number = 0;
  public Routetracking: Number = 0;

  private routes: any = null;

  constructor(private http: HttpClient , private RouteAllService: RouteServiceAll ) {
    this.destinations = []; this.Desti = ''; this.routes = this.RouteAllService.RouteAll(); this.Routetracking = 0;  }



  ngOnInit() {

    // this.getDirection()
    this.getLatLong();
    this.routes = this.RouteAllService.RouteAll();



  }


 async getLatLong () {
   this.destinations = [];
   this.Desti = '';
   this.routes = await this.RouteAllService.RouteAll();
   for (let i = 0; i < this.routes.data.length; i++) {


       this.destinations.push({lat: this.routes.data[i].latitude, lng: this.routes.data[i].longtitude});
       this.Desti = this.Desti + this.routes.data[i].latitude + ',' + this.routes.data[i].longtitude + '|';

   }
    console.log(this.destinations);
    console.log('Routetracking' + this.Routetracking);
   console.log(this.Desti);
    console.log('before')
    const url  = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&' + '' +
      'origins=' + this.Desti + '&destinations=' + this.destination + '&key=AIzaSyASrnyOmn06meMFCUDtqSziv0BTEXipCso';
    const Dir =   this.http.post(url, {
    }  )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.min = data.rows[0].elements[0].distance.value;
          console.log(data.rows[0].elements);
          console.log(this.min);
         for (let k = 0; k < data.rows.length; k++ ) {
            if (data.rows[k].elements[0].distance.value <= this.min) {
                 this.min = data.rows[k].elements[0].distance.value;
                 this.di = k;  // this.di returns the i compoment that will use to this.destinations
                 this.origin = this.destinations[k];
                 this.lat = this.routes.data[k].latitude;
                 this.lng = this.routes.data[k].longitude;
                 this.Routetracking = this.routes.data[k].RouteTracking;

            }

         }
          console.log('after for loop' + this.min);
          console.log('after for loop' + this.origin);
          return ;

        }
      );
  }

  OnDesti(event: Event ) {
    this.destination = (<HTMLInputElement>event.target).value;
    this.getLatLong ()
  }


   getDirectionInfo() {

   }

}
