import React, {useState} from 'react';
import './Main.scss';
import PageTitle from '../PageTitle/PageTitle';
import ContactsPanel from '../Dashboard/ContactsPanel/ContactsPanel';

import ContactForm from '../Dashboard/Form/ContactForm';

function Main({page}) {

  const [showView, setShowView] = useState(true);

    const toggleShowView = () => {
        setShowView(!showView);
    };


  return (
    <main id='main' className='main'>
        <PageTitle page="Dashboard"/>
        <button onClick={toggleShowView}>{showView ? 'Cancelar' : 'Añadir Registro'}</button>
          
        <ContactForm showView={showView}/>
        <ContactsPanel 
          showView={showView}/>
    </main>
  )
}

export default Main
