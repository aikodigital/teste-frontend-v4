import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { EquipmentService } from '../../services/equipment/equipment.service';
import * as LF from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { ICustomEquipment } from '../../interfaces/iCustomEquipment';
import { IPosition } from '../../interfaces/iPosition';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let equipmentService: jasmine.SpyObj<EquipmentService>;
  let equipmentsSubject: BehaviorSubject<ICustomEquipment[]>;

  beforeEach(async () => {
    equipmentsSubject = new BehaviorSubject<ICustomEquipment[]>([]);

    const equipmentServiceSpy = jasmine.createSpyObj('EquipmentService', [
      'selectedEquipment',
    ]);
    equipmentServiceSpy.equipments = equipmentsSubject;

    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [{ provide: EquipmentService, useValue: equipmentServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    equipmentService = TestBed.inject(
      EquipmentService
    ) as jasmine.SpyObj<EquipmentService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the map on ngOnInit', () => {
    spyOn(component, 'initializeMap').and.callThrough();
    spyOn(component, 'addTileLayer').and.callThrough();
    spyOn(component, 'subscribeToPositions').and.callThrough();

    component.ngOnInit();

    expect(component.initializeMap).toHaveBeenCalled();
    expect(component.addTileLayer).toHaveBeenCalled();
    expect(component.subscribeToPositions).toHaveBeenCalled();
    expect(component.map).toBeDefined();
  });

  it('should add tile layer to the map', () => {
    component.map = LF.map(document.createElement('div')).setView([0, 0], 1);
    spyOn(LF, 'tileLayer').and.callThrough();

    component.addTileLayer();

    expect(LF.tileLayer).toHaveBeenCalledWith(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    );
  });

  it('should subscribe to equipment positions and add markers', () => {
    const mockEquipments: ICustomEquipment[] = [
      {
        id: '1',
        equipmentModelId: 'a3540227-2f0e-4362-9517-92f41dabbfdf',
        latestPosition: { lat: 0, lon: 0 } as IPosition,
        model: { name: 'Model 1' },
        stateList: [{ name: 'Active' }],
      },
    ] as ICustomEquipment[];

    spyOn(component, 'addMarker').and.callThrough();
    component.map = LF.map(document.createElement('div')).setView([0, 0], 1);

    // Push mockEquipments to the BehaviorSubject
    equipmentsSubject.next(mockEquipments);

    component.subscribeToPositions();

    expect(component.addMarker).toHaveBeenCalledWith(mockEquipments[0]);
  });

  it('should create a custom icon with correct color class', () => {
    const icon = component.createCustomIcon(
      'a3540227-2f0e-4362-9517-92f41dabbfdf'
    );
    expect(icon.options.className).toBe('triangle-marker');
    expect(icon.options.html).toContain('marker-color-yellow');
  });

  it('should add marker to map with correct popup and event handlers', () => {
    component.map = LF.map(document.createElement('div')).setView([0, 0], 1);
    const mockEquipment: ICustomEquipment = {
      id: '1',
      equipmentModelId: 'a3540227-2f0e-4362-9517-92f41dabbfdf',
      latestPosition: { lat: 0, lon: 0 } as IPosition,
      model: { name: 'Model 1' },
      stateList: [{ name: 'Active' }],
    } as ICustomEquipment;

    spyOn(LF, 'marker').and.callThrough();
    component.addMarker(mockEquipment);

    expect(LF.marker).toHaveBeenCalled();
  });
});
