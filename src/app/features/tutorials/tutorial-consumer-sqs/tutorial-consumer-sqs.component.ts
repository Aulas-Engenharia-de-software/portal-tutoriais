import {Component} from '@angular/core';
import {TutorialSidebarComponent} from '../../../shared/components/tutorial-sidebar/tutorial-sidebar.component';
import {TutorialPhase} from '../../../shared/models/tutorial-phase.model';
import {TutorialStepComponent} from '../../../shared/components/tutorial-step/tutorial-step.component';
import {ZoomableImageComponent} from '../../../shared/components/zoomable-image/zoomable-image.component';
import {CodeSnippetComponent} from '../../../shared/components/code-snippet/code-snippet.component';
import {PhaseHeaderComponent} from '../../../shared/components/phase-header/phase-header.component';

@Component({
  selector: 'app-tutorial-consumer-sqs',
  imports: [
    TutorialSidebarComponent, TutorialStepComponent, ZoomableImageComponent, CodeSnippetComponent, PhaseHeaderComponent
  ],
  templateUrl: './tutorial-consumer-sqs.component.html',
  styleUrl: './tutorial-consumer-sqs.component.css',
})
export class TutorialConsumerSqsComponent {

  tutorialTitle = 'Integração SQS';
  phases: TutorialPhase[] = [
    {
      id: 'introducao',
      label: 'Introdução'
    },
    {
      id: 'dependencias',
      label: 'Fase 1: Dependências'
    },
    {
      id: 'credenciais',
      label: 'Fase 2: Credenciais'
    },
    {
      id: 'adapter',
      label: 'Fase 3: Adapter'
    },
  ]

  consumerCode = `
@Component
public class SqsPedidoAdapter {;

    private final PedidoServicePort pedidoServicePort;

    public SqsPedidoAdapter(PedidoServicePort pedidoServicePort) {
        this.pedidoServicePort = pedidoServicePort;
    }

    @SqsListener("$\{queue.order-events}")
    public void listen(SuaDTO dto) {
        System.out.println("Mensagem recebida: " + dto.getCustomerId());

        pedidoServicePort.process(dto);

        System.out.println("Mensagem consumida com sucesso.");
    };

};`

  applicationPropertiesKeys = `
# Credenciais AWS
spring.cloud.aws.credentials.access-key=SUA_ACCESS_KEY
spring.cloud.aws.credentials.secret-key=SUA_SECRET_KEY
spring.cloud.aws.region.static=us-east-1

# Nome da sua fila (Criada na Fase 2)
queue.order-events=T0XN_SEU_NOME_PEDIDOS.fifo`


  sqsAwsDependency = `
<dependency>
    <groupId>io.awspring.cloud</groupId>
    <artifactId>spring-cloud-aws-starter-sqs</artifactId>
</dependency>`

  springCloudAwsDepedencyManagement = `
  <dependencyManagement>
      <dependencies>
         <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.8</version>
            <type>pom</type>
            <scope>import</scope>
         </dependency>
         <dependency>
            <groupId>io.awspring.cloud</groupId>
            <artifactId>spring-cloud-aws-dependencies</artifactId>
            <version>3.0.2</version>
            <type>pom</type>
            <scope>import</scope>
         </dependency>
      </dependencies>
   </dependencyManagement>
`

}
