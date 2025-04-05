import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/mapa');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="animated-bg px-3 text-center position-relative">

      <img src="/img/aiko.png" alt="Logo Aiko" className="imgLogo2" />

      <div className="z-1 position-relative">
        <img src="/img/aiko.png" alt="Logo Aiko" className="imgLogo" />
        <h1 className="mb-3">🌲 Bem-vindo ao Teste Técnico</h1>
        <p className="mb-4 fs-5">Carregando o monitoramento de equipamentos...</p>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    </div>

  );
}

export default Welcome;
