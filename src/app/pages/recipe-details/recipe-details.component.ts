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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditImage } from '../../components/recipe-details/edit-image/edit-image';
import { TextInputComponent } from '../../components/add-recipe/text-input/text-input.component';
import { TextareaInputComponent } from '../../components/add-recipe/textarea-input/textarea-input.component';
import { NumberInputComponent } from '../../components/add-recipe/number-input/number-input.component';
import { IngredientsFormComponent } from '../../components/add-recipe/ingredients-form/ingredients-form.component';
import { InstructionsFormComponent } from '../../components/add-recipe/instructions-form/instructions-form.component';
import { ActionButtonComponent } from '../../components/recipe-details/action-button/action-button.component';
import { DetailsViewComponent } from '../../components/recipe-details/details-view/details-view.component';
import { ConfirmationHandlerService } from '../../services/confirmation-handler.service';

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
    ConfirmDialog,
    ToastModule,
    EditImage,
    TextInputComponent,
    TextareaInputComponent,
    NumberInputComponent,
    IngredientsFormComponent,
    InstructionsFormComponent,
    ActionButtonComponent,
    DetailsViewComponent,
  ],
  providers: [ConfirmationService, MessageService],
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
    private RecipeService: RecipesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private confirmHandler: ConfirmationHandlerService
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
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 600);
      },
      error: (err) => {
        console.error('Failed to remove recipe', err);
      },
    });
  }

  save(event: Event) {
    this.confirmHandler.confirmAction(event, {
      message: 'Are you sure you want to save changes?',
      header: 'Update recipe',
      icon: 'pi pi-info-circle',
      severity: 'success',
      acceptSummary: 'Recipe has been updated',
      rejectSummary: 'Update canceled',
      acceptAction: () => this.saveChanges(),
      rejectAction: () => (this.editMode = false),
    });
  }

  cancel(event: Event) {
    this.confirmHandler.confirmAction(event, {
      message: 'Do you want to cancel editing?',
      header: 'Cancel',
      icon: 'pi pi-exclamation-triangle',
      severity: 'info',
      acceptSummary: 'Recipe edit canceled',
      rejectSummary: 'You have rejected',
      acceptAction: () => this.cancelChanges(),
    });
  }
  delete(event: Event) {
    this.confirmHandler.confirmAction(event, {
      message: 'Are you sure you want to delete this recipe?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      severity: 'error',
      acceptSummary: 'Recipe has been deleted',
      rejectSummary: 'Recipe deletion rejected',
      acceptAction: () => this.deleteRecipe(),
    });
  }

  private getControl(name: string): FormControl {
    return this.recipeForm.get(name) as FormControl;
  }

  private getArray(name: string): FormArray {
    return this.recipeForm.get(name) as FormArray;
  }

  get nameControl(): FormControl {
    return this.getControl('name');
  }
  get descriptionControl(): FormControl {
    return this.getControl('description');
  }
  get prepTimeControl(): FormControl {
    return this.getControl('prepTimeMinutes');
  }
  get cookTimeControl(): FormControl {
    return this.getControl('cookTimeMinutes');
  }
  get servingsControl(): FormControl {
    return this.getControl('servings');
  }
  get caloriesPerServingControl(): FormControl {
    return this.getControl('caloriesPerServing');
  }
  get difficultyControl(): FormControl {
    return this.getControl('difficulty');
  }
  get cuisineControl(): FormControl {
    return this.getControl('cuisine');
  }

  get ingredients() {
    return this.getArray('ingredients');
  }
  get instructions() {
    return this.getArray('instructions');
  }
  get tags() {
    return this.getArray('tags');
  }
  get mealType() {
    return this.getArray('mealType');
  }

  onImageUpload(base64Image: string): void {
    this.recipeForm.get('image')?.setValue(base64Image);
  }

  removeImage(): void {
    this.recipeForm.get('image')?.setValue(null);
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

  onSaveChanges() {
    this.saveChanges();
  }

  onCancelChanges() {
    this.cancelChanges();
  }
}
