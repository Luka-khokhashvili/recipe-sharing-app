import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonModule, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-action-button',
  imports: [ButtonModule],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  @Input() form?: FormGroup;
  @Input() label?: string;
  @Input() severity!: ButtonSeverity;
  @Input() logic!: 'save' | 'cancel';

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onClick() {
    if (this.logic === 'save') {
      this.onSave();
    } else if (this.logic === 'cancel') {
      this.onCancel();
    }
  }

  onSave() {
    if (this.form && this.form.valid) {
      this.save.emit();
    } else if (this.form) {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
