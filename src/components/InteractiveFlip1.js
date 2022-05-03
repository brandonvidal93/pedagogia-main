import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './InteractiveFlip1.scss';

// CREATING LIBRARY ICONS
library.add(fas, fab, far);

class InteractiveFlip extends Component {
  state = {
    count: 1,
    countPair: 1
  }

  flip = e => {
    const { dataPage } = this.props;

    let idBtn = parseInt(e.currentTarget.id);

    this.setState({ count: this.state.count + 1 });

    e.currentTarget.classList.add('show');
    document.getElementById('hide-' + idBtn).classList.remove('animated', 'flipInY');
    document.getElementById('hide-' + idBtn).classList.add('animated', 'flipOutY');

    // Validación para que bloquee el tablero despues de seleccionar 2 tarjetas
    if (this.state.count === 2) {
      document.querySelector('.interactiveFlip').style.pointerEvents = 'none';

      const itemsSelected = document.getElementsByClassName('show');
      const allItems = document.getElementsByClassName('itemFlip');

      if (itemsSelected[0].getAttribute('pair') === itemsSelected[1].getAttribute('pair')) {
        for (let i = 0; i < itemsSelected.length; i++) {
          itemsSelected[i].classList.add('parejaLista');
        }

        for (let i = 0; i < allItems.length; i++) {
          allItems[i].classList.remove('show');
        }

        this.setState({
          countPair: this.state.countPair + 1
        })

        if (this.state.countPair === dataPage.items.length / 2) {
          this.props.isEnded(true);
        }

        setTimeout(() => {
          document.querySelector('.interactiveFlip').style.pointerEvents = 'all';
        }, 1000);
      } else {
        setTimeout(() => {
          let idErrors=[];
          for (let i = 0; i < itemsSelected.length; i++) {
            idErrors = [...idErrors, itemsSelected[i].getAttribute('id')];
            // console.log(idErrors);
          }

          for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove('show');
          }
          this.flipHide(idErrors);
          document.querySelector('.interactiveFlip').style.pointerEvents = 'all';
        }, 3000);
      }

      this.setState({
        count: 1
      })
    }

    this.flipShow(idBtn);
  }

  flipShow = (item) => {
    setTimeout(function(){
      document.getElementById('info-' + item).classList.remove('animated', 'flipOutY');
      document.getElementById('info-' + item).classList.remove('dNone');
      document.getElementById('info-' + item).classList.add('animated', 'flipInY');
    }, 800);
  }

  flipHide = (_idErros) => {
    setTimeout(function(){
      for (let i = 0; i < _idErros.length; i++) {
        document.getElementById('info-' + _idErros[i]).classList.remove('flipInY');
        document.getElementById('info-' + _idErros[i]).classList.add('animated', 'flipOutY');
        document.getElementById('info-' + _idErros[i]).classList.add('dNone');
        document.getElementById('hide-' + _idErros[i]).classList.remove('flipOutY');
        document.getElementById('hide-' + _idErros[i]).classList.add('animated', 'flipInY');
      }
    }, 800);
  }


  render() {
    const { dataPage } = this.props;

    return (
      <div className = 'interactiveFlip c-10 d-Flex j-Bt'>
        {
          dataPage.items.map((item, i) => {
            return(
              <div key = { item.id } className = { 'itemFlip'} id = { item.id } onClick = { this.flip } pair={'pair-' + item.pair}>
                <div className = { 'buttonFlip d-Flex d-C j-C aI-C'} id = { 'hide-' + item.id } >
                  <img alt = 'Item' className = '' src = { dataPage.imgHide }/>
                </div>

                <div className = { 'infoFlip d-Flex d-C aI-C dNone'} id = { 'info-' + item.id }>
                  <img alt = 'Item' className = '' src = { item.img }/>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default InteractiveFlip;
