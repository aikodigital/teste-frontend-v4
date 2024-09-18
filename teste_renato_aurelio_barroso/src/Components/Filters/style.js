import styled from "styled-components";

export const Filters = styled.div`
  margin: 2rem 0 1rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > *,
  form > * {
    font-size: 14px;
    border-radius: 5px;

    &:not(:last-child) {
      margin-right: 3rem;
    }
  }

  input {
    border: none;
    outline: none;
  }
`;

export const TextBox = styled.div`
  display: flex;
  border: 1px solid var(--dark);
  padding: 0.25rem 0.5rem;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }

  input {
    min-width: 200px;
  }

  button {
    color: var(--medium-grey);
    padding: 0;
    transition: all 350ms;

    &:hover {
      color: var(--analog-green);
    }
  }
`;

export const Select = styled.select`
  padding: 0.25rem 0.5rem;
  height: 100%;
`;

export const Clear = styled.button`
  background: var(--triad-red);
  color: var(--light);
  border: none;
  height: 100%;
  padding: 0.5rem 1rem;
  transition: all 350ms;

  &:hover {
    background: var(--triad-red-2);
  }
`;
