import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeFormService {
  constructor(private fb: FormBuilder) {}

  initForm(recipe: Recipe): FormGroup {
    return this.fb.group({
      name: [recipe.name, Validators.required],
      image: [recipe.image, Validators.required],
      description: [recipe.description, Validators.required],
      prepTimeMinutes: [
        recipe.prepTimeMinutes,
        [Validators.required, Validators.min(1)],
      ],
      cookTimeMinutes: [
        recipe.cookTimeMinutes,
        [Validators.required, Validators.min(1)],
      ],
      servings: [recipe.servings, Validators.required],
      caloriesPerServing: [recipe.caloriesPerServing, Validators.required],
      ingredients: this.fb.array(
        recipe.ingredients.map((i) => this.fb.control(i, Validators.required))
      ),
      instructions: this.fb.array(
        recipe.instructions.map((i) => this.fb.control(i, Validators.required))
      ),
    });
  }
}
