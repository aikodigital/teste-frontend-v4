import { cleanup } from '@testing-library/react';
import { SelectProps } from './models';
import { populateSelect, sutMockProvider } from '@/__test__';
import { Select } from '.';
import { faker } from '@faker-js/faker';

describe('Select', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<SelectProps>) => {
    const sutProps: SelectProps = {
      testId: 'select',
      options: Array.from({ length: 5 }, () => ({
        value: faker.string.alpha(10),
        label: faker.string.alpha(10),
      })),
      ...props,
    };

    const sut = sutMockProvider(<Select {...sutProps} />);

    return {
      sut,
      sutProps,
    };
  };

  it('should render the component', () => {
    const { sut, sutProps } = makeSut();

    expect(sut.getByTestId(sutProps.testId || '')).toBeInTheDocument();
  });

  it('should render the component with correct props', () => {
    const label = faker.string.alpha(10);

    const { sut } = makeSut({ label });

    expect(sut.getByText(label)).toBeInTheDocument();
  });

  it('should populate the input with the correct value', async () => {
    const { sut, sutProps } = makeSut();

    const value = sutProps.options?.[0]?.label || '';

    const input = sut.getByTestId(sutProps.testId || '');

    await populateSelect({
      sut,
      testId: sutProps.testId || '',
      targetValue: value,
    });

    expect(input).toHaveTextContent(value);
  });
});
