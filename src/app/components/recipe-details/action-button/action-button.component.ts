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

  @Output() save = new EventEmitter<Event>();
  @Output() cancel = new EventEmitter<Event>();

  onClick(event: Event) {
    if (this.logic === 'save') {
      this.onSave(event);
    } else if (this.logic === 'cancel') {
      this.onCancel(event);
    }
  }

  onSave(event: Event) {
    if (this.form && this.form.valid) {
      this.save.emit(event);
    } else if (this.form) {
      this.form.markAllAsTouched();
    }
  }

  onCancel(event: Event) {
    this.cancel.emit(event);
  }
}
