
import {Component, OnInit} from '@angular/core';
import {TruckService} from '../services/Truck.Service';
import {Truck} from '../models/Truck';
import {RouteServiceAll} from '../services/RouteAll.Service';
import {Route} from '../models/Route';




@Component({
  selector: 'app-trucks',
  templateUrl: './Trucks.component.html',
  styles: ['RouteAll {' +
  '{\n' +
  '    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;\n' +
  '    border-collapse: collapse;\n' +
  '    width: 100%;\n' +
  '}\n' +
  '\n' +
  '#RouteAll td, #customers th {\n' +
  '    border: 1px solid #ddd;\n' +
  '    padding: 8px;\n' +
  '}\n' +
  '\n' +
  '#RouteAll tr:nth-child(even){background-color: #f2f2f2;}\n' +
  '\n' +
  '#RouteAll tr:hover {background-color: #ddd;}\n' +
  '\n' +
  '#RouteAll  th {\n' +
  '    padding-top: 12px;\n' +
  '    padding-bottom: 12px;\n' +
  '    text-align: left;\n' +
  '    background-color: #4CAF50;\n' +
  '    color: white;\n' +
  '} ' ]

})
export class TrucksComponent implements OnInit {
  private data: any = null;
  private trucks: Truck [] ;
  private RouteModel: Route [] ;
  private dataRouteAll: any = null;

  constructor (private truckService: TruckService, private RouteAllService: RouteServiceAll  ) {this.trucks  = []; this.RouteModel = []; }

  ngOnInit() {

    // this.getDirection()
     this.RouteAll();
  }

 async RouteAll() {

     this.dataRouteAll = await  this.RouteAllService.RouteAll();

     if (this.dataRouteAll !== null) {

       for (let i = 0; i < this.dataRouteAll.data.length; i++) {
         const routeallconst = this.dataRouteAll.data[i];


         this.RouteModel[i] = routeallconst;
       }
     } else {
       this.dataRouteAll = this.RouteAllService.RouteAll();
     }


  }

  truck() {

    this.data =  this.truckService.Truck();

    if (this.data !== null) {

      for (let i = 0; i < this.data.data.length; i++) {
        const trucks = this.data.data[i];


        this.trucks[i] = trucks;
      }
    }else {this.data =  this.truckService.Truck}


  }

}
