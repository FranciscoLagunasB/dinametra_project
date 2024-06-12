import React, { useState, useEffect} from 'react'
import './Dashboard.scss'
import PageTitle from '../PageTitle/PageTitle'

function Dashboard() {
    
  return (
    <section className='dashboard section'>
        <PageTitle page={"Dashboard"}/>
        <div className='row'>
            <div className='col-lg-8'></div>
            <div className='col-lg-4'></div>
        </div>
    </section>
  )
}

export default Dashboard
