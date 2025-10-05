import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-edit-image',
  imports: [CommonModule, ButtonDirective],
  templateUrl: './edit-image.html',
  styleUrl: './edit-image.css',
})
export class EditImage {
  @Input() image: string | null = null;
  @Output() imageChange = new EventEmitter<string>();
  @Output() remove = new EventEmitter<void>();

  previewUrl: string | null = null;

  ngOnInit() {
    this.previewUrl = this.image;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.imageChange.emit(this.previewUrl);
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.previewUrl = null;
    this.remove.emit();
  }
}
