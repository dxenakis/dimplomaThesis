import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map'
import {ResponseService} from './response';


@Injectable()
export class AuthenticationService {

  public _Authenresponse: string;
  private userid:  any;

  getAuthenresponse(): string {
    return this._Authenresponse;
  }

  setAuthenresponse(value: string) {
    this._Authenresponse = value;
  }







  constructor(private http: HttpClient, private responseservice: ResponseService ) { }


  async login(username: string, password: string) {
    console.log(username + '' + password);
    const headers = new HttpHeaders()
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Credentials', 'true')
        .append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD')
        .append('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With')
        .append('Access-Control-Allow-Origin', 'http://localhost:4200')
        .append('Content-type', 'application/x-www-form-urlencoded;charset=utf-8;');

        const url  = 'http://localhost:8080/diplomatiki/UserLogin';

        // this._Authenresponse =
        const loginres = await  this.http.post(url, {'username': username, 'password': password} , { headers : headers} )
          .subscribe(
            (data: any) => {
        console.log(data);
   //     console.log(data.response);
   //     console.log(data.userID);
   //     console.log(data.password);
        this.userid = data.userID;
        // console.log(data.response.toString());
        this.setAuthenresponse(data.response.toString());
         return data.response.toString();

      }
    );

  }


}
