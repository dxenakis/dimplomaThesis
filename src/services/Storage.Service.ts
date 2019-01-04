import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage } from '../models/Storage';


@Injectable()
export class StorageService {


  public Responsedata: any;
  public  storages: Storage [];
  private thenresponse: string;
  public userid:  any;



  constructor(private http: HttpClient ) { this.Responsedata = [] }



 Storage(): any {
    const headers = new HttpHeaders()
      .append('Content-type', 'application/x-www-form-urlencoded;charset=utf-8;');

    const url  = 'http://localhost:8080/diplomatiki/Storage';


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
