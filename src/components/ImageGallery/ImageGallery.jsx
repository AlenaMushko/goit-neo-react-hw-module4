import ImageCard from "./ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image) => (
        <ImageCard
          image={image}
          onClick={() => onImageClick(image)}
          key={image.id}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
