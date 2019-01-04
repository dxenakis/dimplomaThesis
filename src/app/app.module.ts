import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from '../login/login.component';
import {LoginDetailComponent} from '../login/loginDetail/LoginDetail.component';
import {AuthenticationService} from '../login/loginDetail/authenticationService';
import {ResponseService} from '../login/loginDetail/response';
import {RouterModule, Routes} from '@angular/router';
import { TrucksComponent } from '../Trucks/Trucks.component';
import {StorageComponent} from '../Storage/Storage.component';
import {MapViewComponent} from '../MapView/MapView.compoment';
import {StorageService} from '../services/Storage.Service';
import {Storage} from '../models/Storage';
import {TruckService} from '../services/Truck.Service';
import {Truck} from '../models/Truck';
import { AgmCoreModule } from '@agm/core';
import {AgmDirection, AgmDirectionModule} from 'agm-direction';
import {Route} from '../models/Route';
import {RouteService} from '../services/Route.Service';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {RouteServiceAll} from '../services/RouteAll.Service';
import {ReroutingComponent} from '../Rerouting/Rerouting.component';
import {TimeReroutingComponent} from '../TimeReRouting/TimeRerouting.component';
import {StatisticsComponent} from '../Statistics/Statistics.component';




const appRoutes: Routes = [
  { path: '',  component: LoginComponent } ,
  { path: 'Trucks', component: TrucksComponent } ,
  { path: 'Storage', component: StorageComponent } ,
  { path: 'Map', component: MapViewComponent },
  { path: 'Rerouting', component: ReroutingComponent } ,
  { path: 'TimeRerouting', component: TimeReroutingComponent },
  { path: 'Statistics', component: StatisticsComponent }
];


@NgModule({
  declarations: [
    AppComponent ,
    LoginComponent,
    LoginDetailComponent,
    TrucksComponent,
    StorageComponent,
    MapViewComponent,
    StorageComponent,
    TrucksComponent,
    ReroutingComponent,
    TimeReroutingComponent,
    StatisticsComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASrnyOmn06meMFCUDtqSziv0BTEXipCso',
      libraries: ['places', 'geometry']
    }),
    AgmDirectionModule,
    AgmJsMarkerClustererModule



  ],
  providers: [ServerService , AuthenticationService , ResponseService, StorageService, Storage , TruckService , Truck, Route
    , RouteService , RouteServiceAll ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
