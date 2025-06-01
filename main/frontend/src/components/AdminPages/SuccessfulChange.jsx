import './/../MainPage.css';
import { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom';
import Header from '../Header/Header';

export default function SuccessfulChange() {
    const { id,type } = useParams();
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3001/changepassword/${+id}`)
            .then(response => response.json())
            .then(f => setData(f))
    }, [])
if(type === 'p'){
        if (!data) return (
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
                        <div className='message'> Данные успешно изменены 
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Логин</th><th>Пароль</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {data.map((user) =>(
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


};
