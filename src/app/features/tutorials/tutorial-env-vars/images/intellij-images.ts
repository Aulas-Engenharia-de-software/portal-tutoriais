import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntellijImages {

  parentFolder: string = 'images/env-vars/intellij/';

  intellijRunConfig = {
    src: this.parentFolder + 'intellij_config_execucao.png',
    alt: 'Imagem 1: Configuração de execução no IntelliJ'
  }
  settingEnvVars = {
    src: this.parentFolder + 'setting_env_vars.png',
    alt: 'Imagem 2: Configurando variáveis de ambiente no IntelliJ'
  }

  addEnvironmentVarConfig = {
    src: this.parentFolder + 'add_env_var_config.png',
    alt: 'Imagem 3: Adicionando variáveis de ambiente na configuração de execução do IntelliJ'
  }

  envVarsConfigured = {
    src: this.parentFolder + 'env_vars_configured.png',
    alt: 'Imagem 4: Variáveis de ambiente configuradas na execução do IntelliJ'
  }
}
