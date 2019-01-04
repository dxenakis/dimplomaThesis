import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage } from '../models/Storage';
import {Truck} from '../models/Truck';


@Injectable()
export class TruckService {


  public  Responsedata: any;


  constructor(private http: HttpClient ) { this.Responsedata = [] }


  Truck(): any  {
    const headers = new HttpHeaders()
      .append('Content-type', 'application/x-www-form-urlencoded;charset=utf-8;');

     const url  = 'http://localhost:8080/diplomatiki/Truck';


   this.http.post(url, {} , { headers : headers} )
      .subscribe(
        (Rdata: any) =>  {

          this.Responsedata = JSON.parse(JSON.stringify(Rdata))
          console.log(this.Responsedata);
          for (let i = 0; i < this.Responsedata.data.length; i++) {
            const storages = this.Responsedata.data[i];
          }
        }
      );
    return this.Responsedata;
  }


}
