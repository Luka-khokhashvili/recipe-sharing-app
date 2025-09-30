import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [TabsModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  tabs = [
    { route: 'home', label: 'Dashboard', icon: 'pi pi-home' },
    { route: 'add', label: 'Add recipe', icon: 'pi pi-plus' },
  ];
}
