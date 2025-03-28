import { ReactNode } from "react";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-1 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <Button onClick={onClose} label="Fechar" className="absolute top-2 right-2 p-2" />
        {children}
      </div>
    </div>
  );
};

export default Modal;
