import {
  HttpClient,
  HttpParams,
  JsonpClientBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewRecipeFormData, Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  searchRecipes(query: string): Observable<Recipe[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Recipe[]>(this.apiUrl, { params });
  }

  favourtieRecipeById(
    id: string,
    currentState: boolean | undefined
  ): Observable<Recipe> {
    const newState = !currentState;

    const payload = { isFavorited: newState };

    return this.http.patch<Recipe>(`${this.apiUrl}/${id}`, payload);
  }

  postRecipe(newRecipeData: NewRecipeFormData): Observable<Recipe> {
    const newRecipe: Omit<Recipe, 'id'> = {
      ...newRecipeData,
      userId: 1,
      rating: 0,
      reviewCount: 0,
      isFavorited: false,

      tags: newRecipeData.tags || [],
      mealType: newRecipeData.mealType || [],
      ingredients: newRecipeData.ingredients || [],
      instructions: newRecipeData.instructions || [],

      prepTimeMinutes: newRecipeData.prepTimeMinutes || 0,
      cookTimeMinutes: newRecipeData.cookTimeMinutes || 0,
      servings: newRecipeData.servings || 1,
      caloriesPerServing: newRecipeData.caloriesPerServing || 0,
    };

    return this.http.post<Recipe>(this.apiUrl, newRecipe as Recipe);
  }

  updateRecipe(id: string, updatedRecipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.apiUrl}/${id}`, updatedRecipe);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.apiUrl}/${id}`);
  }
}
