import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: '**', component: NotFoundComponent },
];
