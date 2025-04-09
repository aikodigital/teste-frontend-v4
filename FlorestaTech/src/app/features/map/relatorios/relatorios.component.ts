import { Component, OnInit } from '@angular/core';

// NGX-Bootstrap
import { BsModalRef } from 'ngx-bootstrap/modal';

// Services
import { GeneratePdfService } from './../../../shared/services/generate-pdf.service';
import { DataServiceService } from 'src/app/shared/services/data-service.service';

// Models
import { equipmentListGoupModel } from 'src/app/shared/models/equipmentListGoup.model';
import { equipamentStateModel } from 'src/app/shared/models/equipmentState.model';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {
  /**
   * Propriedade da classe.
   */
  paginaAtual: number = 1;
  equipament!: equipmentListGoupModel;
  equipamentStates!: equipamentStateModel[];

  constructor(
    private bsModalRef: BsModalRef,
    private dataServiceService: DataServiceService,
    private generatePdfService: GeneratePdfService
  ) {}

  ngOnInit() {
    this.statesEquipamants();
  }

  // Fechando Modal
  closeModal() {
    this.bsModalRef.content.onClose.next();
    this.bsModalRef.hide();
  }

  getStateEquipament(date: Date | string, param: string): string {
    let text!: string;

    const equipamant = this.equipament.stateHistory.find(
      (item) => item.date === date
    );

    const state = this.equipamentStates.find(
      (item) => item.id === equipamant?.equipmentStateId
    );
    if (state) {
      if (param === 'state') {
        text = state.name;
      } else {
        text = state.color;
      }
    } else {
      if (param === 'color') {
        text = '#6c757d';
      } else {
        text = 'Sem informação';
      }
    }

    return text;
  }

  getHours(data: string | Date): string {
    let hours!: string;
    hours = data.toString().substring(11, 16);
    return hours;
  }

  statesEquipamants() {
    this.equipamentStates = [];

    this.dataServiceService.getDadosEquipamentState().subscribe({
      next: (res) => {
        res.forEach((el) => {
          this.equipamentStates.push(el);
        });
      },
    });
  }

  gePerformance(state: string, data: string | Date): number {
    let dat: any[] = [];

    for (let index = 0; index < this.equipament.stateHistory.length; index++) {
      if (this.equipament.stateHistory[index].date === data) {
        dat.push(this.equipament.stateHistory[index]);
      }
    }

    let total = 0;

    dat.forEach((item) => {
      for (
        let index = 0;
        index < this.equipament.modelo.hourlyEarnings.length;
        index++
      ) {
        if (
          this.getNameStateEquipament(item.equipmentStateId) ===
          this.equipament.modelo.hourlyEarnings[index].state
        ) {
          total += this.equipament.modelo.hourlyEarnings[index].value;
        }
      }
    });

    return total;
  }

  getProductivity(state: string, data: string | Date): any {
    let productivity: any = '';
    if (state === 'Sem informação') {
      productivity = 0;
    }

    return productivity;
  }

  getNameStateEquipament(id: string): string {
    let states: string = '';

    switch (id) {
      case '0808344c-454b-4c36-89e8-d7687e692d57':
        states = 'Operando';
        break;
      case 'baff9783-84e8-4e01-874b-6fd743b875ad':
        states = 'Parado';
        break;
      case '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f':
        states = 'Manutenção';
        break;

      default:
        break;
    }

    return states;
  }

  // Função para montar e chamar o serviço que gera o PDF.
  gerarPdf() {
    const dados: { horario: string | Date; latLong: string; estado: string }[] =
      [];

    this.equipament.positionHitory.forEach((el) => {
      // Ajustando Data
      let date = new Date(el.date);
      date.setHours(date.getHours() + 3);
      if (date.getHours() === 0) {
        date.setHours(date.getHours() - 24);
      }

      dados.push({
        horario: date,
        latLong: `[ ${el.lat} | ${el.lon} ]`,
        estado: this.getStateEquipament(el.date, 'state'),
      });
    });

    const columns = ['Horário', 'Latitude - Longitude', 'Estado'];

    const nameEquipament: { name: string; modelo: string } = {
      name: this.equipament.name,
      modelo: this.equipament.modelo.name,
    };
    this.generatePdfService.generateTablePDF(
      nameEquipament, // Nome/ Modelo do equipamento
      'FlorestaTech - Histórico de Posições e estados do equipamento', // Titulo
      columns, // Titulo das colunas
      dados, // Dados das Colunas
      `historico-${this.equipament.name}.pdf` // Nome do arquivo.
    );
  }
}
