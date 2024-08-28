import { cleanup, fireEvent } from '@testing-library/react';
import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '.';
import { sutMockProvider } from '@/__test__';

describe('Accordion', () => {
  afterEach(cleanup);

  const makeTemplate = () => {
    return (
      <AccordionContainer type="single" data-testid="accordion" collapsible>
        <AccordionItem value="item-1" data-testid="accordion-item">
          <AccordionTrigger data-testid="accordion-trigger">
            <span>Accordion Title</span>
          </AccordionTrigger>

          <AccordionContent data-testid="accordion-content">
            <span>Accordion Content</span>
          </AccordionContent>
        </AccordionItem>
      </AccordionContainer>
    );
  };

  const makeSut = () => {
    const sut = sutMockProvider(makeTemplate());

    return {
      sut,
    };
  };

  it('should render the component', () => {
    const { sut } = makeSut();

    expect(sut.getByTestId('accordion')).toBeInTheDocument();
  });

  it('should show the content when the trigger is clicked', () => {
    const { sut } = makeSut();

    const trigger = sut.getByText('Accordion Title');

    fireEvent.click(trigger);

    const content = sut.getByText('Accordion Content');

    expect(content).toBeInTheDocument();
  });

  it('should hide the content when the trigger is clicked twice', () => {
    const { sut } = makeSut();

    const trigger = sut.getByText('Accordion Title');

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    const content = sut.queryByText('Accordion Content');

    expect(content).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { sut } = makeSut();

    expect(sut.container).toMatchSnapshot();
  });
});
