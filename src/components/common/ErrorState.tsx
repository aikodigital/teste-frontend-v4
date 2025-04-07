import { FC } from 'react';

interface ErrorStateProps {
    message: string;
}

const ErrorState: FC<ErrorStateProps> = ({ message }) => (
    <div className="bg-white rounded-lg shadow-sm p-3" role="alert">
        <div className="text-sm text-red-500">{message}</div>
    </div>
);

export default ErrorState;