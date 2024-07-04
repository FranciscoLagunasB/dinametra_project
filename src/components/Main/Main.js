import React from 'react';
import './Main.scss';
import PageTitle from '../PageTitle/PageTitle';
import ContactsPanel from '../Dashboard/ContactsPanel/ContactsPanel';

function Main({page}) {
  return (
    <main id='main' className='main'>
        <PageTitle page="Dashboard"/>
        <ContactsPanel/>
    </main>
  )
}

export default Main
