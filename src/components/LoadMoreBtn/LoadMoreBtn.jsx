import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, isLoading }) => {
  return (
    <div className={styles.loadMoreContainer}>
      <button
        type="button"
        className={styles.loadMoreButton}
        onClick={onClick}
        disabled={isLoading}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
