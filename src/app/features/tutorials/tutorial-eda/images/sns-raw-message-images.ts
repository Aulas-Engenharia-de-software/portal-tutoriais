import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnsRawMessageImages {

  parentFolder: string = 'images/aws-eventos/sns/';

  snsSearch = {
    'src': this.parentFolder + 'sns_search.png',
    'alt': 'Imagem 1: SNS Search'
  }
  snsAltSignings = {
    'src': this.parentFolder + 'alt_sns_page.png',
    'alt': 'Imagem 2: Assinaturas SNS alternativa'
  }
  snsAltOptionsSignings = {
    'src': this.parentFolder + 'alt_sns_page_options.png',
    'alt': 'Imagem 3: Opções de assinatura SNS alternativa'
  }
  snsSqsSignings = {
    'src': this.parentFolder + 'sns_sqs_signings.png',
    'alt': 'Imagem 4: Assinaturas SNS para SQS'
  }
  snsErrorDetails = {
    'src': this.parentFolder + 'sns_error_details.png',
    'alt': 'Imagem 5: Detalhes do erro SNS'
  }
  snsRawMessages = {
    'src': this.parentFolder + 'sns_edit_raw_messages.png',
    'alt': 'Imagem 6: Editar mensagens brutas no SNS'
  }
}
