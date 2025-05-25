import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function Department() {
    const [showDepartment, setShowDepartment] = useState(false);
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

    const onSelectChange = event => {
        if (event.target.value === 'none') {
            document.getElementById('department').value = '';
            document.getElementById('facultyID').value = 'none';
        } else {
            const dep = findStuff(departments, 'departmentID', +event.target.value)
            document.getElementById('department').value = dep.name;
            document.getElementById('facultyID').value = dep.faculty;
        }
    }
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [departmentItems, setDepartmentItems] = useState([]);

    useEffect(() => {
        setDepartmentItems([]);
        selectedFaculty &&
            setDepartmentItems(departments.filter((c) => c.faculty == +selectedFaculty));
    }, [selectedFaculty]);

    function changeShowDepartment(i) {
        setShowDepartment(i)
    };

    return (
        <>
            <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDD1' onClick={() => changeShowDepartment(1)} >
                        Добавить новую
                    </button >
                    <button className='adminActItemSec' id='EDD2' onClick={() => changeShowDepartment(2)} >
                        Редактировать имеющуюся
                    </button >
                    <button className='adminActItemSec' id='EDD3' onClick={() => changeShowDepartment(3)} >
                        Удалить
                    </button >
                </div>
                {showDepartment ? ((showDepartment === 1) ? Newdepartment() :
                    ((showDepartment === 2) ? EditDepartment() :
                        ((showDepartment === 3) ? DeleteDepartment() : ""))) : ""
                }
            </div>
        </>
    )
    function Newdepartment() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/newdepartment`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            {!faculties ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" for="department_id">Факультет</label></td>
                                    <td><select className="select" id="select-department" name="facultyID">
                                        <option value="none">--Выберите факультет--</option>
                                        {
                                            faculties.map(item => (<>
                                                <option key={item.facultyID} value={item.facultyID}>{item.name}</option>
                                            </>)
                                            )
                                        }
                                    </select>
                                    </td>
                                </tr></>)}
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='department'>Название</label>
                                </td>
                                <td>
                                    <input className='text-field__input' type="text" name='department' placeholder='Название' required />
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
    function EditDepartment() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/editdepartment`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            {!faculties ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" for="select-faculty">Факультет</label></td>
                                    <td>
                                        <select className="select" name="select-faculty" id="select-faculty"
                                            onChange={e => {
                                                setSelectedFaculty(e.target.value);
                                                document.getElementById('department').value = '';
                                                document.getElementById('facultyID').value = 'none';
                                                document.getElementById('department_id').value = 'none';
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
                                    <td className='td_label'><label className="text-field__label" for="department_id">Кафедра</label></td>
                                    <td><select className="select" name='department_id' id='department_id' onChange={onSelectChange}>
                                        <option value="none">--Выберите кафедру--</option>
                                        {departmentItems.map((c) => (<option key={c.departmentID} value={c.departmentID}>{c.name}</option>))}
                                    </select>
                                    </td>
                                </tr></>)}
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='department'>Название</label>
                                </td>
                                <td>
                                    <input className='text-field__input' type="text" name='department' id='department' placeholder='Название' required />
                                </td>
                            </tr>
                            {!faculties ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" for="facultyID">Измененный факультет</label></td>
                                    <td><select className="select" id="facultyID" name="facultyID">
                                        <option value="none">--Выберите факультет--</option>
                                        {
                                            faculties.map(item => (<>
                                                <option key={item.facultyID} value={item.facultyID}>{item.name}</option>
                                            </>)
                                            )
                                        }
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
    function DeleteDepartment() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/deletedepartment`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            {!faculties ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td colSpan='2'><p>Удаление одного элемента может привести к удалению всех связанных данных (аспирантов, преподавателей).</p>
                                        <p>Вы точно уверены?</p></td>
                                </tr>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" for="select-faculty">Факультет</label></td>
                                    <td>
                                        <select className="select" name="select-faculty" id="select-faculty"
                                            onChange={e => {
                                                setSelectedFaculty(e.target.value);
                                            }}>
                                            <option key='0' value="none">--Выберите факультет--</option>
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
                                    <td className='td_label'><label className="text-field__label" for="departmentID">Кафедра</label></td>
                                    <td><select className="select" name='departmentID' id='departmentID'>
                                        <option key='0' value="none">--Выберите кафедру--</option>
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
    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i][propertyToFind] === valueToFind)
                return jsonobject[i];
        }
        return null;
    }
}


