import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../interfaces/recipe';
import { RecipesService } from '../../services/recipes.service';
import { SearchComponent } from '../../components/search/search.component';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { RecipeAPIService } from '../../services/recipe-api.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    RecipeListComponent,
    FilterComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  searchTerm!: string;
  showFavouritesOnly: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private apiActions: RecipeAPIService
  ) {}

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

  onSearch(term: string) {
    this.searchTerm = term.trim().toLowerCase();
    this.applyFilters();
  }

  onFavoriteFilter(showFavorites: boolean) {
    this.showFavouritesOnly = showFavorites;
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchTerm;

    this.filteredRecipes = this.recipes.filter((r) => {
      const matchesSearch =
        !term ||
        r.name.toLowerCase().includes(term) ||
        r.ingredients.some((i) => i.toLowerCase().includes(term));

      const matchesFavourite = !this.showFavouritesOnly || r.isFavorited;

      return matchesSearch && matchesFavourite;
    });
  }

  favorite(recipe: Recipe): void {
    this.apiActions.favorite(String(recipe.id), recipe?.isFavorited).subscribe({
      next: (updatedRecipe) => {
        const index = this.recipes.findIndex((r) => r.id == updatedRecipe.id);
        if (index !== -1) {
          this.recipes[index] = updatedRecipe;
        }

        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to favourite recipe:', err);
      },
    });
  }
}
