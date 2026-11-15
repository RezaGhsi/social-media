import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, onClose, title }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handelEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handelEsc);

    return () => document.removeEventListener("keydown", handelEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed z-50 flex h-full w-full items-center justify-center bg-black/80 backdrop-blur-xs"
      id="modal-overlay"
      onClick={onClose}
    >
      <div
        id="modal-content"
        className="flex max-h-[90vh] max-w-300 m-4 flex-col rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-Poppins-Medium relative flex w-full shrink items-center justify-center rounded-t-xl bg-white p-4">
          {title && <h3 className="">{title}</h3>}
          <button
            className="absolute right-3 cursor-pointer text-xl text-neutral-700"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div className="scrollbar-thin flex flex-col overflow-y-auto scroll-smooth">
          {children}
        </div>
        <div className="w-full rounded-b-lg"></div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
