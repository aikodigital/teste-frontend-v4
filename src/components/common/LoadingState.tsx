import { FC } from 'react';

interface LoadingStateProps {
    message: string;
}

const LoadingState: FC<LoadingStateProps> = ({ message }) => (
    <div className="bg-white rounded-lg shadow-sm p-3" role="status" aria-live="polite">
        <div className="text-sm text-gray-500">{message}</div>
    </div>
);

export default LoadingState;