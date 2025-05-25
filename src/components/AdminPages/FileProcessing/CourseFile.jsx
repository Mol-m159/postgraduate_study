import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { scientificSupervisorsOption, graduateStudentsOption, educationalcoursesOption } from '../data.ts';
import Select from 'react-select';
import * as XLSX from 'xlsx';

export default function CourseFile() {
    const [scientificSupervisors, setScientificSupervisors] = useState(null)
    const [graduateStudents, setGraduateStudents] = useState(null)
    const [educationalcourses, setEducationalcourses] = useState(false);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const userID = +id;
    useEffect(() => {
        fetch('http://localhost:3001/scientificSupervisors', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setScientificSupervisors(f))
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
                    label: c.lastname + " " + String(c.firstname).charAt(0).toUpperCase() + ". " + (c.patronymic == null ? "" : String(c.patronymic).charAt(0).toUpperCase() + "."),
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
                    label: c.lastname + " " + String(c.firstname).charAt(0).toUpperCase() + ". " + (c.patronymic == null ? "" : String(c.patronymic).charAt(0).toUpperCase() + "."),
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
                    label: c[keysU[1]]
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

    const [inputFields, setInputFields] = useState([])
    const addFields = () => {
        let newfield = { name: '', age: '' }

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
        };
        reader.readAsBinaryString(file);
    };
    function equals(elem, base) {
        return elem.toUpperCase() == base.toUpperCase();
    };
    return (
        <>
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/newcourse/${2}`)}>
                <input type="file" id="FormFile" accept=".xls,.xlsx" onChange={handleFileUpload} />
                {!data[0] ?'':<><table className='RegistrationFormTAble'>
                    <tbody>               
                        <tr>
                            <td className='td_label'>
                                <label className="text-field__label" htmlFor='name'>Название</label>
                            </td>
                            <td colSpan={3}>
                                <input className='text-field__input' type="text"
                                    defaultValue={data[0].Название} name='name' placeholder='Название' required />
                            </td>
                        </tr>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="teacherID">Преподаватель</label></td>
                            <td colSpan={3}><Select
                                name="teacherID"
                                defaultValue={scientificSupervisorsOption.find(x=> x.label == data[0].Преподаватель)}
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
                            <td colSpan={3}>
                                <input className='text-field__input' defaultValue={data[0].Комментарий} type="text" name='note' placeholder='Комментарий' />
                            </td>
                        </tr>
                        {data.map((row, index) => (
                            rowProc(index, row)
                        ))}
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
</>}
            </form>
        </>)
    function rowProc(index, row) {


        return (
            <><tr>
                <td>
                    <input className='text-field__input' type="date" id="date" name={"date_" + index} defaultValue={row.Дата} placeholder='Дата' required></input>
                </td>
                <td>
                    <Select
                        name={'user_' + index}
                        id='graduateStudentsOption'
                        defaultValue={graduateStudentsOption.find(x => equals(x.label, row.Аспирант))}
                        options={graduateStudentsOption}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder='Аспирант'
                        required
                    />
                </td>
                <td>
                    <select className="select" name={"assessments_" + index} id="assessments" defaultValue={row.Оценка}>
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

    }
}