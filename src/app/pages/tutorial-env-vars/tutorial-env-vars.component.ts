import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorial-env-vars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial-env-vars.component.html'
})
export class TutorialEnvVarsComponent {

  isLightboxOpen: boolean = false;
  currentImageSrc: string = '';

  openLightbox(src: string) {
    this.currentImageSrc = src;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.currentImageSrc = '';
    document.body.style.overflow = 'auto';
  }

  copyToClipboard(textToCopy: string, event: Event) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      const btn = event.currentTarget as HTMLElement;
      const originalHTML = btn.innerHTML;

      const isMobileBtn = btn.querySelector('span') !== null;
      if(isMobileBtn) {
        btn.innerHTML = '<i class="fas fa-check"></i> <span class="sm:hidden font-sans font-bold text-[10px] uppercase">Copiado!</span>';
      } else {
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
      }

      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    });
  }
}
