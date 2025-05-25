import './PersonalAccount.css';
import { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom';
//
import Header from './Header/Header';

export default function PersonalAccount() {
    const { id } = useParams();
    const userID = +id;

    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('http://localhost:3001/personal/' + userID, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))
    }, [])

    return (
        <> <div className='body' >
            <Header />
            <div className='PersonalAccount' >
                {!data ? "loading..." : (
                    (data.blocking) ? (<><p> Учетная запись заблокированна. Причину можете узнатать у администратора сервиса.</p></>) :
                        ((data.role === 1) ?
                            (<><p> <font size="4">{data.lastname} {data.firstname} {data.patronymic === 'NULL'? "": data.patronymic}</font></p>
                                 {data.faculty === 'NULL' ? "": <> <p> <b>{data.faculty}</b> </p></> }
                                        {data.department === 'NULL' ? "": <> <p> <b>Кафедра</b> {data.department}  </p></> }
                                <p> <b>Специальность:</b> {data.specialty} </p>
                                <p> <b>Научный руководитель:</b>  {data.scientificSupervisor} </p>
                                <p> <b>Год поступления:</b> {data.yearofadmission} </p></>) :
                            (data.role === 2) ?
                                (<><p> <font size="4">{data.lastname} {data.firstname} {data.patronymic === 'NULL'? "": data.patronymic}</font></p>
                                    {data.faculty === 'NULL' ? "": <> <p> <b>{data.faculty} </b> </p></> }
                                        {data.department === 'NULL' ? "": <> <p><b> Кафедра</b> {data.department}  </p></> }</>) :
                                (data.role === 3) ?
                                    (<><p> <font size="4">{data.lastname} {data.firstname} {data.patronymic === 'NULL'? "": data.patronymic}</font></p>
                                        {data.faculty === 'NULL' ? "": <> <p> <b>{data.faculty} </b> </p></> }
                                        {data.department === 'NULL' ? "": <> <p> <b>Кафедра</b> {data.department}  </p></> }</>) :
                                    (data.role === 4) ?
                                        (<><p> <b>{data.post}</b> </p>
                                        <p> {data.lastname} {data.firstname} {data.patronymic === 'NULL'? "": data.patronymic}</p></>) :
                                        (<><p> Что-то пошло не так </p></>))
                )}
            </div>
        </div>
        </>
    )
};