import React, { Component } from 'react';
import DnDLabel2 from './DnDLabel2/DnDLabel2';
import DraggableWords from './DraggableWords/DraggableWords';
import DraggableFV from './DraggableFV/DraggableFV';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './Quiz1.scss';

 

// CREATING LIBRARY ICONS
library.add(fas, fab, far);

class Quiz1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      accumulatedPoints: 0,
      totalPoints: props.multimedia.questions[0].labelDnD.dropZone.paragraph.length,
      raw: 0,
      showModal: false,
      isNext: false,
    }
  }

  statusQuiz = () => {
    console.log(
      `
      Question          : ${this.state.question}
      Accumulated Points: ${this.state.accumulatedPoints}
      Total Points      : ${(this.state.totalPoints - 1)}
      `
      );
  }

  accumulatedPoints = () => {
    this.setState({
      accumulatedPoints: this.state.accumulatedPoints + 1,
    });
  }

  nextQuestion = (page) => {
    this.setState({
      // isNext: !this.state.isNext,
      question: page,
    });
  }
  
  showModal = (modal) => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  isEnded = () => {
    this.props.isEnded(true);
  }

  //FUNCION PARA CERRAR LA MODAL
  hideModal = event => {
    event.preventDefault();

    document.querySelector('.footer').classList.remove('dNone');

    this.showModal();

    this.props.endQuiz(document.getElementById('buttonCloseQuizModal').id); // VA EN EL BOTON DE FINALIZACIÓN

    this.isEnded();
  }

  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y PASAR A LA PAGINA FINAL
  endQuiz = () => {

    console.log('Final del quiz');
    console.log('Puntos acumulados: ' + this.state.accumulatedPoints);

    // // Suma de la pregunta multiple
    let totalFinal = (this.state.accumulatedPoints * 100) / (this.state.totalPoints - 1);

    console.log('Puntaje total: ' + totalFinal);
    this.props.setScore(totalFinal);

    this.setState({
      raw: totalFinal
    })
    console.log('Final no va más');

    this.setState({
      showModal: !this.state.showModal
    })
    document.querySelector('.footer').classList.add('dNone');
  }

  render() {
    const {multimedia} = this.props;

    this.statusQuiz();

    return (
      <div className = 'Quiz1 c-10 '>
        <audio
          className = 'audio'
          autoPlay = { '' }
          id = 'audioNotification'
          src = { '' }
          ref = { (audio) => { this.audio = audio } } />
        {
          this.state.showModal !== false &&
          <div className = 'modalQuiz animated fadeIn'>
            <div className = 'showModal'>
              <div className = 'c-10 d-Flex d-C j-C aI-C'>
                <img alt = 'Imagen' className = 'mB-2' src = { this.state.raw >= 70 ? multimedia.modal.check.img : multimedia.modal.error.img }/>
                <h2 className = 'mB-1 tCenter' dangerouslySetInnerHTML = {{ __html: this.state.raw >= 70 ? multimedia.modal.check.title : multimedia.modal.error.title }}></h2>
                <h3 className = 'mB-1 tCenter'>Tu calificación fue de: { Math.round(this.state.raw) }%</h3>
                <p className = 'tCenter mB-2' dangerouslySetInnerHTML = {{ __html: this.state.raw >= 70 ? multimedia.modal.check.text : multimedia.modal.error.text }}></p>

                <button
                  className = 'buttonQuiz pT-05 pB-05 pL-2 pR-1'
                  onClick = { this.hideModal }
                  id = { 'buttonCloseQuizModal' }
                  >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        }

        <div className = { 'question d-Flex d-C j-E aI-S' } id = { 'question-' + this.state.question }>
          {/* <p className = 'mB-1' dangerouslySetInnerHTML = {{ __html: multimedia.questions[this.state.question].instruction }}></p>
           
          <p className = { 'labelStatement mB-1'} dangerouslySetInnerHTML = {{ __html: multimedia.questions[this.state.question].statement }}></p> */}
          
          <DraggableFV multimedia = { multimedia.questions[0].labelDnD } totalPoints = {this.state.totalPoints} accumulatedPoints = { this.accumulatedPoints } nextQuestion = {this.nextQuestion} endQuiz = {this.endQuiz} question = { this.state.question } />
          
        </div>
      </div>
    );
  }
}

export default Quiz1;