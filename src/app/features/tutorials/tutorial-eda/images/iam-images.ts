import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IamImages {

  parentFolder: string = 'images/aws-eventos/iam/';

   usuarioImg = {
    'src': this.parentFolder + 'usuarios.png',
    'alt': 'Imagem 1: Usuarios'
  }
  detalhesUsuarioImg = {
    'src': this.parentFolder + 'detalhes_usuario.png',
    'alt': 'Imagem 2: Usuarios'
  }
  anexarPoliticasDiretamente = {
    'src': this.parentFolder + 'anexar_politicas_diretamente.png',
    'alt': 'Imagem 3: Anexar politicas diretamente'
  }
  revisaoChaveAcesso = {
    'src': this.parentFolder + 'revisao_usuario.png',
    'alt': 'Imagem 4: Revisão dos dados do usuário'
  }
  criarChaveAcesso = {
    'src': this.parentFolder + 'criar_chave_acesso.png',
    'alt': 'Imagem 5: Criar chave de acesso'
  }
  opcaoCodigoLocal = {
    'src': this.parentFolder + 'opcao_codigo_local.png',
    'alt': 'Imagem 6: Opção código local'
  }
  etiquetaDescricao = {
    'src': this.parentFolder + 'etiqueta_descricao.png',
    'alt': 'Imagem 7: Etiqueta descrição'
  }
  chaveAcessoCriada = {
    'src': this.parentFolder + 'chave_acesso_criada.png',
    'alt': 'Imagem 8: Chave de acesso criada'
  }
}
