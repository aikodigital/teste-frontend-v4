import styled from "styled-components";

export const Details = styled.div`
  position: absolute;
  top: 5rem;
  left: -100.5rem;
  min-width: 0px;
  min-height: 0px;
  height: 100%;
  max-height: calc(100% - 9rem);
  padding: 1.5rem 4rem 1.5rem 2rem;
  background: var(--mono-blue);
  color: var(--light);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: start;
  overflow-y: auto;
  transition: all 350ms;

  &.active {
    left: 0.5rem;
  }

  h3,
  h4,
  h5 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  button {
    &.exit {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      color: var(--light);
      transition: all 350ms;

      &:hover {
        color: var(--triad-red-2);
      }
    }

    &.pos-history {
      color: var(--light);
      border: 1px solid var(--light);
      border-radius: 10px;
      padding: 0.5rem;
      width: 100%;
      font-size: 18px;
      transition: all 350ms;

      &:hover {
        border-color: var(--mono-blue);
        background: var(--analog-blue);
      }
    }
  }

  div.head {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    & > *:first-child {
      margin-right: 1rem;
    }

    span {
      font-size: 48px;
    }

    div.details {
      width: 100%;

      & > *:last-child {
        margin-top: 0.5rem;
        background: ${props => props.color};
        color: var(--dark);
        padding: 0.25rem 0.5rem;
        border-radius: 5px;
      }
    }
  }

  div#tab-buttons {
    margin: 1.5rem 0;
    padding-bottom: 0rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--light);

    button {
      &:not(:last-child) {
        margin-right: 1.5rem;
      }

      color: var(--light);
      font-size: 16px;
      padding-bottom: 0.5rem;

      &:hover,
      &.selected {
        border-bottom: 3px solid var(--light);
      }
    }
  }

  div {
    &.data-section {
      p {
        display: flex;
        justify-content: space-between;

        &:not(:last-child) {
          margin-bottom: 1.5rem;
        }
      }
    }

    &.graph {
      display: flex;
      width: 100%;
      height: 30px;
      margin-bottom: 1rem;

      div {
        height: 100%;
      }
    }
  }
`;
