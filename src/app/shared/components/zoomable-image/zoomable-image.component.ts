import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-zoomable-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zoomable-image.component.html',
  styleUrl: './zoomable-image.component.css',
})
export class ZoomableImageComponent {

  isLightboxOpen = false;
  currentImageSrc = '';

  @Input()
  src!: string;

  @Input()
  alt!: string;

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

}
