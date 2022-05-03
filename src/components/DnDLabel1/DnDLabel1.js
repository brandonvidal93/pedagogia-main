import React, {Component} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoxDrop from './BoxDrop';
import DragItem from './DragItem';
// import ModalInfo from './ModalInfo2';

import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './DnDLabel1.scss';

library.add(fas, fab, far);

class DnDLabel1 extends Component {
  state = {
    actualItem: 0,
    countDrop1: 0,
    countDrop2: 0,
    countDrop3: 0,
    countDrop4: 0,
    
  }

  trackScrolling = (e) => {
    e.preventDefault();
    const CONTENTBOX = document.getElementById('dropContent');
    if (e.currentTarget.id === 'btnNavLeft') {
      CONTENTBOX.scrollLeft = CONTENTBOX.scrollLeft - 300;
    }
    if (e.currentTarget.id === 'btnNavRight') {
      CONTENTBOX.scrollLeft = CONTENTBOX.scrollLeft + 300;
    }
  }

  hideModal = (e) => {
    document.getElementById('infoFinal').classList.remove('dNone');
    document.querySelector('.bgItemGlobe').classList.add('dNone'); // OCULTAR EL FONDO

    document.querySelector('.footer').classList.remove('dNone'); // OCULTAR EL FONDO
    document.querySelector('.menuContent').classList.remove('dNone'); // OCULTAR EL FONDO
    document.querySelector('.instructionMouse').classList.remove('dNone'); // OCULTAR EL FONDO
  }

  countDrop = (dropType, limit) => {
    const { multimedia } = this.props;

    switch (dropType) {
      case 'dropType-1':
        this.setState({
          countDrop1: this.state.countDrop1 + 1,
        });
        if (this.state.countDrop1 === limit) {
          document.getElementById('check-0').classList.remove('dNone');
        }
        break;
      case 'dropType-2':
        this.setState({
          countDrop2: this.state.countDrop2 + 1,
        });
        if (this.state.countDrop2 === limit) {
          document.getElementById('check-1').classList.remove('dNone');
        }
        break;
      case 'dropType-3':
        this.setState({
          countDrop3: this.state.countDrop3 + 1,
        });
        if (this.state.countDrop3 === limit) {
          document.getElementById('check-2').classList.remove('dNone');
        }
        break;
      case 'dropType-4':
        this.setState({
          countDrop4: this.state.countDrop4 + 1,
        });
        if (this.state.countDrop4 === limit) {
          document.getElementById('check-3').classList.remove('dNone');
        }
        break;
      default:
        break;
    }
    if (this.state.actualItem === multimedia.dragItems.length - 1) {
      this.props.isEnded(true); // SI LLEGA EL FINAL DE LA ACT ENVÍA EL TRUE
    } else {
      this.setState({
        actualItem: this.state.actualItem + 1
      });
    }
  }

  render() {
    const { multimedia } = this.props;

    return (
      <div className = 'DnDLabel1 d-Flex j-S aI-E' style = {{ }}>
        <audio
          className = 'audio'
          autoPlay = { '' }
          id = 'audioNotification'
          src = { '' }
          ref = { (audio) => { this.audio = audio } } />
        <DndProvider backend={HTML5Backend}>    
          <div className = 'dropContent d-Flex j-S aI-E mR-1' id = 'dropContent'>
            {
              multimedia.dropZone.drops.map( (item, i) => {
                return(
                  <div className = 'dropInfo d-Flex d-C j-E aI-C mL-05 mR-05'  key = { i }>
                    <img
                      alt = 'Check'
                      className = 'mB-1 dNone'
                      id = { 'check-' + i }
                      src = { item.text } />
                    <BoxDrop
                      id = { item.target }
                      img = { item.img }
                      order = { i }
                      type = { item.type }
                      limit={item.limit} />
                  </div>
                )
              })
            }
          </div>

          <div className = 'dragContent d-Flex d-R j-C aI-C wW c-4'>
            {
              multimedia.dragItems.map( item => {
                return(
                  <div key = { item.drag } className = {'d-Flex j-S aI-C mL-05 mR-1'}>
                    <p className = 'textDrag tCenter' dangerouslySetInnerHTML = { {__html: item.text} }/>
                    <DragItem
                      countDrop = { this.countDrop }
                      id = { item.drag }
                      name = { item.data }
                      path = { item.img }
                      type = { item.type } />
                  </div>
                )
              })
            }
          </div>
        </DndProvider>
      </div>
    );
  }
}

export default DnDLabel1;
