import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-image-upload',
  imports: [CommonModule, ButtonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  @Input() image: string | null = null;
  @Output() imageChange = new EventEmitter<string>();
  @Output() remove = new EventEmitter<void>();

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageChange.emit(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  triggerUpload(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  removeImage() {
    this.remove.emit();
  }
}
