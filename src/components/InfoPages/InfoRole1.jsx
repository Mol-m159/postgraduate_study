import '../InfoPage.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function InfoRole1() {
    const { id } = useParams();
    const userID = +id;
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/assessmentsInfo/1/' + userID, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))
    }, [])
    return (
        <><div className='SubDataEstim'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Учебная дисциплина</th>
                        <th>Оценка</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                {!data ?
                    <tbody>
                        <tr><td>"Загрузка данных"</td></tr>
                    </tbody> :
                    <tbody>{data.map(item => (
                        <><tr>
                            <td>{item.name}</td>
                            <td>{assessmentToStr(item.assessment)}</td>
                            <td>{dateToStr(item.date.substring(0, 10))}</td>
                        </tr></>
                    ))}</tbody>
                }
            </table>
        </div>
        </>
    )
    function assessmentToStr(a) {
        switch (+a) {
            case 1, 2:
                return "Не аттестован"
            case 3:
                return "Удовлетворительно"
            case 4:
                return "Хорошо"
            case 5:
                return "Отлично"
            default:
                return a;
        }
    }
    function dateToStr(str) {
        const y = str.substring(0, 4);
        const m = str.substring(5, 7);
        const d = str.substring(8, 10);
        return d + "." + m + "." + y
    }

}