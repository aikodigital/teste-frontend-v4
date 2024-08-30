import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 0.4rem;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const LogoWrapper = styled.img`
  width: 80px;
  height: auto;

  @media (max-width: 768px) {
    margin-bottom: 2px;
  }
`
export const TitleWrapper = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`
export const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  @media (max-width: 768px) {
    width: 100%; /* O input ocupa toda a largura disponível */
    margin-top: 8px;
  }
`
