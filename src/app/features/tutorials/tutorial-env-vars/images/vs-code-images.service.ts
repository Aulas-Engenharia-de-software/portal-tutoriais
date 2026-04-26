import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VsCodeImages {

  parentFolder: string = 'images/env-vars/vscode/';

  vscodeChooseJava = {
    src: this.parentFolder + 'vscode_choose_java.png',
    alt: 'Imagem 3: Escolhendo a extensão Java Extension Pack no VS Code para configurar o ambiente de desenvolvimento Java'
  }

  vscodeRunDebugConfig = {
    src: this.parentFolder + 'vscode_run_debug_config.png',
    alt: 'Imagem 2: Criando o arquivo launch.json para configurar a execução e depuração no VS Code'
  }

  vsCodeOpenLaunch = {
    src: this.parentFolder + 'vscode_open_launch.png',
    alt: 'Imagem 1: Abrindo o arquivo launch.json no VS Code para configurar a execução e depuração'
  }

  vsCodeEnvConfigurada = {
    src: this.parentFolder + 'vscode_env_configurada.png',
    alt: 'Imagem 3: Configuração de variáveis de ambiente no VS Code para o projeto Java'
  }
}
