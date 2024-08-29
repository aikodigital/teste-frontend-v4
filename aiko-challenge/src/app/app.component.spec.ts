import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EquipmentService } from './core/services/equipment/equipment.service';
import { IEquipment } from './core/interfaces/iEquipment';
import { IEquipmentModel } from './core/interfaces/iEquipmentModel';
import { IHourlyEarning } from './core/interfaces/iHourlyEarning';
import { IEquipmentState } from './core/interfaces/iEquipmentState';
import { BehaviorSubject } from 'rxjs';
import { ICustomEquipment } from './core/interfaces/iCustomEquipment';

describe('AppComponent', () => {
  let component: AppComponent;
  let equipmentService: jasmine.SpyObj<EquipmentService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EquipmentService', [
      'getEquipments',
      'getEquipmentLatestPosition',
      'getEquipmentModel',
      'getEquipmentState',
      'getEquipmentStateHistory',
      'equipments',
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: EquipmentService, useValue: spy }],
    }).compileComponents();

    component = TestBed.createComponent(AppComponent).componentInstance;
    equipmentService = TestBed.inject(
      EquipmentService
    ) as jasmine.SpyObj<EquipmentService>;

    equipmentService.equipments = {
      next: jasmine.createSpy('next'),
    } as unknown as BehaviorSubject<ICustomEquipment[]>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load equipment positions and update equipmentList', () => {
    const mockEquipments: IEquipment[] = [
      { id: '1', equipmentModelId: '1', name: 'Equipment 1' },
      { id: '2', equipmentModelId: '2', name: 'Equipment 2' },
    ];

    const mockModel: IEquipmentModel = {
      name: 'Model 1',
      id: '1',
      hourlyEarnings: [{ equipmentStateId: '1' } as IHourlyEarning],
    };
    const mockState: IEquipmentState = {
      id: '1',
      name: 'Active',
      color: '#000',
    };

    equipmentService.getEquipments.and.returnValue(mockEquipments);

    equipmentService.getEquipmentModel.and.returnValue(mockModel);
    equipmentService.getEquipmentState.and.returnValue(mockState);

    component.ngOnInit();

    expect(component.equipmentList.length).toBe(2);

    expect(component.equipmentList[0].model?.hourlyEarnings[0].status).toEqual(
      mockState
    );
    expect(equipmentService.equipments.next).toHaveBeenCalledWith(
      component.equipmentList
    );
  });
});
