import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { RecipesService } from '../../services/recipes.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ImageUploadComponent } from '../../components/add-recipe/image-upload/image-upload.component';
import { IngredientsFormComponent } from '../../components/add-recipe/ingredients-form/ingredients-form.component';
import { InstructionsFormComponent } from '../../components/add-recipe/instructions-form/instructions-form.component';
import { TagsFormComponent } from '../../components/add-recipe/tags-form/tags-form.component';
import { MealTypeFormComponent } from '../../components/add-recipe/meal-type-form/meal-type-form.component';
import { TextareaInputComponent } from '../../components/add-recipe/textarea-input/textarea-input.component';
import { TextInputComponent } from '../../components/add-recipe/text-input/text-input.component';
import { NumberInputComponent } from '../../components/add-recipe/number-input/number-input.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    Textarea,
    ButtonModule,
    TagModule,
    FileUploadModule,
    DividerModule,
    ConfirmDialog,
    ToastModule,
    ImageUploadComponent,
    IngredientsFormComponent,
    InstructionsFormComponent,
    TagsFormComponent,
    MealTypeFormComponent,
    TextareaInputComponent,
    TextInputComponent,
    NumberInputComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './add-recipe.component.html',
})
export class AddRecipeComponent {
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipesService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      instructions: this.fb.array([this.fb.control('', Validators.required)]),
      prepTimeMinutes: ['', Validators.required],
      cookTimeMinutes: ['', Validators.required],
      servings: ['', Validators.required],
      caloriesPerServing: ['', Validators.required],
      difficulty: ['', Validators.required],
      cuisine: ['', Validators.required],
      tags: this.fb.array([this.fb.control('', Validators.required)]),
      mealType: this.fb.array([this.fb.control('', Validators.required)]),
      image: [''],
    });
  }

  private getControl(name: string): FormControl {
    // Use non-null assertion (!) because we know these controls exist in initForm
    return this.recipeForm.get(name) as FormControl;
  }

  private getArray(name: string): FormArray {
    return this.recipeForm.get(name) as FormArray;
  }

  // Getters for cleaner template access
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

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }
  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  addInstruction() {
    this.instructions.push(this.fb.control('', Validators.required));
  }
  removeInstruction(i: number) {
    this.instructions.removeAt(i);
  }

  addTag() {
    this.tags.push(this.fb.control('', Validators.required));
  }
  removeTag(i: number) {
    this.tags.removeAt(i);
  }

  addMealType() {
    this.mealType.push(this.fb.control('', Validators.required));
  }
  removeMealType(i: number) {
    this.mealType.removeAt(i);
  }

  onImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        this.recipeForm.patchValue({ image: reader.result as string });
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.recipeForm.patchValue({ image: '' });
  }

  addRecipe(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      this.message.add({
        severity: 'error',
        summary: 'Invalid Data',
        detail: 'Please fill all fields correctly.',
      });
      return;
    }

    this.recipeService.postRecipe(this.recipeForm.value).subscribe({
      next: () => {
        this.message.add({
          severity: 'success',
          summary: 'Recipe Added',
          detail: 'Your recipe has been saved!',
        });
        this.recipeForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add recipe.',
        });
      },
    });
  }
}
