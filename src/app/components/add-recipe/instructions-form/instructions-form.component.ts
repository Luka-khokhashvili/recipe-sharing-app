import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-instructions-form',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './instructions-form.component.html',
  styleUrl: './instructions-form.component.css',
})
export class InstructionsFormComponent {
  @Input() instructions!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  get parentGroup(): FormGroup {
    return this.instructions.parent as FormGroup;
  }

  addInstruction() {
    this.add.emit();
  }

  removeInstruction(index: number) {
    this.remove.emit(index);
  }
}
