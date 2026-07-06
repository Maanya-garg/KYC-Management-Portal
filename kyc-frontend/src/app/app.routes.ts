import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home} from './home/home';
import { CreateKyc } from './create-kyc/create-kyc';
import { SearchKyc } from './search-kyc/search-kyc';
import { UpdateKyc } from './update-kyc/update-kyc';
export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'home', component: Home },

  { path: 'create', component: CreateKyc },

  { path: 'search', component: SearchKyc },

  { path: 'update', component: UpdateKyc }

];
