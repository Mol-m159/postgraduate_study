import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Select from 'react-select';

import { scientificSupervisorsOption } from '../data.ts';

export default function ChangeAffiliation() {
    const [users, setData] = useState(null)
    const [faculties, setFaculties] = useState(null)
    const [departments, setDepartments] = useState(null)

    const { id } = useParams();
    const userID = +id;
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

    useEffect(() => {
        fetch('http://localhost:3001/scientificSupervisors', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))
    }, [])


    if (users) {users.map((c) => {
        if (scientificSupervisorsOption.find(x => x.value === c.userID) === undefined) {
            scientificSupervisorsOption.push({
                value: c.userID,
                label: c.lastname + " " + c.firstname + (c.patronymic == null ? "" : " " + c.patronymic),
                blocking: c.blocking
            })
        }
    })
}


    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [departmentItems, setDepartmentItems] = useState([]);


    useEffect(() => {
        setDepartmentItems([]);
        selectedFaculty &&
            setDepartmentItems(departments.filter((c) => c.faculty === +selectedFaculty));
    }, [selectedFaculty]);



    function onSelectChange(v) {
        if (v.value === undefined) {
            document.getElementById('facultyID').value = 'none';
            document.getElementById('departmentID').value = 'none';
        } else {
            const u = findStuff(users, 'userID', +v.value)
            try {
                document.getElementById('facultyID').value = u.faculty;
                setSelectedFaculty(u.faculty);
            } catch {
                document.getElementById('facultyID').value = 'none';
            }
            setTimeout(() => {
                try {
                    document.getElementById('departmentID').value = u.department;
                } catch {
                    document.getElementById('departmentID').value = 'none';
                }
            }, 30);
        }
    }
    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i][propertyToFind] === valueToFind)
                return jsonobject[i];
        }
        return null;
    }

    return (
        <>
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/changeUserData/3`)}>
                <table className='RegistrationFormTAble'>
                    <tbody>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="user">Пользователь</label></td>
                            <td><Select
                                name="user"
                                options={scientificSupervisorsOption}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder='Выбрать...'
                                onChange={(v) => onSelectChange(v)}
                                required
                            />
                            </td>
                        </tr>
                        {!faculties ? (<><tr>
                            <td>Загрузка данных</td>
                        </tr></>) : (<>
                            <tr>
                                <td className='td_label'><label className="text-field__label" htmlFor="facultyID">Факультет</label></td>
                                <td>
                                    <select className="select" name="facultyID" id="facultyID"
                                        onChange={e => { setSelectedFaculty(e.target.value) }}>
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
                                <td><select className="select" name='departmentID' id='departmentID'>
                                    <option value="none">--Выберите кафедру--</option>
                                    {departmentItems.map((c) => (<option key={c.departmentID} value={c.departmentID}>{c.name}</option>))}
                                </select>
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
        </>
    )
}
