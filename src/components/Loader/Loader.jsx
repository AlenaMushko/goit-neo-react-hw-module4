import { ClipLoader } from "react-spinners";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color="#10b981" size={60} />
    </div>
  );
};

export default Loader;
