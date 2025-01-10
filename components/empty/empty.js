import Image from "next/image";
import emptyLogo from "../../assets/icon_nothing.png";
import styles from "./empty.module.css";

const Empty = ({ name }) => {
  return (
    <div className={styles.empty}>
      <div className={styles["empty-content"]}>
        <Image src={emptyLogo} alt="empty-logo" priority />
        <p>No {name}</p>
      </div>
    </div>
  );
};

export default Empty;
