import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';
import { RecipesService } from '../../services/recipes.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-recipe-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    TagModule,
    ChipModule,
    DividerModule,
    ButtonModule,
    RatingModule,
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipe!: Recipe | undefined;
  recipeId: string = '1';
  isLoading: boolean = false;

  editMode = false;
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private RecipeService: RecipesService
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '1';
    this.isLoading = true;

    if (this.recipeId) {
      this.RecipeService.getRecipeById(this.recipeId).subscribe({
        next: (recipe) => {
          this.recipe = recipe;
          this.initForm(recipe);
        },
        error: (err) => {
          console.error('Unable to get recipe data', err);
          this.isLoading = false;
        },
      });
    }
  }

  initForm(recipe: Recipe) {
    this.recipeForm = this.fb.group({
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

  favorite = () => {
    this.RecipeService.favourtieRecipeById(
      this.recipeId,
      this.recipe?.isFavorited
    ).subscribe({
      next: (updatedRecipe) => {
        this.recipe = updatedRecipe;
      },
      error: (err) => {
        console.error('Failed to favourite recipe:', err);
      },
    });
  };

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(this.fb.control(''));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  deleteRecipe() {
    this.RecipeService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        console.log('Recipe removed successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Failed to remove recipe', err);
      },
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.recipeForm.get('image')?.setValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (this.recipeForm.valid) {
      const updatedRecipe = {
        ...this.recipe,
        ...this.recipeForm.value,
      };
      console.log('Recipe update succesfull', updatedRecipe);

      this.RecipeService.updateRecipe(this.recipeId, updatedRecipe).subscribe({
        next: (updatedRecipe) => {
          this.recipe = updatedRecipe;
          this.editMode = false;
        },
        error: (err) => {
          console.error('Failed to update recipe:', err);
        },
      });
    }
  }

  cancelChanges() {
    if (this.recipe) {
      this.recipeForm.reset({
        name: this.recipe.name,
        description: this.recipe.description,
        prepTimeMinutes: this.recipe.prepTimeMinutes,
        cookTimeMinutes: this.recipe.cookTimeMinutes,
        servings: this.recipe.servings,
        caloriesPerServing: this.recipe.caloriesPerServing,
        image: this.recipe.image,
        ingredients: this.recipe.ingredients.slice(),
        instructions: this.recipe.instructions.slice(),
      });

      this.recipeForm.setControl(
        'ingredients',
        this.fb.array(
          this.recipe.ingredients.map((i) =>
            this.fb.control(i, Validators.required)
          )
        )
      );
      this.recipeForm.setControl(
        'instructions',
        this.fb.array(
          this.recipe.instructions.map((i) =>
            this.fb.control(i, Validators.required)
          )
        )
      );

      this.editMode = false;
    }
  }
}
