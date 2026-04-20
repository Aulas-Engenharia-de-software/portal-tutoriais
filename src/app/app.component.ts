import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  isMobileSidebarOpen = false;
  isAwsMenuOpen = false;
  isHexMenuOpen = false;

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    document.body.style.overflow = this.isMobileSidebarOpen ? 'hidden' : 'auto';
  }

  closeMobileSidebar() {
    if (window.innerWidth < 1024) {
      this.isMobileSidebarOpen = false;
      document.body.style.overflow = 'auto';
    }
  }

  toggleMenu(menu: string) {
    if (menu === 'aws') this.isAwsMenuOpen = !this.isAwsMenuOpen;
    if (menu === 'hex') this.isHexMenuOpen = !this.isHexMenuOpen;
  }
}
