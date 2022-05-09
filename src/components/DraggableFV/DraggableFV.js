import React, {Component} from "react";
import {DndProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import DropWord from "./DropFV";
import DragWord from "./DragFV";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './DraggableFV.scss';

library.add(fas, fab, far);

class DraggableFV extends Component {
  state = {
    page: 1,
    questState: false
  };
  
  questState = () => {
    this.setState({
      questState: !this.state.questState,
    })
  }

  mSlides = (e) => {
    const { multimedia, accumulatedPoints, nextQuestion, endQuiz } = this.props;

    document.getElementById("contentWords").classList.remove("disabledSolid"); 
    document.getElementById("boxCheck").classList.add("dNone");
    document.getElementById("boxError").classList.add("dNone");

    if(this.state.page > multimedia.dropZone.paragraph.length - 1) {
      document.getElementById("contentWords").classList.add("disabledSolid"); 
      endQuiz();
    } else {
      this.setState({
        page: this.state.page + 1,
      });

      if(this.state.questState) {
        accumulatedPoints();

        this.questState();
      }

      nextQuestion(this.state.page);
    }
  };
  
  render() {
    const { multimedia } = this.props;

    return (
      <div className="draggableFV d-Flex j-S aI-S">
        <audio
          className="audio"
          autoPlay={""}
          id="audioNotification"
          src={""}
          ref={(audio) => {
            this.audio = audio;
          }} />

          <DndProvider backend = { HTML5Backend }>
          <div className = "contentSlide d-Flex j-C aI-C mT-1" id = "contentSlide">

            {
              multimedia.dropZone.paragraph.map( (item, i) => {
                return(
                  <div key = { item.key } id = { "boxDrop-" + item.key } className = {"slideBox d-Flex d-C j-C aI-C  animated fadeIn " + (item.key !== this.state.page ? "dNone" : "")}>
                    {
                      item.drops.map( (boxDrop, i) => {
                        return(
                          <DropWord
                            key = { boxDrop.key }
                            id = { boxDrop.key }
                            size = { boxDrop.size }
                            posY = { boxDrop.posY }
                            posX = { boxDrop.posX }
                            color = { boxDrop.color }
                            type = { boxDrop.type } 
                            total = { multimedia.dropZone.paragraph.length }
                            />  
                        )
                      })
                    }
                    {
                      item.lines.map( (line, i) => {
                        return(
                          <p key = { line.key } className = "line-drop tCenter fw-4" >{ line.text }</p>
                        )
                      })
                    }
                  </div>
                )
              })
            }

            <div className = "boxCheck pAbs dNone d-Flex j-C aI-C" id = "boxCheck">
              <h1>{ multimedia.dropZone.textCheck }</h1>
            </div>

            <div className = "boxError pAbs dNone d-Flex j-C aI-C" id = "boxError">
              <h1>{ multimedia.dropZone.textError }</h1>
            </div>

            <button className = { "buttonSlide mL-05 disabled "} id = "btnSig" onClick = { this.mSlides }>
              <span className = "fa-layers fa-fw iconButton"  >
                <FontAwesomeIcon icon="circle" />
                <FontAwesomeIcon icon="chevron-right" inverse transform="shrink-6" />
              </span>
            </button>
          </div>

          <div className = {"contentWords d-Flex d-C j-C aI-S pL-2 mT-3 " + (this.state.page >= multimedia.dropZone.paragraph.length ? 'disabledSolid' : '')} id = "contentWords" >
            {
              multimedia.dragItem.map( (item, i) => {
                return(
                  <div className = "d-Flex j-S aI-C mB-1" key = { i }>
                    <DragWord
                      key = { item.id }
                      id = { item.id }
                      name = { item.text }
                      type = { item.text }
                      color = { item.color }
                      img = { item.img }
                      questState = { this.questState }/>
                    <h2 className = "mL-1 fw-7">{item.text}</h2>
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

export default DraggableFV;
