import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-textarea-input',
  imports: [CommonModule, TextareaModule, ReactiveFormsModule],
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.css',
})
export class TextareaInputComponent {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() icon?: string;
  @Input() rows: number = 3;
  @Input() control!: FormControl;
}
