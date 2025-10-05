import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../interfaces/recipe';
import { RecipesService } from './recipes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeAPIService {
  constructor(
    private RecipeService: RecipesService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  /**
   * Toggles the favorite status of a recipe and returns the observable
   * for the component to subscribe and update its local state.
   * @param recipeId The ID of the recipe to favorite.
   * @param isFavorited The current favorite status.
   * @returns Observable<Recipe>
   */
  favorite(
    recipeId: string,
    isFavorited: boolean | undefined
  ): Observable<Recipe> {
    return this.RecipeService.favourtieRecipeById(recipeId, isFavorited);
  }

  /**
   * Handles the API call to update the recipe.
   * @param recipeId The ID of the recipe to update.
   * @param recipeForm The form containing the new values.
   * @param currentRecipe The current recipe object (to ensure we pass non-form properties).
   * @returns Observable<Recipe>
   */
  saveChanges(
    recipeId: string,
    recipeForm: FormGroup,
    currentRecipe: Recipe | undefined
  ): Observable<Recipe> {
    if (!recipeForm.valid || !currentRecipe) {
      console.error(
        'Save changes aborted: Form invalid or recipe data missing.'
      );
      return new Observable<Recipe>();
    }

    const updatedRecipe = {
      ...currentRecipe,
      ...recipeForm.value,
    };

    return this.RecipeService.updateRecipe(recipeId, updatedRecipe);
  }

  /**
   * Handles the API call to delete a recipe and navigates to the home page on success.
   * This method subscribes internally as the side effect (navigation) is self-contained.
   * @param recipeId The ID of the recipe to delete.
   */
  deleteRecipe(recipeId: string): void {
    this.RecipeService.deleteRecipe(recipeId).subscribe({
      next: () => {
        console.log('Recipe removed successfully! Redirecting...');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 600);
      },
      error: (err) => {
        console.error('Failed to remove recipe', err);
      },
    });
  }

  /**
   * Resets the given form group to the initial recipe values.
   * This is a pure form utility function and does not call the API.
   * @param recipeForm The FormGroup to reset.
   * @param recipe The original Recipe data to reset to.
   */
  cancelChanges(recipeForm: FormGroup, recipe: Recipe): void {
    if (!recipe) return;

    recipeForm.reset({
      name: recipe.name,
      description: recipe.description,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      servings: recipe.servings,
      caloriesPerServing: recipe.caloriesPerServing,
      image: recipe.image,
      ingredients: recipe.ingredients.slice(),
      instructions: recipe.instructions.slice(),
    });

    const resetArray = (items: string[], arrayName: string) => {
      const newArray = this.fb.array(
        items.map((item) => this.fb.control(item, Validators.required))
      );
      recipeForm.setControl(arrayName, newArray);
    };

    resetArray(recipe.ingredients, 'ingredients');
    resetArray(recipe.instructions, 'instructions');
    if (recipe.tags) resetArray(recipe.tags, 'tags');
    if (recipe.mealType) resetArray(recipe.mealType, 'mealType');
  }
}
