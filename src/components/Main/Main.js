import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import './Main.scss';
import PageTitle from '../PageTitle/PageTitle';
import ContactsPanel from '../Dashboard/ContactsPanel/ContactsPanel';

import ContactForm from '../Dashboard/Form/ContactForm';
import { Box } from '@mui/material';

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
    }


    const toggleEditView = () => {
        setIsEditing(!isEditing);
    };

    const toggleShowDetailsView = () => {
      setShowDetails(!showDetails);
    }

  return (
    <main id='main' className='main'>
        <PageTitle page="Dashboard"/>
        <Box display="flex" justifyContent="flex-end">
          { isEditing && <Button variant="danger" onClick={toggleEditView}>Cancelar</Button>}
          { !isEditing && !showDetails && <Button variant={showView ? 'primary' : 'danger'} primary onClick={toggleShowView}>{showView ? 'Añadir registro' : 'Cancelar'}</Button>}
          { showDetails && <Button variant="danger" onClick={toggleShowDetailsView}>Cancelar</Button> }
        </Box>
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
