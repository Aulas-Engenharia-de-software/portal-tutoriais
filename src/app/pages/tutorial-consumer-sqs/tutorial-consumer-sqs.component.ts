import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorial-sqs-consumer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial-consumer-sqs.component.html'
})
export class TutorialConsumerSqsComponent {

  // Lógica de Copiar para a Área de Transferência
  copyToClipboard(textToCopy: string, event: Event) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      const btn = event.currentTarget as HTMLElement;
      const originalHTML = btn.innerHTML;

      // Verifica se é um botão mobile (com o span escondido) ou o botão padrão
      const isMobileBtn = btn.querySelector('span') !== null;
      if(isMobileBtn) {
        btn.innerHTML = '<i class="fas fa-check"></i> <span class="hidden sm:inline font-sans font-bold text-[10px] uppercase">Copiado!</span>';
      } else {
        // Fallback para botões menores/simples que só têm o ícone de copiar
        btn.innerHTML = '<i class="fas fa-check text-emerald-500"></i>';
      }

      // Restaura o ícone original após 2 segundos
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    }).catch(err => {
      console.error('Falha ao copiar texto: ', err);
    });
  }
}
