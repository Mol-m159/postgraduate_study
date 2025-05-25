import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { scientificSupervisorsOption, educationalcoursesOption } from '../data.ts';

export default function EducationalCourse() {
    const [scientificSupervisors, setData] = useState(null)
    const [showType, setShowType] = useState(false);
    const [educationalcourses, setEducationalcourses] = useState(false);
    const [selelectedSS, setSelelectedSS] = useState(false);
    const { id } = useParams();
    const userID = +id;
    useEffect(() => {
        fetch('http://localhost:3001/scientificSupervisors', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))
    }, [])

    if (scientificSupervisors) {
        if (scientificSupervisorsOption.find(x => x.value === 'NULL') === undefined) {
            scientificSupervisorsOption.push({
                value: 'NULL',
                label: 'Не указывать',
            })
        }
        scientificSupervisors.map((c) => {
            if (scientificSupervisorsOption.find(x => x.value === c.userID) === undefined) {
                scientificSupervisorsOption.push({
                    value: c.userID,
                    label: c.lastname + " " + c.firstname + (c.patronymic == null ? "" : " " + c.patronymic),
                    blocking: c.blocking
                })
            }
        })
    }
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
        fetch('http://localhost:3001/educationalcourses', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(f => setEducationalcourses(f))
    }, [])
    function onSelectChange(v) {
        if (v.value === undefined) {
            document.getElementById('name').value = '';
            setSelelectedSS('NULL');
            document.getElementById('note').value = '';
        } else {
            const c = findStuff(educationalcourses, 'courseID', +v.value)
            document.getElementById('name').value = c.name
            if (c.teacherID === null) setSelelectedSS('NULL');
            else setSelelectedSS(scientificSupervisorsOption.find(x => x.value === c.teacherID))
            document.getElementById('note').value = c.note
        }
    }
    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i][propertyToFind] === valueToFind)
                return jsonobject[i];
        }
        return null;
    }

 const handleChange = (selelectedSS) => {
      setSelelectedSS(selelectedSS);
  };

    return (
        <>
            <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDF2' onClick={() => setShowType(1)} >
                        Редактировать учебный курс
                    </button >
                    <button className='adminActItemSec' id='EDF3' onClick={() => setShowType(2)} >
                        Удалить учебный курс
                    </button >
                </div>
                {showType ? (
                    (showType === 1) ? ChangeEducationalCourse() : ((showType === 2) ? DeleteEducationalCourse() : " ")) : ""}
            </div>
        </>
    )

    function DeleteEducationalCourse() {
        return (<> <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/deletecourse`)}>
            <table className='RegistrationFormTAble'>
                <tbody>
                    <tr>
                        <td colSpan='2'><p>Удаление одного элемента может привести к удалению всех связанных данных (оценок по этому курсу).</p>
                            <p>Вы точно уверены?</p></td>
                    </tr>
                    {!educationalcourses ? (<><tr>
                        <td>Загрузка данных</td>
                    </tr></>) : (<>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="courseID">Учебный курс</label></td>
                            <td><Select name="courseID" options={educationalcoursesOption} className="basic-multi-select"
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
    function ChangeEducationalCourse() {
        return (<> <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/editcourse`)}>
            <table className='RegistrationFormTAble'>
                <tbody>
                    {!educationalcourses ? (<><tr>
                        <td>Загрузка данных</td>
                    </tr></>) : (<>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="courseID">Учебный курс</label></td>
                            <td><Select name="courseID" options={educationalcoursesOption} className="basic-multi-select"
                                classNamePrefix="select" onChange={(v) => onSelectChange(v)} placeholder='Выбрать...' required />
                            </td>
                        </tr></>)}
                    <tr>
                        <td className='td_label'>
                            <label className="text-field__label" htmlFor='name'>Название</label>
                        </td>
                        <td>
                            <input className='text-field__input' type="text" id='name' name='name' placeholder='Название' required />
                        </td>
                    </tr>
                    <tr>
                        <td className='td_label'><label className="text-field__label" htmlFor="teacherID">Преподаватель</label></td>
                        <td><Select
                            id='teacherID'
                            name="teacherID"
                            value={selelectedSS}
                            onChange={handleChange}
                            options={scientificSupervisorsOption}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder='Выбрать...'
                            required
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className='td_label'>
                            <label className="text-field__label" htmlFor='note'>Комментарий</label>
                        </td>
                        <td>
                            <input className='text-field__input' type="text" id='note' name='note' placeholder='Комментарий' />
                        </td>
                    </tr>
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

}