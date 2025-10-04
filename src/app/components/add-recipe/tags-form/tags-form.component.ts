import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tags-form',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './tags-form.component.html',
  styleUrl: './tags-form.component.css',
})
export class TagsFormComponent {
  @Input() tags!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  get parentGroup(): FormGroup {
    return this.tags.parent as FormGroup;
  }

  addTag() {
    this.add.emit();
  }

  removeTag(index: number) {
    this.remove.emit(index);
  }
}
