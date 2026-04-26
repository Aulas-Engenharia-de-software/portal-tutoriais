import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessPolicyImages {

  parentFolder: string = 'images/aws-eventos/access-policy/';

  criarPolitica = {
    src: this.parentFolder + 'identificar_arn.png',
    alt: 'Imagem 1: Identificar ARN'
  }
  politicaSqs = {
    src: this.parentFolder + 'politica_sqs.png',
    alt: 'Imagem 2: Política SQS'
  }
  editarPolitica = {
    src: this.parentFolder + 'editar_politica.png',
    alt: 'Imagem 3: Editar política'
  }
}
