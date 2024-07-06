import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={css.modal}
      overlay
      ClassName={css.overlay}
    >
      <button type="button" className={css.modalCloseButton} onClick={onClose}>
        &times;
      </button>
      {image && (
        <div className={css.modalContent}>
          <img src={image.urls.regular} alt={image.alt_description} />
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
