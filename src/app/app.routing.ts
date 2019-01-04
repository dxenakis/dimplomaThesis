import { Routes, RouterModule } from '@angular/router';



import {LoginDetailComponent} from '../login/loginDetail/LoginDetail.component';
import {TrucksComponent} from '../Trucks/Trucks.component';


const appRoutes: Routes = [

  { path: 'login', component: LoginDetailComponent },
  { path: 'Trucks', component: TrucksComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
