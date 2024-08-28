import App from './App';
import { cleanup, render } from '@testing-library/react';

describe('App', () => {
  afterEach(cleanup);

  const makeSut = () => {
    const sut = render(<App />);
    return {
      sut,
    };
  };

  it('should render the component', () => {
    const { sut } = makeSut();

    expect(sut).toBeTruthy();
  });
});
