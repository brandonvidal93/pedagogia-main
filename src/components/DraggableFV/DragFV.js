import React from 'react';
import { useDrag } from 'react-dnd';

const style = {
  cursor: 'move'
}

const DragWord = ({ count1, count2, name, type, id, countWords, color, img, questState }) => {
  
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {

        document.getElementById('boxDrop-' + dropResult.id).classList.add('WordDropped');
        document.getElementById('boxCheck').classList.remove('dNone');

        document.getElementById('btnSig').classList.remove('disabled');

        document.getElementById('audioNotification').src = 'audio/check.mp3';
        document.getElementById('audioNotification').play();

        questState();
      } else {
        document.getElementById('audioNotification').src = 'audio/error.mp3';
        document.getElementById('audioNotification').play();

        document.getElementById('boxError').classList.remove('dNone')
        document.getElementById('btnSig').classList.remove('disabled');
      }
      
      document.getElementById("contentWords").classList.add("disabledSolid"); 

    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <div className = 'dragWord' ref = { drag } style = {{ ...style, opacity }} id = {'dragWord-' + id } >
      <img alt = 'Imagen' className = '' src = { img }/>
    </div>
  )
}

export default DragWord;
