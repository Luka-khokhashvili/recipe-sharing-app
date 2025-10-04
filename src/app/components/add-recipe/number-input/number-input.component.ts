import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-number-input',
  imports: [CommonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.css',
})
export class NumberInputComponent {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() icon?: string;
  @Input() control!: FormControl;
}
