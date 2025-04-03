import { ButtonContainer } from "./styles";

interface ButtonProps {
  children: React.ReactNode; // Permite passar texto ou outros elementos como filhos
  onClick: () => void; // Define a função a ser chamada no clique
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <ButtonContainer type="button" onClick={onClick}>
      {children}
    </ButtonContainer>
  );
}