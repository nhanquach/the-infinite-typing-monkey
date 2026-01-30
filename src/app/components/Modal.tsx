import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-black border-4 border-black dark:border-[#C4E4C5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#C4E4C5] p-6 transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-6 border-b-4 border-black dark:border-[#C4E4C5] pb-4 sticky top-0 bg-white dark:bg-black z-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-black dark:text-[#C4E4C5] uppercase truncate mr-4">
            {title || "Modal"}
          </h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-2 border-black dark:border-[#C4E4C5] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#C4E4C5] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex-shrink-0"
          >
            CLOSE X
          </button>
        </div>

        <div className="text-black dark:text-[#C4E4C5]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
