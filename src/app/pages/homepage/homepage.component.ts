import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Recipe } from '../../interfaces/recipe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-homepage',
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  recipes: Recipe[] = [];

  constructor(private RecipeService: RecipesService) {}

  ngOnInit() {
    this.RecipeService.getRecipes().subscribe((data) => {
      console.log('Fetched recipes:', data);
      this.recipes = data;
    });
  }

  favorite = (recipe: Recipe): void => {
    this.RecipeService.favourtieRecipeById(
      String(recipe.id),
      recipe.isFavorited
    ).subscribe({
      next: () => {
        const index = this.recipes.findIndex((r) => r.id === recipe.id);
        if (index > -1) {
          this.recipes[index].isFavorited = !this.recipes[index].isFavorited;
          console.log(
            `Recipe ${recipe.id} is now favourited: ${recipe.isFavorited}`
          );
        }
      },
      error: (err) => {
        console.error('Failed to favourite recipe:', err);
      },
    });
  };
}
