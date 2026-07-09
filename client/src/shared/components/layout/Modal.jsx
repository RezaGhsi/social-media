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
      className="fixed w-full h-full bg-black/80 backdrop-blur-xs flex justify-center items-center z-50"
      id="modal-overlay"
      onClick={onClose}
    >
      <div id="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex justify-center font-Poppins-Medium items-center rounded-t-xl bg-white pt-5 *:mx-3">
          {title && <h3 className="">{title}</h3>}
          <button
            className="absolute right-0 cursor-pointer text-xl text-neutral-700 "
            onClick={onClose}
          >
            🗙
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
