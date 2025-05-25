import './InfoPage.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
//
import Header from './Header/Header';
import InfoRole1 from './InfoPages/InfoRole1'
import InfoRole2 from './InfoPages/InfoRole2'
import InfoRole3 from './InfoPages/InfoRole3'
import InfoRole4 from './InfoPages/InfoRole4'

export default function InfoPage() {
    const { role, id } = useParams();
    const userID = +id;

    return (
        <> <div className='body' >
            <Header />
            <div className='Subjects'>
                {((+role === 1) ? <InfoRole1 />
                : ((+role === 2) ? <InfoRole2 />
                : ((+role === 3) ? <InfoRole3 />
                : ((+role === 4) ? <InfoRole4 />
                : "Загрузка данных"
                ))))}
            </div>
        </div>
        </>
    )

};