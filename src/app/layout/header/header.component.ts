import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  isMobileMenuOpen = false;
  currentYear = new Date().getFullYear();
  currentSemester = this.getCurrentSemester();

  toggleMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  private getCurrentSemester() {
    return new Date().getMonth() <= 6 ? 1 : 2;
  }
}
