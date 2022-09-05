//Css
import './App.css';
//React
import { useEffect, useState } from 'react';
//Images & Logo
import logoImage from './assets/devmemory_logo.png';
import restartIcon from './svgs/restart.svg';
//Components
import InfoItem from './components/InfoItem/InfoItem';
import Button from './components/Button/Button';
import GridItem from './components/GridItem/GridItem';
//Data
import {items} from './data/items';
//Helpers
import {formatTimeElapsed} from './helpers/formatTimeElapsed';


function App() {
  const [playing,setPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [movCount,setMovCount] = useState(0);
  const [showCount,setShowCount] = useState(0);
  const [gridItems,setGridItems] = useState([]);

  useEffect(()=>{
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

  useEffect(()=>{
    if(showCount === 2){
      let opened = gridItems.filter((item)=>{
        return item.shown === true;
      });

      if(opened.length === 2){
        //v1 - se iguais torna-los permanetes
        
        if(opened[0].item === opened[1].item){
          let tempGrid1 = [...gridItems];
          for(let i in tempGrid1){
            if(tempGrid1[i].shown){
              tempGrid1[i].permanentShow = true;
              tempGrid1[i].shown = false;
            };
          };
          setGridItems(tempGrid1);
          setShowCount(0);
        }
        else{
          //v2 - se não iguais, fecheos
          setTimeout(()=>{
            let tempGrid1 = [...gridItems];
            for(let i in tempGrid1){
              tempGrid1[i].shown = false;
            };
            setGridItems(tempGrid1);
            setShowCount(0);
          },1000);
        };
        setMovCount(movCount + 1);
      };
    };
  },[showCount,gridItems]);

  //Verifica se o game acabou
  useEffect(()=>{
    if(movCount > 0 && gridItems.every(item=> item.permanentShow === true)){
      setPlaying(false);
    };
  },[movCount,gridItems]);

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

  const handleItemClick = (index)=>{
    if(playing && index !== null && showCount < 2){
      let tempGrid = [...gridItems];

      if(tempGrid[index].permanentShow === false && tempGrid[index].shown === false){
        tempGrid[index].shown = true;
        setShowCount( showCount +1);
      };
      setGridItems(tempGrid);
    };
  };

  return (
    <div className='container'>
      <div className='container_info'>
        <div>
          <a href='logo_link'>
            <img width="200" src={logoImage} className='icon'/>
          </a>
        </div>

        <div className='info_area'>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label='Movimentos' value={movCount}/>
        </div>
      
        <Button label='Reiniciar' icon={restartIcon} action={resetAndCreateGrid}/>
      </div>

      <div className='container_grid'>
        <div className='grid'>
          {gridItems.map((items,index)=>(
            <GridItem 
              item={items} 
              onClick={()=>handleItemClick(index)}
              key={index} 
            />
          ))}
        </div>

    </div>
    </div>
  );
};

export default App;
