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

  constructor(private recipeService: RecipesService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data) => {
      console.log('Fetched recipes:', data);
      this.recipes = data;
    });
  }
}
