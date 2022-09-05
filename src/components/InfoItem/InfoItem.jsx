import styles from './InfoItem.module.css';

const InfoItem = ({label,value}) => {
  return (
    <div className={styles.container_info_item}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
    </div>
  );
};

export default InfoItem;