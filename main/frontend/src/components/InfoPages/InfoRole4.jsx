import '../InfoPage.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function InfoRole4() {
    const { id } = useParams();
    const userID = +id;
    const [data, setData] = useState(null)
    const [showType, setShowType] = useState(false);
    const [scientificSupervisorsData, setScientificSupervisors] = useState(null)
    const [faculties, setFaculties] = useState(null)
    const [departments, setDepartments] = useState(null)
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        fetch('http://localhost:3001/assessmentsInfo/4/' + userID, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))

    }, [])
    useEffect(() => {
        fetch('http://localhost:3001/scientificSupervisors', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setScientificSupervisors(f))
    }, [])
    useEffect(() => {
        fetch('http://localhost:3001/faculties', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setFaculties(f))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/departments', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setDepartments(f))
    }, [])
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [departmentItems, setDepartmentItems] = useState([]);
    const [selectedDept, setSelectedDept] = useState("");
    const [scientificSupervisorsItems, setScientificSupervisorsItems] = useState([]);

    useEffect(() => {
        setScientificSupervisorsItems([]);
        selectedDept &&
            setScientificSupervisorsItems(scientificSupervisorsData.filter((c) => c.department == +selectedDept));
    }, [selectedDept]);

    useEffect(() => {
        setDepartmentItems([]);
        selectedFaculty &&
            setDepartmentItems(departments.filter((c) => c.faculty === +selectedFaculty));
    }, [selectedFaculty]);

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
                    name: item.name
                }
            } else {
                const name = item.lastname + " " + String(item.firstname).charAt(0).toUpperCase() + ". " + (item.patronymic == null ? "" : String(item.patronymic).charAt(0).toUpperCase() + ".");
                students[students.length] = {
                    name: name,
                    facultyID: item.faculty,
                    departmentID: item.department,
                    scientificSupervisorID: item.scientificSupervisorID,
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
             const sb = findStuff(subjects, 'courseID', item.courseID);
            if (sb === undefined || sb === null) {
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
            <table>
                <tbody>{!faculties ? (<><tr><td>Загрузка данных</td></tr></>) : (<>
                <tr><td className='td_label'><label className="text-field__label" htmlFor="facultyID">Факультет</label></td>
                    <td>
                        <select className="select" name="facultyID" id="facultyID"
                            onChange={e => {
                                setSelectedFaculty(e.target.value)
                                setShowType(null)
                                setSelected(null)
                                document.getElementById('filter').value = '1'
                            }}>
                            <option value="none">--Выберите факультет--</option>
                            {faculties.map(item => (<>
                                <option key={item.facultyID} value={item.facultyID}>{item.name}</option>
                            </>))}
                        </select>
                    </td>
                </tr></>)}
                {!departments ? (<><tr>
                    <td>Загрузка данных</td>
                </tr></>) : (<>
                    <tr>
                        <td className='td_label'><label className="text-field__label" htmlFor="departmentID">Кафедра</label></td>
                        <td><select className="select" name='departmentID' id='departmentID' onChange={e => {
                            setSelectedDept(e.target.value);
                             setSelected(null)
                            setShowType("1")
                            document.getElementById('filter').value = '1'
                        }}>
                            <option value="none">--Выберите кафедру--</option>
                            {departmentItems.map((c) => (<option key={c.departmentID} value={c.departmentID}>{c.name}</option>))}
                        </select>
                        </td>
                    </tr>
                </>)}
                <tr><td colSpan={2}>
                    <select className="select" name="block" id="filter"
                        onChange={e => {
                            setShowType(e.target.value);
                            if (e.target.value === "2") setSelected(students.filter((c) => c.departmentID == +selectedDept)[0].userID);
                            if (e.target.value === "3") setSelected(subjects.filter((c) => c.departmentID == +selectedDept)[0].courseID);
                            if (e.target.value === "4") setSelected('none');
                        }}>
                        <option value="1">Без фильтров</option>
                        <option value="2">Фильтр по аспиранту</option>
                        <option value="3">Фильтр по учебным курсам</option>
                        <option value="4">Фильтр по научным руководителям</option>
                    </select></td></tr>
            </tbody></table>
            <p></p>
            {showType ? (showType === "1" ? fullTable() : (showType === "2" ? studTable() : (showType === "3" ? subjTable() : (showType === "4" ? scienTable() : " ")))) : ""}
        </div>
        </>
    )
    function scienTable() {
        return (
            <>{!scientificSupervisorsItems ? (<>
                Загрузка данных
            </>) : (<>
                <select className="select" name='scientificSupervisorID' id='scientificSupervisorID' onChange={(e) => setSelected(e.target.value)}>
                    <option value="none">--Выберите руководителя--</option>
                    {scientificSupervisorsItems.map((c) => (<option key={c.userID} value={c.userID}>{c.lastname + " " + String(c.firstname).charAt(0).toUpperCase() + ". " + (c.patronymic == null ? "" : String(c.patronymic).charAt(0).toUpperCase() + ".")}</option>))}
                </select></>)}
                <table className='table'>
                    <thead>
                        <tr id='trhead'>
                            <th rowSpan="3">Учебная дисциплина</th>
                            <th colSpan={students.length}>Обучающийся</th>
                        </tr>
                        <tr id='trlist'>
                            {students.filter((c) => c.scientificSupervisorID == +selected).map(item => {
                                return (<><th>{item.name}</th></>)
                            })}
                        </tr>
                        <tr id='trlist'>
                            {students.filter((c) => c.scientificSupervisorID == +selected).map(item => {
                                return (<><th>{item.yearofadmission}</th></>)
                            })}
                        </tr>
                    </thead>
                    {selected !== 'none' ? <>
                        <tbody>
                            {subjects.map(item => {
                                const arr = students.filter((c) => c.scientificSupervisorID == +selected)
                                if (arr.length > 0) {
                                    let count = 0;
                                    arr.map(stud => {
                                         const a = findStuff(stud.subjs, 'name', item.name)
                                        if (!a) count++
                                    })
                                    if (count === arr.length) return (<></>)
                                    else {
                                        return (<><tr>
                                            <td>{item.name}</td>
                                            {arr.map(stud => {
                                                 const a = findStuff(stud.subjs, 'name', item.name)
                                                if (!a) {
                                                    return (<><td> - </td></>)
                                                }
                                                else return (<><td>{a.assessment=='0'? 'н': a.assessment}</td></>)
                                            })
                                            }</tr></>
                                        )
                                    }
                                }
                            })}
                        </tbody></> : ""}
                </table>
            </>
        )
    }
    function fullTable() {
        return (
            <><table className='table'>
                <thead>
                    <tr id='trhead'>
                        <th rowSpan="3">Учебная дисциплина</th>
                        <th colSpan={students.length}>Обучающийся</th>
                    </tr>
                    <tr id='trlist'>
                        {students.filter((c) => c.departmentID == +selectedDept).map(item => {
                            return <><th>{item.name}</th></>
                        })}
                    </tr>
                    <tr id='trlist'>
                        {students.filter((c) => c.departmentID == +selectedDept).map(item => {
                            return <><th>{item.yearofadmission}</th></>
                        })}
                    </tr>
                </thead>
                {selected !== 'none' ? <>
                    <tbody>
                        {subjects.map(item => {
                            const arr = students.filter((c) => c.departmentID == +selectedDept)
                            if (arr.length > 0) {
                                let count = 0;
                                arr.map(stud => {
                                     const a = findStuff(stud.subjs, 'name', item.name)
                                    if (!a) count++
                                })
                                if (count === arr.length) return (<></>)
                                else {
                                    return (<><tr>
                                        <td>{item.name}</td>
                                        {arr.map(stud => {
                                             const a = findStuff(stud.subjs, 'name', item.name)
                                            if (!a) {
                                                return (<><td> - </td></>)
                                            }
                                            else return (<><td>{a.assessment=='0'? 'н': a.assessment}</td></>)
                                        })
                                        }</tr></>
                                    )
                                }
                            }
                        })}
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
                    {students.filter((c) => c.departmentID == +selectedDept).map(item => (
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
        )} else return(<></>)
    }
    function subjTable() {
        if (subjects.length > 0) {
        return (
            <>
                <select className="select" name="block" id="block" onChange={(e) => { setSelected(e.target.value) }}>
                    <><option value='none'>--Выберите учебный курс--</option></>
                    {subjects.map(item => {
                        const arr = students.filter((c) => c.departmentID == +selectedDept)
                            if (arr.length > 0) {
                                let count = 0;
                                arr.map(stud => {
                                    const s = findStuff(subjects, "courseID", +selected)
                                const a = findStuff(stud.subjs, "name", s.name)
                                    if (!a) count++
                                })
                                if (count === arr.length) return (<></>)
                                else {
                        return(
                        <><option value={item.courseID}>{item.name}</option></>
                        )}}})}
                </select>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Обучающийся</th>
                            <th>Оценка</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    {!students ?
                        <tbody>
                            <tr><td>Загрузка данных</td></tr>
                        </tbody> :
                        <tbody>
                            {students.filter((c) => c.departmentID == +selectedDept).map(stud => {
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
        )} else return(<></>)
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