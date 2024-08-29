import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { BehaviorSubject } from 'rxjs';
import { ICustomEquipment } from '../../interfaces/iCustomEquipment';
import { IEquipmentState } from '../../interfaces/iEquipmentState';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  let equipmentService: jasmine.SpyObj<EquipmentService>;
  let selectedEquipmentSubject: BehaviorSubject<ICustomEquipment | undefined>;

  beforeEach(async () => {
    // Create a new BehaviorSubject to mock the selectedEquipment property
    selectedEquipmentSubject = new BehaviorSubject<
      ICustomEquipment | undefined
    >(undefined);

    const equipmentServiceSpy = jasmine.createSpyObj('EquipmentService', ['']);
    equipmentServiceSpy.selectedEquipment = selectedEquipmentSubject; // Mock the selectedEquipment BehaviorSubject

    await TestBed.configureTestingModule({
      imports: [TimelineComponent],
      providers: [{ provide: EquipmentService, useValue: equipmentServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    equipmentService = TestBed.inject(
      EquipmentService
    ) as jasmine.SpyObj<EquipmentService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to selectedEquipment on ngOnInit', () => {
    const mockEquipment: ICustomEquipment = {
      id: '1',
      equipmentModelId: 'model1',
      latestPosition: { lat: 0, lon: 0 },
      model: { name: 'Model 1' },
      stateList: [{ name: 'Operando' }],
    } as ICustomEquipment;

    selectedEquipmentSubject.next(mockEquipment);
    component.ngOnInit();

    expect(component.equipment).toEqual(mockEquipment);
  });

  it('should return correct icon name based on equipment state', () => {
    const mockOperatingState: IEquipmentState = {
      name: 'Operando',
      id: '1',
      color: '#000000',
    };
    const mockStoppedState: IEquipmentState = {
      name: 'Parado',
      id: '2',
      color: '#000000',
    };
    const mockMaintenanceState: IEquipmentState = {
      name: 'Manutenção',
      id: '3',
      color: '#000000',
    };
    const mockUnknownState: IEquipmentState = {
      name: 'Desconhecido',
      id: '4',
      color: '#000000',
    };

    expect(component.getIconName(mockOperatingState)).toBe('heroCheckBadge');
    expect(component.getIconName(mockStoppedState)).toBe('heroXCircle');
    expect(component.getIconName(mockMaintenanceState)).toBe('heroWrench');
    expect(component.getIconName(mockUnknownState)).toBe('heroCheckBadge');
  });
});
