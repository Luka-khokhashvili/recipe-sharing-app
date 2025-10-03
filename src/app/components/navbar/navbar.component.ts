import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [TabsModule, RouterLink, CommonModule, Button],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMobileMenuVisible: boolean = false;

  tabs = [
    { route: '', label: 'Dashboard', icon: 'pi pi-home' },
    { route: '/add', label: 'Add recipe', icon: 'pi pi-plus' },
  ];

  constructor(public router: Router) {}

  isActive(tabRoute: string): boolean {
    const current = this.router.url.split('?')[0].split('#')[0];
    if (tabRoute === '')
      return current === '/' || current === '' || current === '/';

    return current === tabRoute || current.startsWith(tabRoute + '/');
  }

  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
}
