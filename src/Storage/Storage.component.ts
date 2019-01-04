
import { Component } from '@angular/core';
import { StorageService  } from '../services/Storage.Service';
import { Storage } from '../models/Storage';
import {TruckService} from '../services/Truck.Service';
import { Truck} from '../models/Truck';
import {HttpHeaders} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-storage',
  templateUrl: './Storage.component.html',
  styles: ['storage {font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;\n' +
  '    border-collapse: collapse;\n' +
  '    width: 100%;}  ' ]

})
export class StorageComponent {
   private data: any = null;
   private dataTruck: any = null;
   private Checkresults = false ;
   private stors: Storage [];
   private trucks: Truck [] ;
   private usStors: any  [] ;
   private usTrucks: any [] ;
   private clicstors: String ;
   private StoSumVolume = 0 ;
   private StoSumWeight = 0;
   private TruSumVolume = 0 ;
   private TruSumWeight = 0;
   private checkboxes: NodeListOf<ElementTagNameMap['input']>;

   constructor (private storageService: StorageService , private http: HttpClient, private truckService: TruckService )  {
       this.stors  = this.storageService.Storage(); this.usStors = []; this.usTrucks = [];
       this.clicstors = null; this.trucks = this.truckService.Truck();
     }


  clickSumStorage(volume: number , weight: number, storage: number) {

    this.StoSumVolume += volume;
    this.StoSumWeight += weight;

    this.usStors.push(storage);
    console.log(this.usStors);
  }

  clickSumTruck(volume: number , weight: number, truck: number) {
    this.TruSumVolume += volume;
    this.TruSumWeight += weight;
    this.usTrucks.push(truck)
    console.log(this.usTrucks);

  }

  storage() {
    this.StoSumVolume = 0; this.StoSumWeight = 0;
    this.usTrucks = [] ; this.usStors = [];
    this.data =  this.storageService.Storage();

     if (this.data !== null) {

       for (let i = 0; i < this.data.data.length; i++) {
         const storages = this.data.data[i];


         this.stors[i] = storages;
       }
     }else {this.data =  this.storageService.Storage()}


  }

  truck() {
    this.TruSumVolume = 0; this.TruSumWeight = 0;
     this.dataTruck = this.truckService.Truck();

    if (this.dataTruck !== null) {

      for (let i = 0; i < this.dataTruck.data.length; i++) {
        const trucks = this.dataTruck.data[i];


        this.trucks[i] = trucks;
      }
    }{this.dataTruck =   this.truckService.Truck()}


  }

  CheckSum() {

     console.log(this.StoSumWeight);
     console.log(this.StoSumVolume);
     console.log(this.TruSumWeight);
     console.log(this.TruSumVolume);
     if ( (this.StoSumVolume <= this.TruSumVolume) && (this.StoSumWeight <= this.TruSumWeight )) {

       this.Checkresults = true;

     }else {this.Checkresults = false}
     console.log(this.Checkresults);
  }


  Proceed () {

    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Credentials', 'true')
      .append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD')
      .append('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With')
      .append('Access-Control-Allow-Origin', 'http://localhost:4200')
      .append('Content-type', 'application/x-www-form-urlencoded;charset=utf-8;');

    const url  = 'http://localhost:8080/diplomatiki/InsertRoute';

    const Jstorages: any = [];
    for (let i = 0; i < this.usStors.length; i++) {
      console.log(this.usStors[i]);
    Jstorages.push({ 'storage': this.usStors[i]});

    }
    const InsertRoute =   this.http.post(url, {
      'truck': this.usTrucks[0],
      'storages': Jstorages,
      'longtitude': '23.78265510',
      'latitude': '37.97906880'
    } , { headers : headers} )
      .subscribe(
        (data: any) => {
          console.log(data);
          //     console.log(data.response);
          //     console.log(data.userID);
          //     console.log(data.password);
         return ;

        }
      );


  }



 OnPropertyStorage (event: Event): any {

   this.clicstors = null;
   this.clicstors = (<HTMLInputElement>event.target).value;
   console.log('test_storage_' + this.clicstors);

    let checkboxes;
   let sumvolume: number;
    const temptable = [];

    checkboxes = document.getElementsByTagName('input');

    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];
      checkbox.onchange = function()    {
        const currentRow = this.parentNode.parentNode;
        const secondColumn = currentRow.getElementsByTagName('tr')[i + 1 ];
        const thirdColumn  = secondColumn.getElementsByTagName('td');


        console.log('CartonId:' + thirdColumn[0].textContent);
        console.log('volume:  ' + thirdColumn[2].textContent);
        console.log('weight:  ' + thirdColumn[3].textContent);
        temptable[0] = thirdColumn[0].textContent;

       sumvolume = (thirdColumn[2].textContent).valueOf();

      };


  }

 }






}


