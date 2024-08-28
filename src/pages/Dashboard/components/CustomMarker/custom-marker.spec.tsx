import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { CustomMarkerProps } from './models';
import {
  makeEquipment,
  makeEquipmentState,
  makeUseEquipment,
  sutMockProvider,
} from '@/__test__';
import { faker } from '@faker-js/faker';
import { CustomMarker } from '.';
import { MapContainer } from 'react-leaflet';

describe('CustomMarker', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<CustomMarkerProps>) => {
    const sutProps: CustomMarkerProps = {
      equipment: makeEquipment(),
      iconUrl: faker.internet.url(),
      position: {
        date: faker.date.recent().toISOString(),
        lat: faker.location.latitude(),
        lon: faker.location.longitude(),
      },
      state: makeEquipmentState(),
      isEquipmentPositionHistory: faker.datatype.boolean(),
      useEquipmentHook: makeUseEquipment(),
      ...props,
    };

    const sut = sutMockProvider(
      <MapContainer center={[0, 0]} zoom={10}>
        <CustomMarker {...sutProps} />
      </MapContainer>
    );

    return {
      sut,
      sutProps,
    };
  };

  it('should render the component', () => {
    const { sut } = makeSut();

    const marker = sut
      .getAllByRole('button')
      .find((marker) => marker.tagName === 'IMG');

    expect(marker).toBeInTheDocument();
  });

  it('should render the component with correct data', () => {
    const { sut, sutProps } = makeSut();

    const marker = sut
      .getAllByRole('button')
      .find((marker) => marker.tagName === 'IMG');

    if (marker) {
      fireEvent.click(marker);
    }

    expect(sut.getByText(sutProps.equipment.name)).toBeInTheDocument();
    expect(
      sut.getByText(sutProps.equipment.equipmentModel?.name || '')
    ).toBeInTheDocument();
    expect(sut.getByText(sutProps.state.name)).toBeInTheDocument();

    expect(
      sut.getByText(new Date(sutProps.position.date).toLocaleString())
    ).toBeInTheDocument();
    expect(sut.getByText(sutProps.position.lat.toString())).toBeInTheDocument();
    expect(sut.getByText(sutProps.position.lon.toString())).toBeInTheDocument();
  });

  it('should show button to open accordion when isEquipmentPositionHistory is false', () => {
    const { sut } = makeSut({
      isEquipmentPositionHistory: false,
    });

    const marker = sut
      .getAllByRole('button')
      .find((marker) => marker.tagName === 'IMG');

    if (marker) {
      fireEvent.click(marker);
    }

    expect(sut.getByText('Última atualização:')).toBeInTheDocument();
    expect(sut.getByTestId('button-open-accordion')).toBeInTheDocument();
  });

  it('should not show button to open accordion when isEquipmentPositionHistory is true', () => {
    const { sut } = makeSut({
      isEquipmentPositionHistory: true,
    });

    const marker = sut
      .getAllByRole('button')
      .find((marker) => marker.tagName === 'IMG');

    if (marker) {
      fireEvent.click(marker);
    }

    expect(sut.getByText('Data:')).toBeInTheDocument();
    expect(sut.queryByTestId('button-open-accordion')).not.toBeInTheDocument();
  });

  it('should call handleOpenEquipmentAccordion when button is clicked', async () => {
    const getElementByIdSpy = vi.spyOn(document, 'getElementById');

    const { sut, sutProps } = makeSut({
      isEquipmentPositionHistory: false,
    });

    const accordionTrigger = document.createElement('div');
    accordionTrigger.id = `accordion-trigger-${sutProps.equipment.id}`;
    accordionTrigger.scrollIntoView = vi.fn();
    document.body.appendChild(accordionTrigger);

    const clickSpy = vi.spyOn(accordionTrigger, 'click');
    const scrollIntoViewSpy = vi.spyOn(accordionTrigger, 'scrollIntoView');

    const marker = sut
      .getAllByRole('button')
      .find((marker) => marker.tagName === 'IMG');

    if (marker) {
      fireEvent.click(marker);
    }

    fireEvent.click(sut.getByTestId('button-open-accordion'));

    expect(getElementByIdSpy).toHaveBeenCalledWith(
      `accordion-trigger-${sutProps.equipment.id}`
    );
    expect(clickSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(scrollIntoViewSpy).toHaveBeenCalled();
    });
  });
});
