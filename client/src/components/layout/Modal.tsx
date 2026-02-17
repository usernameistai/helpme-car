import type { FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, title = "Confirm", message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl max-w-md md:w-full p-6 text-center transform transition-all animate-scale-up hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)] right-4 md:right-0">
          { title && <h2 className='font-space text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 mb-4 text-center'>{title}</h2> }
          <p className="font-space text-zinc-100 font-semibold text-center mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
                className='font-poppins bg-gray-500 hover:bg-gray-400 text-zinc-900 px-5 py-2 rounded shadow-lg transition-all transform hover:translate-y-[0.03rem] hover:shadow-[inset_0px_1px_15px_rgba(0,0,0,0.2)] '
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
                className='font-poppins bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow-lg transition-all transform hover:translate-y-[0.03rem] hover:shadow-[inset_0px_1px_15px_rgba(0,0,0,0.2)] '
            >
              Delete
            </button>
          </div>
          {/* Neon Glow outline  */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse"></div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;