import './/../AdminBoby.css';
import  { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { specialtiesOption } from './../data.ts';
import Select from 'react-select';

export default function RegistrationRole1() {

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
            .then(response => {
                response.map( (c) => {
                        if (specialtiesOption.find(x => x.value === c.specialtyID) === undefined) {
                            specialtiesOption.push({
                                value: c.specialtyID,
                                label: c.name,
                            })
                        }
                    })
                    return specialtiesOption;
                }
                )
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

    return (<>
        <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/RegistrationForm/1`)}>
            <table className='RegistrationFormTAble'>
                <tbody>
                    {labelinputTR("Фамилия", "lastname", true)}
                    {labelinputTR("Имя", "firstname", true)}
                    {labelinputTR("Отчество", "patronymic", false)}
                </tbody>
                <tbody className='formRole' id='formRole1'>
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
                            <td><select className="select" name='departmentID' id='departmentID' onChange={e => { setSelectedDept(e.target.value) }}>
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
                            <td><Select
                                name="specialtyID"
                                options={specialties}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder='Выбрать...'
                                required
                            />
                            </td>
                        </tr></>)}
                        {!scientificSupervisors ? (<><tr>
                        <td>Загрузка данных</td>
                    </tr></>) : (<>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="scientificSupervisorID">Научный руководитель</label></td>
                            <td><select className="select" name='scientificSupervisorID' id='scientificSupervisorID'>
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
                </tbody>
                <tbody>
                    <tr>
                        <td></td><td>
                            <button className='adminActItem' id='NextButton' type="submit">Далее</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </form>
    </>)

    function labelinputTR(name, id, r) {
        if (r) return (
            <tr>
                <td className='td_label'>
                    <label className="text-field__label" htmlFor={id}>{name}</label>
                </td>
                <td>
                    <input maxlength="50"  className='text-field__input' type="text" id={id} name={id} placeholder={name} required />
                </td>
            </tr>
        )
        else return (
            <tr>
                <td className='td_label'>
                    <label className="text-field__label" htmlFor={id}>{name}</label>
                </td>
                <td>
                    <input maxlength="50"  className='text-field__input' type="text" id={id} name={id} placeholder={name} />
                </td>
            </tr>
        )
    }
}
