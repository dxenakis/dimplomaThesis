import {Injectable} from '@angular/core';



@Injectable()
export class ResponseService {

    public response = 'okf';


    getresponse(): string {
    return this.response;
   }

    setresponse(value: string) {
    this.response = value;
  }



  constructor() {
  }



}
