import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  imports: [],
  standalone: true,
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.css',
})
export class CodeSnippetComponent {

  @Input()
  code!: string;

  @Input()
  language!: string;

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
