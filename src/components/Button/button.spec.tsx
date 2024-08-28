import { cleanup } from '@testing-library/react';
import { ButtonProps } from './models';
import { faker } from '@faker-js/faker';
import { sutMockProvider } from '@/__test__';
import { Button } from '.';
import { theme } from '@/styles';

describe('Button', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<ButtonProps>) => {
    const sutProps: ButtonProps = {
      testId: 'button',
      children: faker.string.alpha(10),
      ...props,
    };

    const sut = sutMockProvider(<Button {...sutProps} />);

    return {
      sut,
      sutProps,
    };
  };

  it('should render the component', () => {
    const { sut, sutProps } = makeSut();

    expect(sut.getByTestId(sutProps.testId || '')).toBeInTheDocument();
  });

  it('should render the component with correct data', () => {
    const text = faker.string.alpha(10);

    const { sut } = makeSut({ children: text });

    const button = sut.getByText(text);

    expect(button).toBeInTheDocument();
  });

  it('should render the component with correct primary variant style', () => {
    const text = faker.string.alpha(10);

    const { sut } = makeSut({ children: text, variant: 'primary' });

    const button = sut.getByText(text);

    expect(button).toHaveStyle(`color: ${theme.text.white}`);
  });

  it('should render the component with correct secondary variant style', () => {
    const text = faker.string.alpha(10);

    const { sut } = makeSut({ children: text, variant: 'secondary' });

    const button = sut.getByText(text);

    expect(button).toHaveStyle(`color: ${theme.primary.dark}`);
  });
});
