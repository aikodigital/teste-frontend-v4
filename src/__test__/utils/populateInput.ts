import { RenderResult, fireEvent, waitFor } from '@testing-library/react';

interface PopulateInputParams {
  sut: RenderResult;
  testId: string;
  value: string;
}

export const populateInput = async ({
  sut,
  testId,
  value,
}: PopulateInputParams) => {
  const input = sut.getByTestId(testId);

  await waitFor(() => {
    fireEvent.change(input, { target: { value } });
  });
};
