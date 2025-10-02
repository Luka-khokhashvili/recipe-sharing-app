import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';
import { RecipesService } from '../../services/recipes.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-details',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TagModule,
    ChipModule,
    DividerModule,
    ButtonModule,
    RatingModule,
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipe!: Recipe | undefined;
  recipeId: number = 0;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private RecipeService: RecipesService
  ) {}

  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.recipeId) {
      this.isLoading = true;
      this.RecipeService.getRecipeById(this.recipeId).subscribe({
        next: (data) => {
          this.recipe = data;
        },
        error: (err) => {
          console.error('Unable to get recipe data', err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  favorite = () => {
    this.RecipeService.favourtieRecipeById(
      this.recipeId,
      this.recipe?.isFavorited
    ).subscribe({
      next: (updatedRecipe) => {
        this.recipe = updatedRecipe;
        console.log(
          `Recipe ${updatedRecipe.id} is now favourited: ${updatedRecipe.isFavorited}`
        );
      },
      error: (err) => {
        console.error('Failed to favourite recipe:', err);
      },
    });
  };
}
