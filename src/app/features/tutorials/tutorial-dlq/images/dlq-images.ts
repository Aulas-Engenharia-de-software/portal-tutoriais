import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DlqImages {

  parentFolder: string = 'images/dlq/';

  createQueueDlq = {
    src: this.parentFolder + 'create_queue_dlq.png',
    alt: 'Tela de criação de fila SQS'
  }

  createFifoNameDlq = {
    src: this.parentFolder + 'create_fifo_name_dlq.png',
    alt: 'Selecionando o tipo da fila como FIFO'
  }

  copyArnDlq = {
    src: this.parentFolder + 'copy_arn_dlq.png',
    alt: 'Copiando o ARN da DLQ recém criada'
  }

  editMainQueue = {
    src: this.parentFolder + 'edit_main_queue.png',
    alt: 'Editando a fila SQS principal'
  }

  dlqConfigInSqs = {
    src: this.parentFolder + 'dlq_config_in_sqs.png',
    alt: 'Configuração da Dead-letter queue'
  }

  startRedriveDlq = {
    src: this.parentFolder + 'start_redrive_dlq.png',
    alt: 'Botão de iniciar redrive na DLQ'
  }
}
