import React, { Component } from 'react';
import Footer from './Footer';

import './Content.scss'

// IMPORTAR LOS COMPONENTES DE CADA PÁGINA
import {
  Cover, Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9, Page10,
} from './pages/Pages';

class Content extends Component {
  showContent = () => {
    const { actualIndex, clickNavigation, data, checkEnabledUnit, endActivities, checkEndActivity, checkEndUnit, setScore, calificacion } = this.props;
    switch (actualIndex) {
      // COVER -------------------------------------------------------------------------------
      case 0: return ( <Cover dataPage = { data.coverPage } startCourse = { clickNavigation } /> );

      // INS ---------------------------------------------------------------------------------
      case 1: return( <Page1 dataPage = { data.page1 } startCourse = { clickNavigation } /> );

      case 2: return( <Page2 dataPage = { data.page2 } endActivities = { endActivities[2] } checkEndActivity = { checkEndActivity } /> );

       case 3: return( <Page3 dataPage = { data.page3 } endActivities = { endActivities[3] } checkEndActivity = { checkEndActivity }/> );

      case 4: return( <Page4 dataPage = { data.page4 } endActivities = { endActivities[4] } checkEndActivity = { checkEndActivity } /> );

      case 5: return( <Page5 dataPage = { data.page5 } endActivities = { endActivities[5] } checkEndActivity = { checkEndActivity } /> );

      case 6: return( <Page6 dataPage = { data.page6 } endActivities = { endActivities[6] } checkEndActivity = { checkEndActivity } /> );

      case 7: return( <Page7 dataPage = { data.page7 }/>);

      case 8: return( <Page8 dataPage = { data.page8 } startQuiz = { clickNavigation } /> );

      case 9: return( <Page9 dataPage = { data.page9 } endActivities = { endActivities[9] } checkEndActivity = { checkEndActivity } setScore = { setScore } endQuiz = { clickNavigation} />);

      // END --------------------------------------------------------------------------------
      case 10: return( <Page10 dataPage = { data.page10 } calificacion = { calificacion } /> );

      default:
        break;
    }
  }

  render() {
    const { actualIndex, bgFooter, clickNavigation, data, endActivities, imageFooter, labelFooter, limitNavigation } = this.props;

    return (
      <div className='content'>
        { /* LLAMADO DE LA FUNCION QUE RETORNA EL CONTENT */ }
        { this.showContent() }

          {/* CARGA DEL COMPOMENTE FOOTER */}
        <Footer
          actualIndex = { actualIndex }
          bgFooter = { bgFooter }
          clickNavigation = { clickNavigation }
          data = { data }
          endActivities = { endActivities }
          getPos = { this.getPos }
          imageFooter = { imageFooter }
          labelFooter = { labelFooter }
          limitNavigation = { limitNavigation } />
      </div>
    );
  }
}

export default Content;
