import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage } from '../models/Storage';


@Injectable()
export class RouteServiceAll {


  private  ResponsedataAll: any;


  constructor(private http: HttpClient ) { this.ResponsedataAll = [] }



  RouteAll(): any  {
    const headers = new HttpHeaders()
      .append('Content-type', 'application/x-www-form-urlencoded;charset=utf-8;');

    const url  = 'http://localhost:8080/diplomatiki/RouteAll';


    this.http.post(url, {'route': 1} , { headers : headers} )
      .toPromise().then(
        (Rdata: any) =>  {

          this.ResponsedataAll = JSON.parse(JSON.stringify(Rdata))
          console.log(this.ResponsedataAll);
          for (let i = 0; i < this.ResponsedataAll.data.length; i++) {
            const routes =  this.ResponsedataAll.data[i];
          }
        }
      );
    return this.ResponsedataAll;
  }


}
