import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() favoriteToggled = new EventEmitter<Recipe>();

  onFavorite(recipe: Recipe) {
    this.favoriteToggled.emit(recipe);
  }
}
