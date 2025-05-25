import './/../MainPage.css';
import  { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom';
import Header from '../Header/Header';

export default function SuccessfulRegistration() {
    const { id,type } = useParams();
    const [dataONE, setDataONE] = useState(null)
        const [dataFile, setDataFile] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3001/successfulRegistration/${+id}/one`)
            .then(response => response.json())
            .then(f => setDataONE(f))
    }, [])
        useEffect(() => {
        fetch(`http://localhost:3001/successfulRegistration/${+id}/file`)
            .then(response => response.json())
            .then(f => setDataFile(f))
    }, [])


    if (type === "one") {
        if (!dataONE) return (
            <>
                <div className='body' >
                    <Header />
                    <div className='CenterMain'>
                        <div className='message'> Загрузка данных...</div>

                    </div>
                </div>
            </>)

        else return (

            <>
                <div className='body' >
                    <Header />
                    <div className='CenterMain'>
                        <div className='message'> Пользователь {dataONE.lastname + " " + dataONE.firstname + " " +(dataONE.patronymic == null ? "": dataONE.patronymic) } зарегистрирован 
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Логин</th><th>Пароль</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{dataONE.username}</td><td>{dataONE.password}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </>)

    }
    else if(type === 'file'){ 
        if (!dataFile) return (
            <>
                <div className='body' >
                    <Header />
                    <div className='CenterMain'>
                        <div className='message'> Загрузка данных...</div>

                    </div>
                </div>
            </>)

        else return (

            <>
                <div className='body' >
                    <Header />
                    <div className='CenterMain'>
                        <div className='message'>Пользоваетели зарегистрированы
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Логин</th><th>Пароль</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {dataFile.map((user) =>(
                                        <><tr><td>{user.username}</td><td>{user.password}</td>
                                        </tr></>
                                    ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </>)
    }
    else return (
        <>
            <div className='body' >
                <Header />
                <div className='CenterMain'>
                    <div className='message'> Возникла непредвиденная ошибка. </div>

                </div>
            </div>
        </>)


};
