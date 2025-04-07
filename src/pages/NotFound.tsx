import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <p>
        Eita, parece que alguma coisa deu errado.{" "}
        <Link to="/">Clique aqui</Link> para voltar para a página principal e
        tente novamente.
      </p>
    </div>
  );
};

export default HomePage;
