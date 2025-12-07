import Modal from "react-modal";
import { useEffect } from "react";

import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={300}
    >
      <div className={styles.modalContent}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || image.description || "Image"}
          className={styles.modalImage}
        />
        <div className={styles.modalInfo}>
          <p className={styles.authorName}>{image.user.name}</p>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>Likes:</span>
            <span className={styles.statValue}>{image.likes}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
