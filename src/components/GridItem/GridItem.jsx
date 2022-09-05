import styles from './GridItem.module.css';
import b7 from '../../svgs/b7.svg';
import { items } from '../../data/items';


const GridItem = ({item,onClick}) => {
  return (
    <div 
        className={item.permanentShow || item.shown ? styles.container1 : styles.container2} 
        onClick={onClick} 
    >
        {
        item.permanentShow === false && item.shown === false &&
            <img src={b7} alt="Carta pra baixo" className={styles.opacity} />
        }
        {
            (item.permanentShow || item.shown) && item.item !== null &&
            <img src={items[item.item].icon} alt="Carta virada" />
        }
    </div>
  );
};

export default GridItem;