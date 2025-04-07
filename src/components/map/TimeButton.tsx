import { FC } from 'react';

interface TimeButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

const TimeButton: FC<TimeButtonProps> = ({ onClick, title, children }) => (
  <button 
    onClick={onClick}
    className="px-2 py-1 text-gray-600 hover:text-blue-800 font-medium transition-colors"
    title={title}
    aria-label={title}
  >
    {children}
  </button>
);

export default TimeButton;