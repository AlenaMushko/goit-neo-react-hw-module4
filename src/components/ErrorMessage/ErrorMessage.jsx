import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
}) => {
  return (
    <div className={styles.errorMessage}>
      <p className={styles.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
