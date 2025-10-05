import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Recipe } from '../../../interfaces/recipe';

@Component({
  selector: 'app-details-view',
  imports: [
    CommonModule,
    TagModule,
    RatingModule,
    ButtonModule,
    DividerModule,
    ConfirmDialog,
  ],
  templateUrl: './details-view.component.html',
  styleUrl: './details-view.component.css',
})
export class DetailsViewComponent {
  @Input() editMode!: boolean;
  @Input() recipe!: Recipe | undefined;
  @Output() favoriteToggled = new EventEmitter<void>();
  @Output() editRequested = new EventEmitter<void>();
  @Output() deleteRequested = new EventEmitter<MouseEvent>();

  onFavorite() {
    this.favoriteToggled.emit();
  }
  onToggleEdit() {
    this.editRequested.emit();
  }
  onDelete($event: MouseEvent) {
    this.deleteRequested.emit($event);
  }
}
