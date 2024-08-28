import { RenderResult, fireEvent, waitFor } from '@testing-library/react';

interface PopulateSelectParams {
  sut: RenderResult;
  testId: string;
  targetValue: string | number;
}

export const populateSelect = async ({
  sut,
  testId,
  targetValue,
}: PopulateSelectParams) => {
  const selectComponent = sut.getByTestId(testId);

  fireEvent.keyDown(selectComponent.firstChild!, {
    key: 'ArrowDown',
    code: 40,
  });

  await waitFor(() => {
    sut.getByText(targetValue);
  });

  fireEvent.click(sut.getByText(targetValue));
};
