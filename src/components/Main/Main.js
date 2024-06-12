import React from 'react';
import './Main.scss';
import PageTitle from '../PageTitle/PageTitle';
import WheaterPanel from '../Dashboard/WheaterPanel/WheaterPanel';

function Main({page}) {
  return (
    <main id='main' className='main'>
        <PageTitle page="Dashboard"/>
        <WheaterPanel/>
    </main>
  )
}

export default Main
