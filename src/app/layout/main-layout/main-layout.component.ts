import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  isMobileMenuOpen = false;

  constructor(router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  toggleMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
