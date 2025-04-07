import Content from '@/components/content';
import { Button } from '@/components/ui/button';
import paths from '@/routes/paths';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const click = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);
  return (
    <Content>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
        <p className="mb-6">
          A URL que você tentou acessar não existe ou foi movida.
        </p>
        <Button onClick={click} className="text-black">
          Voltar para a home
        </Button>
      </div>
    </Content>
  );
};
export default NotFound;
