import '../InfoPage.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function InfoRole2() {
    const { id } = useParams();
    const userID = +id;
    const [data, setData] = useState(null)
    const [showType, setShowType] = useState(false);
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        fetch('http://localhost:3001/assessmentsInfo/2/' + userID, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))

    }, [])
    useEffect(() => {
        setShowType("1")
    }, [])

    let students = []
    let subjects = []
    if (data) {
        data.map((item) => {
            const u = findStuff(students, 'userID', item.userID);
            if (u || u !== null) {
                const id = getIdStud(students, item.userID);
                students[id].subjs[students[id].subjs.length] = {
                    courseID: item.courseID,
                    assessment: item.assessment,
                    date: item.date,
                    name: item.name,
                }
            } else {
                const name = item.lastname + " " + String(item.firstname).charAt(0).toUpperCase() + ". " + (item.patronymic == null ? "" : String(item.patronymic).charAt(0).toUpperCase() + ".");
                students[students.length] = {
                    name: name,
                    userID: item.userID,
                    yearofadmission: item.yearofadmission,
                    subjs: [{
                        name: item.name,
                        courseID: item.courseID,
                        assessment: item.assessment,
                        date: item.date,
                    }
                    ]
                }
            }
            const s = findStuff(subjects, 'courseID', item.courseID);
            if (s === undefined || s === null) {
                const s2 = findStuff(subjects, 'name', item.name);
                if (s2 === undefined || s2 === null) {
                    subjects[subjects.length] = {
                        courseID: item.courseID,
                        name: item.name
                    }
                }
            }
        })
    }
    function getIdStud(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].userID === id) return i;
        }
        return -1;
    }

    return (
        <><div className='SubDataEstim'>
            <select className="select" name="block" id="block"
                onChange={e => {
                    setShowType(e.target.value);
                    if (e.target.value === "2") setSelected(students[0].userID);
                    if (e.target.value === "3") setSelected(subjects[0].courseID);
                }}>
                <option value="1">Без фильтров</option>
                <option value="2">Фильтр по аспиранту</option>
                <option value="3">Фильтр по учебным курсам</option>
            </select>
            <p></p>
            {showType ? (showType === "1" ? fullTable() : (showType === "2" ? studTable() : (showType === "3" ? subjTable() : " "))) : ""}
        </div>
        </>
    )
    function fullTable() {
        return (
            <><table className='table'>
                <thead>
                    <tr id='trhead'>
                        <th rowSpan="3">Учебная дисциплина</th>
                        <th colSpan={students.length}>Обучающийся</th>
                    </tr>
                    <tr id='trlist'>
                        {students.map(item => (
                            <><th>{item.name}</th></>
                        ))}
                    </tr>
                    <tr id='trlist'>
                        {students.map(item => (
                            <><th>{item.yearofadmission}</th></>
                        ))}
                    </tr>
                </thead>
                {data ? <>
                    <tbody>
                        {subjects.map(item => (<>
                            <tr>
                                <td>{item.name}</td>
                                {students.map(stud => {
                                    const a = findStuff(stud.subjs, 'name', item.name)
                                    if (!a) return (<><td> - </td></>)
                                    else return (<><td>{a.assessment == '0' ? 'н' : a.assessment}</td></>)
                                })}
                            </tr></>))}
                    </tbody></> : ""}
            </table>
            </>
        )
    }
    function studTable() {
        if (students.length > 0) {
            return (
                <>
                    <select className="select" name="block" id="block" onChange={(e) => { setSelected(e.target.value) }}>
                        {students.map(item => (
                            <><option value={item.userID}>{item.name}</option></>
                        ))}
                    </select>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Учебная дисциплина</th>
                                <th>Оценка</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        {!selected ?
                            <tbody>
                                <tr><td>Загрузка данных</td></tr>
                            </tbody> :
                            <tbody>
                                {students[getIdStud(students, +selected)].subjs.map(item => (
                                    <><tr>
                                        <td>{item.name}</td>
                                        <td>{assessmentToStr(item.assessment)}</td>
                                        <td>{dateToStr(item.date.substring(0, 10))}</td>
                                    </tr></>))
                                }</tbody>
                        }
                    </table>
                </>
            )
        } else return (<></>)
    }
    function subjTable() {
        if (subjects.length > 0) {
            return (
                <>
                    <select className="select" name="block" id="block" onChange={(e) => { setSelected(e.target.value) }}>
                        {subjects.map(item => (
                            <><option value={item.courseID}>{item.name}</option></>
                        ))}
                    </select>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Обучающийся</th>
                                <th>Оценка</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        {!selected ?
                            <tbody>
                                <tr><td>Загрузка данных</td></tr>
                            </tbody> :
                            <tbody>
                                {students.map(stud => {
                                    const s = findStuff(subjects, "courseID", +selected)
                                    const a = findStuff(stud.subjs, "name", s.name)
                                    if (a) return (<><tr><td>{stud.name}</td>
                                        <td>{assessmentToStr(a.assessment)}</td>
                                        <td>{dateToStr(a.date.substring(0, 10))}</td></tr></>)
                                })}
                            </tbody>
                        }
                    </table>
                </>
            )
        } else return (<></>)
    }

    function assessmentToStr(a) {
        switch (+a) {
            case 0:
                return "Неявка"
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
    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i][propertyToFind] === valueToFind)
                return jsonobject[i];
        }
        return null;
    }
}
