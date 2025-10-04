import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-ingredients-form',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './ingredients-form.component.html',
  styleUrl: './ingredients-form.component.css',
})
export class IngredientsFormComponent {
  @Input() ingredients!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  get parentGroup(): FormGroup {
    return this.ingredients.parent as FormGroup;
  }

  addIngredient() {
    this.add.emit();
  }

  removeIngredient(index: number) {
    this.remove.emit(index);
  }
}
