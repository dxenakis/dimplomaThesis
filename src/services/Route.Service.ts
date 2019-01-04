import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage } from '../models/Storage';


@Injectable()
export class RouteService {


  public  Responsedata: any;


  constructor(private http: HttpClient ) { this.Responsedata = [] }



  Route(routetracking: number): any  {
    const headers = new HttpHeaders()
      .append('Content-type', 'application/x-www-form-urlencoded;charset=utf-8;');

    const url  = 'http://localhost:8080/diplomatiki/Route';


    this.http.post(url, {'route': routetracking} , { headers : headers} )
      .toPromise().then(
        (Rdata: any) =>  {

          this.Responsedata = JSON.parse(JSON.stringify(Rdata))
          console.log(this.Responsedata);
          for (let i = 0; i < this.Responsedata.data.length; i++) {
            const routes =  this.Responsedata.data[i];
          }
        }
      );
    return this.Responsedata;
  }


}
