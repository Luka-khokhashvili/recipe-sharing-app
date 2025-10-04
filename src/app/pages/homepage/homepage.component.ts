import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../interfaces/recipe';
import { RecipesService } from '../../services/recipes.service';
import { SearchComponent } from '../../components/search/search.component';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SearchComponent, RecipeListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.recipesService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.filteredRecipes = data;
      },
      error: (err) => console.error('Failed to load recipes:', err),
    });
  }

  filterRecipes(term: string): void {
    const lowerTerm = term.trim().toLowerCase();

    this.filteredRecipes = this.recipes.filter(
      (r) =>
        r.name.toLowerCase().includes(lowerTerm) ||
        r.ingredients.some((ing) => ing.toLowerCase().includes(lowerTerm))
    );
  }

  favorite(recipe: Recipe): void {
    this.recipesService
      .favourtieRecipeById(String(recipe.id), recipe.isFavorited)
      .subscribe({
        next: () => {
          recipe.isFavorited = !recipe.isFavorited;
          console.log(
            `Recipe ${recipe.id} is now favourited: ${recipe.isFavorited}`
          );
        },
        error: (err) => console.error('Failed to favourite recipe:', err),
      });
  }
}
