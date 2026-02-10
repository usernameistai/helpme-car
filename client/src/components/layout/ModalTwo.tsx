import type { FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalTwo: FC<ModalProps> = ({ isOpen, title = "Confirm", message, onConfirm, onCancel }) => {
  return (
    <>
    
    </>
  );
};

export default ModalTwo;