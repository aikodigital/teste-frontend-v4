import styled from "styled-components";

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const Marker = styled.div`
  &.selected {
    .pin {
      -webkit-animation: selected 0.8s infinite alternate linear;
      -moz-animation: selected 0.8s infinite alternate linear;
      animation: selected 0.8s infinite alternate linear;
    }
  }

  .dot {
    border-radius: 50%;
    background: ${props => props.color};
    width: ${props => props.size}px;
    height: ${props => props.size}px;
  }

  .pin {
    pointer-events: none;
    background: ${props => props.color};
    height: ${props => props.size}px;
    aspect-ratio: 2/3;
    mask: conic-gradient(
          from -30deg at bottom,
          #0000,
          #000 1deg 59deg,
          #0000 60deg
        )
        bottom/100% 50% no-repeat,
      radial-gradient(circle at 50% calc(100% / 3), #000 22% 44%, #0000 44.5%);
  }

  .beacon {
    pointer-events: none;
    position: absolute;
    bottom: 0%;
    left: 50%;
    height: 15px;
    width: 15px;
    -webkit-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: -1;
  }

  .beacon:before,
  .beacon:after {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 0;
    top: 0;
    background-color: transparent;
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--tetra-purple);
    -webkit-animation: spread 4s infinite linear;
    -moz-animation: spread 4s infinite linear;
    animation: spread 4s infinite linear;
  }

  .beacon:after {
    -moz-animation-delay: 2s;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
  }

  span {
    pointer-events: none;
    color: var(--dark);
    font-size: ${props => props.size * 0.4}px;
    padding-top: 0.5rem;
  }

  @-webkit-keyframes spread {
    0% {
      transform: scale(0.1);
      transform: box-shadow(0px 0px 0px 1px var(--tetra-purple));
      opacity: 1;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @keyframes spread {
    0% {
      transform: scale(0.1);
      transform: box-shadow(0px 0px 0px 1px var(--tetra-purple));
      opacity: 1;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @-webkit-keyframes selected {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2) translateY(-20%);
    }
  }

  @keyframes selected {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2) translateY(-20%);
    }
  }
`;
