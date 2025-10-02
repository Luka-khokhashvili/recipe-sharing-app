import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'add', component: NavbarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
