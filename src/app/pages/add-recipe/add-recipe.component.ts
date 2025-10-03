import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';

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
  ],
  templateUrl: './add-recipe.component.html',
})
export class AddRecipeComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      instructions: this.fb.array([this.fb.control('', Validators.required)]),
      prepTimeMinutes: ['', [Validators.required]],
      cookTimeMinutes: ['', [Validators.required]],
      servings: ['', [Validators.required]],
      caloriesPerServing: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      cuisine: ['', [Validators.required]],
      tags: this.fb.array([this.fb.control('', Validators.required)]),
      image: [null, Validators.required],
      mealType: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  get tags() {
    return this.recipeForm.get('tags') as FormArray;
  }

  get mealType() {
    return this.recipeForm.get('mealType') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(this.fb.control('', Validators.required));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  addTag() {
    this.tags.push(this.fb.control('', Validators.required));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  addMealType() {
    this.mealType.push(this.fb.control('', Validators.required));
  }

  removeMealType(index: number) {
    this.mealType.removeAt(index);
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        this.recipeForm.patchValue({ image: reader.result });
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.recipeForm.get('image')?.setValue(null);
  }

  submit() {
    if (this.recipeForm.valid) {
      console.log('Recipe submitted:', this.recipeForm.value);
      // TODO: send to RecipeService (POST to JSON server)
    } else {
      this.recipeForm.markAllAsTouched();
    }
  }
}
