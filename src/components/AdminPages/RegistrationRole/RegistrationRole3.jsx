import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


export default function RegistrationRole3() {
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
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [departmentItems, setDepartmentItems] = useState([]);

    useEffect(() => {
        setDepartmentItems([]);
        selectedFaculty &&
            setDepartmentItems(departments.filter((c) => c.faculty === +selectedFaculty));
    }, [selectedFaculty]);

    return (<>
        <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/RegistrationForm/3`)}>
            <table className='RegistrationFormTAble'>
                <tbody>
                    {labelinputTR("Фамилия", "lastname", true)}
                    {labelinputTR("Имя", "firstname", true)}
                    {labelinputTR("Отчество", "patronymic", false)}
                </tbody>
                <tbody className='formRole' id='formRole3'>
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
                                <option value="NULL">Без кафедры (Представитель факультета)</option>
                                {departmentItems.map((c) => (<option key={c.departmentID} value={c.departmentID}>{c.name}</option>))}
                            </select>
                            </td>
                        </tr></>)}
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
                    <input className='text-field__input' type="text" id={id} name={id} placeholder={name} required />
                </td>
            </tr>
        )
        else return (
            <tr>
                <td className='td_label'>
                    <label className="text-field__label" htmlFor={id}>{name}</label>
                </td>
                <td>
                    <input className='text-field__input' type="text" id={id} name={id} placeholder={name} />
                </td>
            </tr>
        )
    }
}
