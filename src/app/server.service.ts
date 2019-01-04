import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';






import { URLSearchParams } from '@angular/http';
import {findReadVarNames} from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ServerService {
  private username: string;
  private password: string;

  constructor(private http: HttpClient) {
  }


  doPost() {


  }

}
