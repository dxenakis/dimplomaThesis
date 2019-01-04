import {Component, OnInit} from '@angular/core';

import { HttpClient} from '@angular/common/http';
import {RouteServiceAll} from '../services/RouteAll.Service';



@Component({
  selector: 'app-TimeRerouting',
  templateUrl: './TimeRerouting.component.html',
  styleUrls: ['./TimeRerouting.component.css'],


})
export class TimeReroutingComponent implements OnInit {

  private lat: Number = 37.97906880
  private lng: Number = 23.78265510
  private di: Number = 0;
  private origin: {}
  private destination: {}
  private destinations:  Array <any>;
  private waypoints: any;
  private Desti: String = '';
  private min: Number = 0;
  private Routetracking: Number = 0;

  private routes: any = null;

  constructor(private http: HttpClient , private RouteAllService: RouteServiceAll ) {
    this.destinations = []; this.Desti = ''; this.routes = this.RouteAllService.RouteAll(); this.Routetracking = 0;
    this.min = 0
  }



  ngOnInit() {

    // this.getDirection()
    this.getTimeLatLong();
    this.routes = this.RouteAllService.RouteAll();

  }


  async getTimeLatLong () {
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
          this.min = data.rows[0].elements[0].duration.value;
          console.log(data.rows[0].elements);
          console.log(this.min);
          for (let k = 0; k < data.rows.length; k++ ) {
            if (data.rows[k].elements[0].duration.value <= this.min) {
              this.min = data.rows[k].elements[0].duration .value;
              this.di = k;  // this.di returns the i compoment that will use to this.destinations
              this.origin = this.destinations[k];
              this.lat = this.routes.data[k].latitude;
              this.lng = this.routes.data[k].longitude;
              this.Routetracking = this.routes.data[k].RouteTracking;

            }

          }

          //     console.log(data.response);
          //     console.log(data.userID);
          //     console.log(data.password);
          console.log('after for loop' + this.min);
          console.log('after for loop' + this.origin);
          return ;

        }
      );
  }

  OnTimeDesti(event: Event ) {
    this.destination = (<HTMLInputElement>event.target).value;
    this.getTimeLatLong ()
  }


  getDirectionInfo() {

  }

}
