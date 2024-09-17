import { Component, computed, inject, output, signal } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { EquipmentService } from '../../services/equipment.services';
import { EquipmentToMapData } from '../../interfaces/equiments.interfaces';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule,MatButtonModule],
templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  private equipmentServices = inject(EquipmentService);
  filterEquipments = output<EquipmentToMapData[]>();
  equipmentStateOptions = [
    {value: 'operando',text: 'Operando'},
    {value: 'parado',text: 'Parado'},
    {value: 'manuntencion',text: 'Manutenção'}
  ];
  equipmentModelOptions = [
    {value:'camion',text:'Caminhão de carga'},
    {value:'harvester',text:'Harvester'},
    {value:'garra',text:'Garra traçadora'}
  ];
  private selectedModelFilter = signal<string>('all');
  private selectedStatusFilter = signal<string>('all');  

  onChangeModelFilter(filter: string) {
    console.log('model filter')
    console.log(filter)
    this.selectedModelFilter.set(filter);
  }

  onChangeStatusFilter(filter: string) {
    console.log('model filter')
    console.log(filter)
    this.selectedStatusFilter.set(filter);
  }

  equipments = computed( () =>  {
    
    if(this.selectedModelFilter() !== 'all'){
      switch(this.selectedModelFilter()) {
        case 'all': 
        return this.equipmentServices.getEquipments();
        case 'harvester':
        return this.equipmentServices.getEquipments()
        .filter( (model) => model.idModel === 'a4b0c114-acd8-4151-9449-7d12ab9bf40f')
        case 'camion':
        return this.equipmentServices.getEquipments()
        .filter( (model) => model.idModel === "a3540227-2f0e-4362-9517-92f41dabbfdf")
        case 'garra':
        return this.equipmentServices.getEquipments()
        .filter( (model) => model.idModel === "9c3d009e-0d42-4a6e-9036-193e9bca3199")
        default:
          return this.equipmentServices.getEquipments();    
      }
    } if(this.selectedStatusFilter()) {
      switch(this.selectedStatusFilter()) {
        case 'all': 
        return this.equipmentServices.getEquipments();
        case 'operando':
        return this.equipmentServices.getEquipments()
        .filter( (status) => status.state === 'Operando')
        case 'parado':
        return this.equipmentServices.getEquipments()
        .filter( (status) => status.state === 'Parado')
        case 'manuntencion':
        return this.equipmentServices.getEquipments()
        .filter( (status) => status.state === 'Manutenção')
        default:
          return this.equipmentServices.getEquipments();    
      }
    }
    return this.equipmentServices.getEquipments();
  });

  onFilter(){
    console.log(this.equipments())
    console.log(this.selectedStatusFilter())
    this.filterEquipments.emit(this.equipments());
  }

  // tasks = computed( () => {
  //   switch(this.selectedFilter()){
  //     case 'all':
  //       return this.taskService.getAllTask();
  //     case 'open':
  //       return this.taskService
  //       .getAllTask()
  //       .filter( (task) => task.status === 'OPEN' );
  //     case 'in-progress':
  //       return this.taskService
  //       .getAllTask()
  //       .filter( (task) => task.status === 'IN_PROGRESS' );
  //     case 'done':
  //       return this.taskService
  //       .getAllTask()
  //       .filter( (task) => task.status === 'DONE' ); 
  //     default: 
  //       return this.taskService.getAllTask();        
  //   }
  // })
}
