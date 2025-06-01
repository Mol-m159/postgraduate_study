import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function Faculty() {
    const [showFaculty, setShowFaculty] = useState(false);
    const { id } = useParams();
    const userID = +id;
    function changeShowFaculty(i) {
        setShowFaculty(i)
    };
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/faculties', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))
    }, [])


    const onSelectChange = event => {
        if (event.target.value === 'none') {
            document.getElementById('id').value = '';
            document.getElementById('faculty').value = '';
        } else {
            const fac = findStuff(data, 'facultyID', +event.target.value)
            document.getElementById('id').value = fac.facultyID;
            document.getElementById('faculty').value = fac.name;
        }
    }

    return (
        <>
            <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDF1' onClick={() => changeShowFaculty(1)} >
                        Добавить новый
                    </button >
                    <button className='adminActItemSec' id='EDF2' onClick={() => changeShowFaculty(2)} >
                        Редактировать имеющийся
                    </button >
                    <button className='adminActItemSec' id='EDF3' onClick={() => changeShowFaculty(3)} >
                        Удалить
                    </button >
                </div>
                {showFaculty ? ((showFaculty === 1) ? Newfaculty() :
                    ((showFaculty === 2) ? EditFaculty() :
                        ((showFaculty === 3) ? DeleteFaculty() : ""))) : ""
                }
            </div>
        </>
    )
    function Newfaculty() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/newfaculty`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='id'>Код</label>
                                </td>
                                <td>
                                    <input className='text-field__input' id='id' type="number" name='id' placeholder='Код' required />
                                </td>
                            </tr>
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='faculty'>Название</label>
                                </td>
                                <td>
                                    <input maxlength="100" className='text-field__input' type="text" name='faculty' id='faculty' placeholder='Название' required />
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
    function EditFaculty() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/editfaculty`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            {!data ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" htmlFor="select-faculty">Факультет</label></td>
                                    <td><select key='-1' className="select" id="select-faculty" name="facultyID" onChange={onSelectChange}>
                                        <option key='0' value="none">--Выберите факультет--</option>
                                        {
                                            data.map(item => (<>
                                                <option key={item.facultyID} value={item.facultyID}>{item.name}</option>
                                            </>)
                                            )
                                        }
                                    </select>
                                    </td>
                                </tr></>)}
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='id'>Код</label>
                                </td>
                                <td>
                                    <input className='text-field__input' id='id' type="number" name='id' placeholder='Код' required />
                                </td>
                            </tr>
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='faculty'>Название</label>
                                </td>
                                <td>
                                    <input maxlength="100" className='text-field__input' type="text" name='faculty' id='faculty' placeholder='Название' required />
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
    function DeleteFaculty() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/deletefaculty`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            {!data ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td colSpan='2'><p>Удаление одного элемента может привести к удалению всех связанных данных (кафедр, аспирантов, преподавателей).</p>
                                        <p>Вы точно уверены?</p></td>
                                </tr>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" htmlFor="facultyID">Факультет</label></td>
                                    <td><select key='-1' className="select" id="facultyID" name="facultyID">
                                        <option key='0' value="none">--Выберите факультет--</option>
                                        {
                                            data.map(item => (<>
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


    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i][propertyToFind] === valueToFind)
                return jsonobject[i];
        }
        return null;
    }
}