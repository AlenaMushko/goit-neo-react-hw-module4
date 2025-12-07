import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={styles.imageCard} onClick={onClick}>
      <img
        src={image.urls.small}
        alt={image.alt_description || image.description || "Image"}
        className={styles.cardImage}
      />
    </li>
  );
};

export default ImageCard;
