import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'add', component: NavbarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
