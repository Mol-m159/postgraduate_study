import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Select from 'react-select';

import { graduateStudentsOption } from '../data.ts';

export default function ChangeGraduateStudent() {

    const [users, setData] = useState(null)
    const [faculties, setFaculties] = useState(null)
    const [departments, setDepartments] = useState(null)
    const [specialties, setSpecialties] = useState(null)
    const [scientificSupervisors, setScientificSupervisors] = useState(null)

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
        fetch('http://localhost:3001/specialties', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(f => setSpecialties(f))
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
        fetch('http://localhost:3001/graduateStudents', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))
    }, [])

    if (users) {
        users.map((c) => {
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

    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [departmentItems, setDepartmentItems] = useState([]);


    useEffect(() => {
        setDepartmentItems([]);
        selectedFaculty &&
            setDepartmentItems(departments.filter((c) => c.faculty === +selectedFaculty));
    }, [selectedFaculty]);

    const [selectedDept, setSelectedDept] = useState("");
    const [usersItems, setUsersItems] = useState([]);

    useEffect(() => {
        setUsersItems([]);
        selectedDept &&
            setUsersItems(scientificSupervisors.filter((c) => c.department == +selectedDept));
    }, [selectedDept]);


    function onSelectChange(v) {
        if (v.value === undefined) {
            document.getElementById('facultyID').value = '';
            document.getElementById('departmentID').value = '';
            document.getElementById('specialtyID').value = '';
            document.getElementById('scientificSupervisorID').value = '';
            document.getElementById('yearofadmission').value = '';
        } else {
            const u = findStuff(users, 'userID', +v.value)
            const fID = findStuff(departments, 'departmentID', u.department).faculty;
            document.getElementById('facultyID').value = fID;
            setSelectedFaculty(fID);
            setTimeout(() => {
                document.getElementById('departmentID').value = u.department;
            }, 30);
            setSelectedDept(u.department);
            setTimeout(() => {
                document.getElementById('scientificSupervisorID').value = u.scientificSupervisorID;
            }, 30);
            document.getElementById('specialtyID').value = u.specialty;
            document.getElementById('yearofadmission').value = u.yearofadmission;
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
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/changeUserData/2`)}>
                <table className='RegistrationFormTAble'>
                    <tbody>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="user">Пользователь</label></td>
                            <td><Select
                                name="user"
                                options={graduateStudentsOption}
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
                                        onChange={e => { setSelectedFaculty(e.target.value) }} required>
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
                                <td><select className="select" name='departmentID' id='departmentID' onChange={e => { setSelectedDept(e.target.value) }} required>
                                    <option value="none">--Выберите кафедру--</option>
                                    {departmentItems.map((c) => (<option key={c.departmentID} value={c.departmentID}>{c.name}</option>))}
                                </select>
                                </td>
                            </tr></>)}
                        {!specialties ? (<><tr>
                            <td>Загрузка данных</td>
                        </tr></>) : (<>
                            <tr>
                                <td className='td_label'><label className="text-field__label" htmlFor="specialtyID">Специальность</label></td>
                                <td><select className="select" name='specialtyID' id='specialtyID' required>
                                    <option value="none">--Выберите специальность--</option>
                                    {specialties.map((c) => (<option key={c.specialtyID} value={c.specialtyID}>{c.name}</option>))}
                                </select>
                                </td>
                            </tr></>)}
                        {!scientificSupervisors ? (<><tr>
                            <td>Загрузка данных</td>
                        </tr></>) : (<>
                            <tr>
                                <td className='td_label'><label className="text-field__label" htmlFor="scientificSupervisorID">Научный руководитель</label></td>
                                <td><select className="select" name='scientificSupervisorID' id='scientificSupervisorID' required>
                                    <option value="none">--Выберите руководителя--</option>
                                    {usersItems.map((c) => (<option key={c.userID} value={c.userID}>{c.lastname + " " + String(c.firstname).charAt(0).toUpperCase() + ". " + (c.patronymic == null ? "" : String(c.patronymic).charAt(0).toUpperCase() + ".")}</option>))}
                                </select>
                                </td>
                            </tr></>)}
                        <tr>
                            <td className='td_label'>
                                <label className="text-field__label" htmlFor='yearofadmission'>Год поступления</label>
                            </td>
                            <td>
                                <input className='text-field__input' type="number" id='yearofadmission' name='yearofadmission' placeholder='2025' min="2020" max="2100" required />
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
        </>
    )
}
