import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorial-aws',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial-aws.component.html'
})
export class TutorialAwsComponent {

  // Controle do Lightbox de Imagens
  isLightboxOpen = false;
  currentImageSrc = '';

  openLightbox(src: string) {
    this.currentImageSrc = src;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    this.currentImageSrc = '';
    document.body.style.overflow = 'auto';
  }

  // Lógica de Copiar para a Área de Transferência
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
