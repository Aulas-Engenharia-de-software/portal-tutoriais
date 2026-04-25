import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IamImages} from './images/iam-images';
import {SqsImages} from './images/sqs-images';
import {AccessPolicyImages} from './images/access-policy-images';
import {SnsSigningImages} from './images/sns-signing-images';
import {SnsRawMessageImages} from './images/sns-raw-message-images';

@Component({
  selector: 'app-tutorial-aws',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial-aws.component.html'
})
export class TutorialAwsComponent {

  constructor(public iamImages: IamImages,
              public sqsImages: SqsImages,
              public accessPolicyImages: AccessPolicyImages,
              public snsSigningImages: SnsSigningImages,
              public snsRawMessageImage: SnsRawMessageImages) {
  }

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

  copyToClipboard(textToCopy: string, event: Event) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      const btn = event.currentTarget as HTMLElement;
      const originalHTML = btn.innerHTML;

      const isMobileBtn = btn.querySelector('span') !== null;
      if (isMobileBtn) {
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
