import React, {useState} from 'react';
import './Main.scss';
import PageTitle from '../PageTitle/PageTitle';
import ContactsPanel from '../Dashboard/ContactsPanel/ContactsPanel';

import ContactForm from '../Dashboard/Form/ContactForm';

function Main() {

  const [showView, setShowView] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState(true);

    const toggleShowView = () => {
      setShowView(!showView);
    };

    const addedData = (res) =>{
      setNewData(res)
      console.log(res.data.data)
    }


    const toggleEditView = () => {
        setIsEditing(!isEditing);
    };

    const toggleShowDetailsView = () => {
      console.log(showDetails)
      setShowDetails(!showDetails);
    }

  return (
    <main id='main' className='main'>
        <PageTitle page="Dashboard"/>
        { isEditing && <button onClick={toggleEditView}>Cancelar</button>}
        { !isEditing && !showDetails && <button onClick={toggleShowView}>{showView ? 'Añadir registro' : 'Cancelar'}</button>}
        { showDetails && <button onClick={toggleShowDetailsView}>Cancelar</button> }
        <ContactForm 
          showView={showView}
          functionAddedData={addedData}
          functionToggleView={toggleShowView}/>

        <ContactsPanel
          addedData={newData}
          showView={showView}
          functionToggleEditView={toggleEditView}
          isEditing={isEditing}
          functionToggleView={toggleShowView}
          toggleShowDetailsView={toggleShowDetailsView}
          showDetails={showDetails}/>
    </main>
  )
}

export default Main
