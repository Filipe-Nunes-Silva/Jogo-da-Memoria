import styles from './Button.module.css';

const Button = ({label,icon,action})=>{
    return(
        <button className={styles.container_button} onClick={action}>
            { icon && 
                <span className={styles.iconArea}>
                    <img src={icon}/>
                </span>
            }
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default  Button;