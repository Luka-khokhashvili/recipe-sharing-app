import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { RecipeFormService } from '../../services/recipe-form.service';
import { RecipeAPIService } from '../../services/recipe-api.service';

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
  providers: [ConfirmationService, MessageService, ConfirmationHandlerService],
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
    private RecipeService: RecipesService,
    private formService: RecipeFormService,
    private apiActions: RecipeAPIService,
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
    this.recipeForm = this.formService.initForm(recipe);
  }

  favorite = () => {
    this.apiActions
      .favorite(this.recipeId, this.recipe?.isFavorited)
      .subscribe({
        next: (updatedRecipe) => {
          this.recipe = updatedRecipe;
        },
        error: (err) => {
          console.error('Failed to favourite recipe:', err);
        },
      });
  };

  saveChanges() {
    if (this.recipeForm.valid) {
      this.apiActions
        .saveChanges(this.recipeId, this.recipeForm, this.recipe)
        .subscribe({
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
      this.apiActions.cancelChanges(this.recipeForm, this.recipe);
      this.editMode = false;
    }
  }

  deleteRecipe() {
    this.apiActions.deleteRecipe(this.recipeId);
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

      acceptButtonConfig: {
        label: 'Update',
        severity: 'success',
      },
      rejectButtonConfig: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
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

      acceptButtonConfig: {
        label: 'Yes',
        severity: 'danger',
      },
      rejectButtonConfig: {
        label: 'No',
        severity: 'secondary',
        outlined: true,
      },
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

      acceptButtonConfig: {
        label: 'Delete',
        severity: 'danger',
      },
      rejectButtonConfig: {
        label: 'Cancel',
        severity: 'success',
      },
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
}
