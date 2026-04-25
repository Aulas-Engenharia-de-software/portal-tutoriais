import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnsSigningImages {

  parentFolder: string = 'images/aws-eventos/sns-signing/';

  assinaturasSns = {
    src: this.parentFolder + 'assinaturas_sns.png',
    alt: 'Imagem 1: Assinaturas SNS'
  }
  inscreverSNS = {
    src: this.parentFolder + 'inscrever_sns.png',
    alt: 'Imagem 2: Inscrever no SNS'
  }
  sqsAssinado = {
    src: this.parentFolder + 'sqs_assinado.png',
    alt: 'Imagem 3: SQS assinado'
  }
}
