import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SqsImages {

  parentFolder: string = 'images/aws-eventos/sqs/';

  criarFila = {
    src: this.parentFolder + 'criar_fila.png',
    alt: 'Imagem 1: Criar fila'
  }
  resumoSqs = {
    src: this.parentFolder + 'resumo_sqs.png',
    alt: 'Imagem 2: Resumo do SQS'
  }
}
