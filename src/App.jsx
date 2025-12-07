import { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";

import {
  SearchBar,
  ImageGallery,
  Loader,
  ErrorMessage,
  LoadMoreBtn,
  ImageModal,
} from "./components";
import { fetchImages } from "./services/api";
import styles from "./App.module.css";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const previousPageRef = useRef(1);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setLoading(true);
    previousPageRef.current = 1;

    try {
      const data = await fetchImages(searchQuery, 1);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message || "Failed to fetch images");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!query || loading || page >= totalPages) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message || "Failed to load more images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > previousPageRef.current && previousPageRef.current >= 1) {
      setTimeout(() => {
        const scrollAmount = window.innerHeight * 0.4;
        window.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      }, 100);
    }
    previousPageRef.current = page;
  }, [page]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {loading && <Loader />}

      {!error && images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {loading && <Loader />}
          {page < totalPages && !loading && images.length > 0 && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {!error && images.length === 0 && !loading && query && (
        <div className={styles.noResults}>
          <BiSearchAlt className={styles.noResultsIcon} />
          <p>
            No images found for <strong>"{query}"</strong>
          </p>
        </div>
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
