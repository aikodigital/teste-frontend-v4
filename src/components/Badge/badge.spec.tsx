import { cleanup } from '@testing-library/react';
import { Badge } from '.';
import { BadgeProps } from './models';
import { faker } from '@faker-js/faker';
import { sutMockProvider } from '@/__test__';

describe('Badge', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<BadgeProps>) => {
    const sutProps: BadgeProps = {
      testId: 'badge',
      children: faker.string.alpha(10),
      ...props,
    };

    const sut = sutMockProvider(<Badge {...sutProps} />);

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

    const badge = sut.getByText(text);

    expect(badge).toBeInTheDocument();
  });

  it('should render the component with correct color', () => {
    const text = faker.string.alpha(10);
    const color = faker.color.rgb();

    const { sut } = makeSut({ children: text, color });

    const badge = sut.getByText(text);

    expect(badge).toHaveStyle(`background-color: ${color}`);
  });
});
