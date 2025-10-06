import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, ToggleButtonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Output() favoriteFilterChange = new EventEmitter<boolean>();

  onIcon: string = 'pi pi-star-fill';

  showFavoritesOnly = false;

  toggleFavorites() {
    // this.showFavoritesOnly = !this.showFavoritesOnly;
    this.favoriteFilterChange.emit(this.showFavoritesOnly);
  }
}
