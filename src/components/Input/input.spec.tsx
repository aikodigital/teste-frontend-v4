import { cleanup } from '@testing-library/react';
import { InputProps } from './models';
import { Input } from '.';
import { populateInput, sutMockProvider } from '@/__test__';
import { faker } from '@faker-js/faker';

describe('Input', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<InputProps>) => {
    const sutProps: InputProps = {
      testId: 'input',
      ...props,
    };

    const sut = sutMockProvider(<Input {...sutProps} />);

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
    const placeholder = faker.string.alpha(10);

    const { sut } = makeSut({ label, placeholder });

    expect(sut.getByText(label)).toBeInTheDocument();
    expect(sut.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should populate the input with the correct value', async () => {
    const value = faker.string.alpha(10);

    const { sut, sutProps } = makeSut();

    const input = sut.getByTestId(sutProps.testId || '');

    await populateInput({ sut, testId: sutProps.testId || '', value });

    expect(input).toHaveValue(value);
  });
});
