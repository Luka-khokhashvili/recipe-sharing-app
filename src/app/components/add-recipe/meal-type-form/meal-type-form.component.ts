import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-meal-type-form',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './meal-type-form.component.html',
  styleUrl: './meal-type-form.component.css',
})
export class MealTypeFormComponent {
  @Input() mealType!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  get parentGroup(): FormGroup {
    return this.mealType.parent as FormGroup;
  }

  addMealType() {
    this.add.emit();
  }

  removeMealType(index: number) {
    this.remove.emit(index);
  }
}
