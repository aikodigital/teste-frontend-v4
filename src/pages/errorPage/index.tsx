import { Button } from '@mui/material';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;
  const isRouteError = isRouteErrorResponse(error);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Ops!</h1>
      <p>An error has ocurred =(</p>
      {isRouteError ? (
        <p>
          {error.statusText || `Unknown error`} {error.status}
        </p>
      ) : (
        <p>{error.message || `An unexpected error has ocurred.`}</p>
      )}
      <Button onClick={() => navigate('/')}>Go back to inital page</Button>
    </div>
  );
}

export default ErrorPage;
