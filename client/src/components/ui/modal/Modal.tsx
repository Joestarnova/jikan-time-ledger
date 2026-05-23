import { useEffect, type ReactNode} from 'react';
import styles from "./modal.module.css"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children}: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <h1>{title}</h1>
            <div>{children}</div>
        </div>
    </div>
  )
};

