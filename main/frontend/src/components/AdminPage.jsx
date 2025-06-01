import './AdminPage.css';
import { useState } from 'react'
//
import Header from './Header/Header';
import RegistrationPage from './AdminPages/RegistrationPage';
import EditDataPage from './AdminPages/EditDataPage';
import Blocking from './AdminPages/Blocking';
import Newcourse from './AdminPages/Newcourse';
import UploadData from './AdminPages/UploadData';


export default function AdminPage() {

    const [show, setShow] = useState(false);
    function changeShow(i) {
        setShow(i)
    };


    return (
        <> <div className='body' >
            <Header />
            <div className='adminAct'>
                <button className='adminActItem' id='AAI1'
                    onClick={() => changeShow(1)} >
                    Регистрация нового пользователя
                </button >
                <button className='adminActItem' id='AAI2' onClick={() => changeShow(2)} >
                    Блокировка пользователей
                </button >
                <button className='adminActItem' id='AAI3' onClick={() => changeShow(3)} >
                    Учебные  курсы и оценки
                </button >
                <button className='adminActItem' id='AAI4' onClick={() => changeShow(4)} >
                    Загрузка данных из файла
                </button >
                <button className='adminActItem' id='AAI5' onClick={() => changeShow(5)} >
                    Изменение и удаление данных
                </button >
            </div>
            {(show === 1 ? <RegistrationPage /> :
                ((show === 2) ? <Blocking /> :
                    ((show === 3) ? <Newcourse /> :
                        ((show === 4) ? <UploadData/> :
                            ((show === 5) ? <EditDataPage /> :
                                " "
                            )))))}
        </div>
        </>
    )
};