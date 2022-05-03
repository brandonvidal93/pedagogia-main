import React, { Component } from 'react';
import DnDCircle3 from '../../components/DnDCircle3/DnDCircle3';
import DnDLabel1 from '../../components/DnDLabel1/DnDLabel1';
import DnDIcon1 from '../../components/DnDIcon1/DnDIcon1';
import DnDSwipe1 from '../../components/DnDSwipe1/DnDSwipe1';
import DraggableWords from '../../components/DraggableWords/DraggableWords';
import Instruction from '../../components/Instruction';
import InteractiveTimeLine from '../../components/InteractiveTimeLine';
import InteractiveFlip1 from '../../components/InteractiveFlip1';
import InteractivePath1 from '../../components/InteractivePath1';
import InteractivePath2 from '../../components/InteractivePath2';
import InteractivePath4 from '../../components/InteractivePath4';
import InteractivePath5 from '../../components/InteractivePath5';
import InteractiveSubtitle from '../../components/InteractiveSubtitle';
import InteractiveSubtitle2 from '../../components/InteractiveSubtitle2';
import ModalInfo5 from '../../components/ModalInfo5';
import ModalCircle1 from '../../components/ModalCircle1';
import ModalCircle2 from '../../components/ModalCircle2';
import ModalCircle3 from '../../components/ModalCircle3';
import ModalVideo1 from '../../components/ModalVideo1';
import ModalGallery2 from '../../components/ModalGallery2';
import Quiz1 from '../../components/Quiz1';
import SlideDot1 from '../../components/SlideDot1';
import SlideLR1 from '../../components/SlideLR1';
import SlideLR2 from '../../components/SlideLR2';
import SlideUpDown from '../../components/SlideUpDown';

import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './Pages.scss';
import Pyramid1 from '../../components/Pyramid1';

class Cover extends Component {
  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL CURSO
  startCourse = (e) => {
    const target = e.currentTarget.id;

    this.props.startCourse(target);
  }

  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: 'url(' + dataPage.background.bg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };

    const styleBtn = {
      backgroundImage: 'url(' + dataPage.background.bgBtn + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100px',
      height: '44px',
      
    };

    return (
      <div className={ (dataPage.type) + ' pL-4 animated fadeIn' } style = { style }>
        <div className="c-7 dF-C-cs">
          {
            dataPage.logoCourse && <img
              alt = 'Imagen Corporativa'
              className = 'imageLogo mR-3 mT-4 mB-2'
              src = { dataPage.logoCourse }/>
          }
          {
            dataPage.title && <h1 className = 'mT-2 mB-1 F3' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h1>
          }
          {
            dataPage.subTitle && <h3 className = 'mB-1 pB-05' dangerouslySetInnerHTML = {{ __html: dataPage.subTitle }}></h3>
          }
          {
            dataPage.module && <h3 className = 'mB-1 mR-4' dangerouslySetInnerHTML = {{ __html: dataPage.module }}></h3>
          } 
          {
            dataPage.courseName && <p className = 'mB-2 mR-2 texto2 fw-4' dangerouslySetInnerHTML = {{ __html: dataPage.courseName }}></p>
          }

          <button
            className = 'buttonQuiz pL-3 pR-5'
            onClick = { this.startCourse }
            id = { 'btnIniciar' }
            style = { styleBtn }
            >
              Iniciar
          </button>
        </div>

      </div>
    );
  }
}

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
      showModal: true
    }
  }

  componentDidMount() {
    document.querySelector('.footer').classList.add('dNone'); // OCULTAR EL FONDO
  }

  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL CURSO
  startCourse = e => {
    e.preventDefault();
    this.props.startCourse(e.target.id);
  }

  // MOSTRAR ITEM
  showItem = e => {
    e.preventDefault();

    let numId = parseInt(e.target.id.substring(12, 13));

    this.setState({
      item: numId
    });
  }

  // OCULTAR MODAL
  hideModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });

    document.querySelector('.footer').classList.remove('dNone');
  }

  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: 'url(' + dataPage.resources.bg + ')',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: 430
    }

    return (
      <div className = { 'pageContent'}>
        {
          this.state.showModal ?
          <div className = 'modalInstruction'>
            <div className = 'bgCircle dF-R-cc showModal'>
              <div className = 'boxInfo d-C d-Flex j-C aI-C pT-2 pB-2 pL-2 pR-2'>
                <hr className = 'mB-1 line-5'></hr>
                <p className = 'tCenter blanco mB-1'>
                  Antes de iniciar, te invitamos a hacer el recorrido de navegación dando clic en el siguiente botón.
                </p>
                <button
                  className = 'buttonClose blanco'
                  onClick = { this.hideModal } >
                  Instructivo
                </button>
              </div>
            </div>
          </div> :
          null
        }

        <div className = 'c-10 animated fadeIn'>
          <div className = 'c-5 mB-2'>
            <h1 className = 'mT-4 mL-5 titulo2' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h1>
          </div>

          <div className = 'c-10 d-Flex d-C j-E aI-C' style = {{ ...style, 'paddingTop': 40, 'paddingLeft': 0, 'paddingRight': 0, 'paddingBottom': 40 }} >
            <div className = 'boxContent d-Flex d-C j-C aI-C pT-1'>
              {
                (this.state.item !== dataPage.information.length - 1) ?
                dataPage.information.map((item, i) => {
                  return(
                    <div
                      className = { 'd-Flex d-C j-C aI-C animated fadeIn ' + (this.state.item === i ? '' : 'dNone') }
                      key = { i }>
                      {
                        item.img1 ? <img
                          alt = 'Imagen'
                          className = 'mB-1'
                          src = { item.img1 }/> : null
                      }
                      {
                        item.text1 ? <p className = 'tCenter c-7 mB-025' dangerouslySetInnerHTML = {{ __html: item.text1 }}></p> : null
                      }
                      {
                        item.img2 ? <img
                          alt = 'Imagen'
                          className = 'mB-025'
                          src = { item.img2 }/> : null
                      }
                    </div>
                  )
                }) :
                <div className = { 'c-10 d-Flex j-C aI-C' }>
                  <button
                    className = 'buttonStart'
                    id = 'btnInstruction'
                    onClick = { this.startCourse }>
                    Continuar
                  </button>
                </div>
              }
            </div>
            <div className = 'buttonBoxInst d-Flex j-C aI-C'>
              {
                dataPage.information.map((button, i) => {
                  return(
                    <div
                      className = { 'btnItemInst ' + (this.state.item === i ? 'btnActive': '') }
                      id = { 'btnItemInst-' + i }
                      key = { i }
                      onClick = { this.showItem } >
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        
        <Instruction dataPage = { dataPage.instruction } />
      </div>
    );
  }
}

class Page2 extends Component {
 
 // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(2, end);
  }
render() {
    const { dataPage } = this.props;

    return (
      <div className = { 'pageContent'}>
        <div className = 'c-10 animated fadeIn d-Flex d-C j-C pT-4 mL-40'>
          
          <div className = 'headerTitle mL-7 mT-025 mR-2 mB-2 pT-1 pB-1'> 
            {
              dataPage.title ? <h2 className = 'mB-2 fw-7 F2' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h2> : null
            }
            {
              dataPage.text ? <p className = 'mB-5 fw-7' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p> : null
            }
          </div>
          
          <InteractivePath4 dataPage = { dataPage } isEnded = { this.isEnded } />

        <Instruction dataPage = { dataPage.instruction } />
      </div>
      </div>
    );
  }
}
  
  class Page3 extends Component {

   isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(3, end);
  }
render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: 'url(' + dataPage.background.bg + ')',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '380px'
    };

    return (
      <div className = { 'pageContent'}>
        <div className = 'c-10 animated fadeIn'>
          <div className = 'c-10 animated fadeIn d-Flex aI-C j-S pT-3 mL-1'>
            <div className = 'mL-5 c-35 mT-4'> 
              {
                dataPage.title ? <h2 className = 'mB-1 F2' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h2> : null
              }
              {
                dataPage.text ? <p className = 'mB-1 fw-4' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p> : null
              }
            </div>
            <div className = 'c-5 d-Flex j-C aI-S mT-2' style = {style}>
              <ModalCircle1 dataPage = { dataPage } isEnded = { this.isEnded } />
            </div>
          </div>
        </div>

        <Instruction dataPage = { dataPage.instruction } />
      </div>
    );
  }
}
  
class Page4 extends Component {
  state = {
    openModal: false,
    warningAnimation: true
  }

  // FUNCION PARA ABRIR MODAL
  showModal = () => {
    this.setState({
      openModal: !this.state.openModal,
      warningAnimation: !this.state.warningAnimation
    });
  }
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(4, end);
  }
  render() {
    const { dataPage } = this.props;
  return(
      <div className = { 'pageContent'}>
        { /* MUESTRA LA MODAL DE ACUERDO AL ESTADO openModal */ }
        { this.state.openModal !== false ? <ModalInfo5 dataPage = { dataPage } showModal={ this.showModal } isEnded = { this.isEnded } /> : null }

        <div className = 'c-10 animated fadeIn d-Flex aI-C j-S pT-7 mT-1'>
          <div className = 'mL-2 pB-3 c-30 mT-1'>
          </div>

          <div className = 'd-Flex j-S aI-S pB-1 pT-2'>
            <div className = 'c-35 mL-1'>
              <h3 className = 'mB-05' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h3>
              <p className = 'mB-2' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p>
              <img alt = 'Imagen' className = 'imageCenter' src = { dataPage.img }/>
            </div>

            <div className = 'c-7 d-Flex j-C aI-S'>
              
                <button className = 'buttonVideo' onClick = { this.showModal }>
                  <img
                    alt = 'Imagen Corporativa'
                    className = 'c-85'
                    src = { dataPage.boxInfo.imgBg }/>
                </button>
            </div>
          </div>

          <Instruction dataPage = { dataPage.instruction } />
        </div>
      </div>
    )
  }
}

class Page5 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(5, end);
  }

  render() {
    const { dataPage } = this.props;

    return (
      <div className = { 'pageContent'}>
        <div className = 'headerTitle d-Flex d-Rr j-E aI-C mB-1 mL-4'>

        <div className = 'c-10 animated fadeIn'>
          <div className = 'mL-5 c-7 mR-1 mB-2'> 
            {
              dataPage.title ? <h2 className = 'mB-1 pT-1 mT-2 mR-2' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h2> : null
            }
            {
              dataPage.text ? <p className = 'mB-1 fw-4 pT-1' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p> : null
            }
          </div>
            <Pyramid1 dataPage = { dataPage } isEnded = { this.isEnded } />
          </div>
        </div>

        <Instruction dataPage = { dataPage.instruction } />

            {
              dataPage.nota ? <p className = ' dF-R-sc j-C mL-7 mR-7 pR-7 mB-7 pL-7 pT-1 mT-1 fw-3' dangerouslySetInnerHTML = {{ __html: dataPage.nota }}></p> : null
            }
      </div>
    );
  }
}

class Page6 extends Component {
   // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(6, end);
  }

  render() {
    const { dataPage } = this.props;

    return (
      <div className = { 'pageContent'}>
        <div className = 'headerTitle d-Flex d-Rr j-E aI-C mB-1 mL-4 mT-2'>
          <h2
            className = 'textHeader F2'
            dangerouslySetInnerHTML = {{ __html: dataPage.headerPage.textHeader }}
            style = {{ 'borderColor': dataPage.headerPage.color }}></h2>
 
        </div>

        <div className = 'c-10 animated fadeIn'>
          <div className = 'mL-7 c-35 mT-025 mR-2 mB-2'> 
            {
              dataPage.title ? <h2 className = 'mB-05' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h2> : null
            }
            {
              dataPage.text ? <p className = 'mB-2 fw-4 mT-4' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p> : null
            }
          </div>

          <div className = 'mL-7'>
            <DnDIcon1 multimedia = { dataPage.multimedia } isEnded = { this.isEnded } />
          </div>
        </div>

        <Instruction dataPage = { dataPage.instruction } />
      </div>
    );
  }
}
class Page7 extends Component {
  render() {
    const { dataPage } = this.props;
  
    return (
      <div className = { 'pageContent'}>
        <div className = 'c-10 d-Flex d-C j-C aI-S animated fadeIn'>
          <div className = 'mL-6 c-6 mT-6 mR-3'> 
            {
              dataPage.title ? <h2 className = 'textHeader F2 mB-1' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h2> : null
            }
            {
              dataPage.text ? <p className = 'mB-2 fw-3' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p> : null
            }
          </div>

          <div className = 'c-3 d-Flex j-C aI-S c-10'>
            <img
                alt = 'Imagen'
                className = ''
                src = { dataPage.img }/>
          </div>
        </div>
      </div>
    );
  }
}
class Page8 extends Component {
   // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL QUIZ
  startQuiz = e => {
    e.preventDefault();
    this.props.startQuiz(e.target.id);
  }

  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: 'url(' + dataPage.bg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };

    return(
      <div className = { 'pageContent'} style = { style }>

         <div className = 'headerTitle d-Flex d-Rr j-E aI-C mT-7'></div>
            
          <img alt = 'Imagen' className = 'imageNPC-3 pAbs' src = { dataPage.img }/>

          <div className = 'c-5 mL-1 mT-2 mB-2'>
            {
              dataPage.title ? <h3 className = 'mL-3 mB-05 pT-0 F2 pL-2 aI-S mT-1' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h3> : null
            }

            {
            dataPage.text ? <p className = 'mL-3 mB-2 pL-2 fw-4' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p>: null
            
            }

            {
            dataPage.text1 ? <p className = 'd-Flex mL-3 mB-2 pL-2 j-C  F2 fw-7 color-17' dangerouslySetInnerHTML = {{ __html: dataPage.text1 }}></p> : null
            }

            <button
              className = 'buttonQuiz pT-1 pB-1 pL-2 fw-3 pR-2 mL-6 mB-3 aI-C '
              id = 'btnQuiz'
              onClick = { this.startQuiz }>
              { dataPage.button }
            </button>
        </div>

        <Instruction dataPage = { dataPage.instruction } />
      </div>
    );
  }
}


class Page9 extends Component {
 // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(9, end);
  }

  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL QUIZ
  endQuiz = (buttonPress) => {
    this.props.endQuiz(buttonPress);
  }
   render() {
    const {dataPage} = this.props;
    
    return(
      <div className = { 'pageContent'}>
        <div className = 'c-10 animated fadeIn'>
          <div className = 'mL-3 c-6 mT-4 mR-3'> 
          {
            dataPage.title ? <h3
            className = 'F2 mB-1 mL-3' dangerouslySetInnerHTML = {{ __html: dataPage.title }}></h3>: null
          }   
          {
             dataPage.text ? <p className = 'mL-3 mB-1 mT-3 fw-4' dangerouslySetInnerHTML = {{ __html: dataPage.text }}></p> : null
          }
          </div>

          <div className = 'mL-5 mT-2'>
           <Quiz1 multimedia = { dataPage.multimedia } isEnded = { this.isEnded } endQuiz = { this.endQuiz } setScore = { this.props.setScore }/>
        </div> 
      </div>
    </div>
    );
  }
}
class Page10 extends Component {
  closeCourse = () => {
    // ESTO SOLO SE EJECUTA CUANDO SE INICIA EL SERVIDOR O CUANDO SE ABRE COMO EMERGENTE
    window.parent.parent.close();
  }

  render() {

    const { dataPage, calificacion } = this.props;

    const style = {
      backgroundImage: 'url(' + dataPage.background.bg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return(
      <div className={ (dataPage.type) + ' animated fadeIn' } style = { style }>
        <div className="c-8 d-Flex d-C j-C aI-C">
          {
            dataPage.message.success.title ? <h1 className = 'mB-1 F2 titulo2 tCenter fw-7' dangerouslySetInnerHTML = {{ __html: calificacion >= 70 ? dataPage.message.success.title : dataPage.message.error.title }}></h1> : null
          }
          
          {
            dataPage.message.success.module ? <h3 className = 'mB-1 tCenter' dangerouslySetInnerHTML = {{ __html: calificacion >= 70 ? dataPage.message.success.module : dataPage.message.error.module }}></h3> : null
          }
          {
            dataPage.message.success.courseName ? <p className = 'c-8 mB-2 tCenter' dangerouslySetInnerHTML = {{ __html: calificacion >= 70 ? dataPage.message.success.courseName : dataPage.message.error.courseName }}></p> : null
          }
          {
            dataPage.message.success.subTitle ? <h2 className = 'mB-2 F2 tCenter titulo2' dangerouslySetInnerHTML = {{ __html: calificacion >= 70 ? dataPage.message.success.subTitle : dataPage.message.error.subTitle }}></h2> : null
          }
          {
            dataPage.logoCourse && <img
              alt = 'Imagen Corporativa'
              className = 'mB-2'
              src = { dataPage.logoCourse }/>
          }
          {
            dataPage.buttonEnd ? 
              <h2 
                className = 'blanco tCenter fw-3 buttonEnd' 
                dangerouslySetInnerHTML = {{ __html: dataPage.buttonEnd }}
                onClick = { this.closeCourse }
                style = {{ 'cursor': 'pointer' }} /> : 
              null
          }

          { /* Restricción de avance <div className = { 'restrict-3 ' + (endActivities === true ? 'dNone' : '') } /> */ }
        </div>

      </div>
    );
  }
}

export {
  Cover, Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9, Page10
};
