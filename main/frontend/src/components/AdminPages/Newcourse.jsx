import './AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { scientificSupervisorsOption, graduateStudentsOption, educationalcoursesOption } from './data.ts';

export default function Newcourse() {
    const [scientificSupervisors, setData] = useState(null)
    const [graduateStudents, setGraduateStudents] = useState(null)
    const [showType, setShowType] = useState(false);
    const [educationalcourses, setEducationalcourses] = useState(false);
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
    useEffect(() => {
        setShowType('1')
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
    if (educationalcourses) {
        educationalcourses.map((c) => {
            const keysU = Object.keys(c);
            if (educationalcoursesOption.find(x => x.value === c[keysU[0]]) === undefined) {
                educationalcoursesOption.push({
                    value: c[keysU[0]],
                    label: c[keysU[1]] + '('+ c[keysU[3]]+')'
                })
            }
        }
        )
    }

    useEffect(() => {
        fetch('http://localhost:3001/educationalcourses', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(f => setEducationalcourses(f))
    }, [])

    const [inputFields, setInputFields] = useState([1])
    const addFields = () => {
        let newfield = { name: '', age: '' }

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    return (
        <><div className='AdminBoby'>
            <p>Учебные  курсы и оценки</p>
            <select className="select" name="block" id="block"
                onChange={e => { setShowType(e.target.value) }}>
                <option value="1">Новый курс без оценок</option>
                <option value="2">Новый курс с оценками</option>
                <option value="3">Оценки по существующему курсу</option>
            </select>

            {showType ? (showType === "1" ? withOutAssessments() : (showType === "2" ? withAssessments() : (showType === "3" ? assessments() : " "))) : ""}

        </div>
        </>
    )
    function withAssessments() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/newcourse/${showType}`)}>
                    <table className='RegistrationFormTAble'>
                        <tbody>
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='name'>Название</label>
                                </td>
                                <td colSpan={3}>
                                    <input maxlength="100" className='text-field__input' type="text" name='name' placeholder='Название' required />
                                </td>
                            </tr>
                            <tr>
                                <td className='td_label'><label className="text-field__label" htmlFor="teacherID">Преподаватель</label></td>
                                <td colSpan={3}><Select
                                    name="teacherID"
                                    options={scientificSupervisorsOption}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder='Выбрать...'
                                    
                                />
                                </td>
                            </tr>
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='note'>Комментарий</label>
                                </td>
                                <td colSpan={3}>
                                    <input maxlength="100" className='text-field__input' type="text" name='note' placeholder='Комментарий' />
                                </td>
                            </tr>

                            {inputFields.map((input, index) => {
                                return (<>
                                    <tr>
                                        <td>
                                            <input className='text-field__input' type="date" id="date" name={"date_" + index} placeholder='Дата' required></input>
                                        </td>
                                        <td>
                                            <Select
                                                name={'user_' + index}
                                                id='graduateStudentsOption'
                                                options={graduateStudentsOption}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                placeholder='Аспирант'
                                                required
                                            />
                                        </td>
                                        <td>
                                            <select className="select" name={"assessments_" + index} id="assessments">
                                                <option value="0">Неявка</option>
                                                <option value="2">Не аттестован</option>
                                                <option value="3">Удовлетворительно</option>
                                                <option value="4">Хорошо</option>
                                                <option value="5">Отлично</option>
                                            </select>
                                        </td>

                                        <td>
                                            <button id='NextButton' className='adminActItem' onClick={() => removeFields(index)}>Удалить строку</button>
                                        </td>
                                    </tr>
                                </>
                                )
                            })}

                            <tr>
                                <td colSpan={3}></td><td>
                                    <button className='adminActItem' id='NextButton' onClick={addFields} >Добавить оценку</button>
                                </td>
                            </tr>
                            <tr><td><p> </p></td></tr>
                            <tr>
                                <td colSpan={3}></td><td>
                                    <button className='adminActItem' id='NextButton' type="submit">Далее</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>
            </>
        )
    }
    function withOutAssessments() {
        return (<>
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/newcourse/${showType}`)}>
                <table className='RegistrationFormTAble'>
                    <tbody>
                        <tr>
                            <td className='td_label'>
                                <label className="text-field__label" htmlFor='name'>Название</label>
                            </td>
                            <td>
                                <input maxlength="100" className='text-field__input' type="text" name='name' placeholder='Название' required />
                            </td>
                        </tr>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="teacherID">Преподаватель</label></td>
                            <td><Select
                                name="teacherID"
                                options={scientificSupervisorsOption}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder='Выбрать...'
                                
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className='td_label'>
                                <label className="text-field__label" htmlFor='note'>Комментарий</label>
                            </td>
                            <td>
                                <input maxlength="100" className='text-field__input' type="text" name='note' placeholder='Комментарий' />
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
    function assessments() {
        return (
            <> <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/newcourse/${showType}`)}>
                <table className='RegistrationFormTAble'>
                    <tbody>
                        {!educationalcourses ? (<><tr>
                            <td>Загрузка данных</td>
                        </tr></>) : (<>
                            <tr>
                                <td className='td_label'><label className="text-field__label" htmlFor="courseID">Учебный курс</label></td>
                                <td colSpan={3}><Select
                                    name="courseID"
                                    options={educationalcoursesOption}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder='Выбрать...'
                                    required
                                />
                                </td>
                            </tr></>)}

                        {inputFields.map((input, index) => {
                            return (<>
                                <tr>
                                    <td>
                                        <input className='text-field__input' type="date" id="date" name={"date_" + index} placeholder='Дата' required></input>
                                    </td>
                                    <td>
                                        <Select
                                            name={'user_' + index}
                                            id='graduateStudentsOption'
                                            options={graduateStudentsOption}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder='Аспирант'
                                            required
                                        />
                                    </td>
                                    <td>
                                        <select className="select" name={"assessments_" + index} id="assessments">
                                            <option value="0">Неявка</option>
                                            <option value="2">Не аттестован</option>
                                            <option value="3">Удовлетворительно</option>
                                            <option value="4">Хорошо</option>
                                            <option value="5">Отлично</option>
                                        </select>
                                    </td>

                                    <td>
                                        <button id='NextButton' className='adminActItem' onClick={() => removeFields(index)}>Удалить строку</button>
                                    </td>
                                </tr>
                            </>
                            )
                        })}

                        <tr>
                            <td colSpan={3}></td><td>
                                <button className='adminActItem' id='NextButton' onClick={addFields} >Добавить оценку</button>
                            </td>
                        </tr>
                        <tr><td><p> </p></td></tr>
                        <tr>
                            <td colSpan={3}></td><td>
                                <button className='adminActItem' id='NextButton' type="submit">Далее</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </form>
            </>
        )
    }
}
