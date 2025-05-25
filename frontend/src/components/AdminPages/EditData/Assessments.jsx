import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { educationalcoursesOption, graduateStudentsOption } from '../data.ts';

export default function Assessments() {
    const [showType, setShowType] = useState(false);
    const [educationalcourses, setEducationalcourses] = useState(false);
    const [graduateStudents, setGraduateStudents] = useState(null)
    const [assessments, setAssessments] = useState(null)
    const [graduateStudentsItems, setGraduateStudentsItems] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedGraduateStudents, setSelectedGraduateStudents] = useState(null)
    const { id } = useParams();
    const userID = +id;
    useEffect(() => {
        fetch('http://localhost:3001/educationalcourses', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(f => setEducationalcourses(f))
    }, [])

    if (educationalcourses) {
        educationalcourses.map((c) => {
            const keysU = Object.keys(c);
            if (educationalcoursesOption.find(x => x.value === c[keysU[0]]) === undefined) {
                educationalcoursesOption.push({
                    value: c[keysU[0]],
                    label: c[keysU[1]]
                })
            }
        })
    }
    useEffect(() => {
        fetch('http://localhost:3001/assessments', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(f => setAssessments(f))
    }, [])
    useEffect(() => {
        fetch('http://localhost:3001/graduateStudents', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setGraduateStudents(f))
    }, [])

    if (graduateStudents) {
        graduateStudents.map((c) => {
            if (graduateStudentsOption.find(x => x.value === c.userID) === undefined) {
                graduateStudentsOption.push({
                    value: c.userID,
                    label: c.lastname + " " + c.firstname + (c.patronymic == null ? "" : " " + c.patronymic),
                    blocking: c.blocking
                })
            }
        }
        )
    }
    useEffect(() => {
        setGraduateStudentsItems([]);
        setSelectedGraduateStudents([]);
        let gS = []
        assessments && assessments.filter((c) => c.courseID === +selectedCourse).map((a, i) => {
            gS[i] = graduateStudentsOption.find(x => x.value === a.userID)
        });
        selectedCourse && setGraduateStudentsItems(gS)
        if (showType === 1) {
            document.getElementById('date').value = ''
            document.getElementById('assessment').value = ''
        }
    }, [selectedCourse]);

    const handleChange = (s) => {
        setSelectedGraduateStudents(s);
    };
    const handleChangeEDIT = (s) => {
        setSelectedGraduateStudents(s);
        let data = assessments.find(x => x.courseID === +selectedCourse && x.userID === s.value)
        document.getElementById('date').value = data.date.slice(0, 10);
        document.getElementById('assessment').value = data.assessment
    };
    return (
        <>
            <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDF2' onClick={() => setShowType(1)} >
                        Редактировать  оценку
                    </button >
                    <button className='adminActItemSec' id='EDF3' onClick={() => setShowType(2)} >
                        Удалить оценку
                    </button >
                </div>
                {showType ? (
                    (showType === 1) ? ChangeAssessment() : ((showType === 2) ? DeleteAssessment() : " ")) : ""}
            </div>
        </>
    )

    function DeleteAssessment() {
        return (<> <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/deleteassessment`)}>
            <table className='RegistrationFormTAble'>
                <tbody>
                    {!educationalcourses ? (<><tr>
                        <td>Загрузка данных</td>
                    </tr></>) : (<>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="courseID">Учебный курс</label></td>
                            <td><Select name="courseID" options={educationalcoursesOption} className="basic-multi-select"
                                classNamePrefix="select" onChange={(v) => setSelectedCourse(v.value)} placeholder='Выбрать...' required />
                            </td>
                        </tr></>)}
                    {!assessments ? (<><tr>
                        <td>Загрузка данных</td>
                    </tr></>) : (<>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="users">Оценки</label></td>
                            <td><Select isMulti name="users" id='users' value={selectedGraduateStudents} onChange={handleChange} options={graduateStudentsItems} className="basic-multi-select"
                                classNamePrefix="select" placeholder='Выбрать...' required />
                            </td>
                        </tr></>)}

                    <tr>
                        <td></td><td>
                            <button className='adminActItem' id='NextButton' type="submit">Далее</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        </>)
    }
    function ChangeAssessment() {
        return (<> <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/editassessment`)}>
            <table className='RegistrationFormTAble'>
                <tbody>
                    {!educationalcourses ? (<><tr>
                        <td>Загрузка данных</td>
                    </tr></>) : (<>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="courseID">Учебный курс</label></td>
                            <td colSpan={3}><Select name="courseID" options={educationalcoursesOption} className="basic-multi-select"
                                classNamePrefix="select" onChange={(v) => setSelectedCourse(v.value)} placeholder='Выбрать...' required />
                            </td>
                        </tr></>)}
                    {!assessments ? (<><tr>
                        <td>Загрузка данных</td>
                    </tr></>) : (<>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="users">Оценка</label></td>
                            <td ><Select name="user" id='users' value={selectedGraduateStudents} onChange={handleChangeEDIT} options={graduateStudentsItems} className="basic-multi-select"
                                classNamePrefix="select" placeholder='Выбрать...' required />
                            </td>
                            <td>
                                <input className='text-field__input' type="date" id="date" name="date" placeholder='Дата'></input>
                            </td>
                            <td>
                                <select className="select" name="assessment" id="assessment">
                                    <option value="2">Не аттестован</option>
                                    <option value="3">Удовлетворительно</option>
                                    <option value="4">Хорошо</option>
                                    <option value="5">Отлично</option>
                                </select>
                            </td>
                        </tr>
                    </>)}
                    <tr>
                        <td colSpan={3}></td><td>
                            <button className='adminActItem' id='NextButton' type="submit">Далее</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        </>)
    }

}