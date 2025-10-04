import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [];
  @Output() favorite = new EventEmitter<Recipe>();

  onFavorite(recipe: Recipe) {
    this.favorite.emit(recipe);
  }
}
