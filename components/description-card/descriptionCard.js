import styles from "./descriptionCard.module.css";
import Image from "next/image";

const DescriptionCard = ({ icon, w, h, title, value }) => {
  return (
    <div className={styles["desc-card"]}>
      <Image src={icon} width={w} height={h} alt={title} />
      <div className={styles["desc-text"]}>
        <p className={styles["desc-title"]}>{title}</p>
        <p className={styles["desc-value"]}>{value}</p>
      </div>
    </div>
  );
};

export default DescriptionCard;
