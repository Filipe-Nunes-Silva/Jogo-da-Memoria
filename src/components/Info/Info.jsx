import logoImage from '../../assets/devmemory_logo.png';
import restartIcon from '../../svgs/restart.svg';
import styles from './Info.module.css';
import { useEffect, useState } from 'react';
//Components
import InfoItem from '../InfoItem/InfoItem';
import Button from '../Button/Button';
//Data
import {items} from '../../data/items';
//Helpers
import {formatTimeElapsed} from '../../helpers/formatTimeElapsed';



const Info = ({getItems,getStates}) => {
  const [playing,setPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [movCount,setMovCount] = useState(0);
  const [showCount,setShowCount] = useState(0);
  const [gridItems,setGridItems] = useState([]);

  //Enviando itens para componente acima
  useEffect(()=>{
    submitItems();
  },[gridItems]);

  const submitItems = ()=>{
    getItems(gridItems);
  };

  //Aqui abaixo as funções que fazem o click funcionar
    
 
 
  //--------------------------------------
  useEffect(()=>{
    getStates({ 
      playing,
      setPlaying, 
      timeElapsed, 
      setTimeElapsed,
      movCount, 
      setMovCount,
      showCount ,
      setShowCount
    });
    const timer = setInterval(()=>{
      if(playing){
        setTimeElapsed(timeElapsed + 1);
      };
    },1000);
    return ()=> clearInterval(timer);
  },[playing,timeElapsed]);

  useEffect(()=>{
    resetAndCreateGrid()
  },[]);

  const resetAndCreateGrid = ()=>{
    //Passo1 - resetar
    setTimeElapsed(0);
    setMovCount(0);
    setShowCount(0);
    
    //Passo2 - começar jogo/criar o grid
    let tempGrid = [];
    for(let i = 0; i < (items.length * 2); i++){
      tempGrid.push({
        item:null,
        shown:false,
        permanentShow:false,
      });
    };

    for(let w = 0; w < 2; w++){
      for (let i = 0; i < items.length; i++) {

        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
         pos = Math.floor(Math.random() * (items.length * 2));
        };
        tempGrid[pos].item = i;
        
      };
    };  
    setGridItems(tempGrid);
    //Passo3 - começar jogo
    setPlaying(true);
  };


  return (
    <div className={styles.container_info}>
      <div>
        <a href={styles.logo_link}>
          <img width="200" src={logoImage} className={styles.icon}/>
        </a>
      </div>

      <div className={styles.info_area}>
        <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
        <InfoItem label='Movimentos' value='0'/>
      </div>
      
      <Button label='Reiniciar' icon={restartIcon} action={resetAndCreateGrid}/>
    </div>
  );
};

export default Info;