import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { specialtiesOption } from '../data.ts';
import Select from 'react-select';

export default function Specialty() {
    const [showSpecialty, setShowSpecialty] = useState(false);
    const [specialties, setSpecialties] = useState(null)
    const { id } = useParams();
    const userID = +id;
    useEffect(() => {
        fetch('http://localhost:3001/specialties', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(f => setSpecialties(f))
    }, [])

    if (specialties) {
        specialties.map((c) => {
            if (specialtiesOption.find(x => x.value === c.specialtyID) === undefined) {
                specialtiesOption.push({
                    value: c.specialtyID,
                    label: c.name,
                })
            }
        })
    }

    function changeShowSpecialty(i) {
        setShowSpecialty(i)
    };

    return (
        <>
            <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDF1' onClick={() => changeShowSpecialty(1)} >
                        Добавить новую
                    </button >
                    <button className='adminActItemSec' id='EDF2' onClick={() => changeShowSpecialty(2)} >
                        Редактировать имеющуюся
                    </button >
                    <button className='adminActItemSec' id='EDF3' onClick={() => changeShowSpecialty(3)} >
                        Удалить
                    </button >
                </div>
                {showSpecialty ? ((showSpecialty === 1) ? NewSpecialty() :
                    ((showSpecialty === 2) ? EditSpecialty() :
                        ((showSpecialty === 3) ? DeleteSpecialty() : ""))) : ""
                }
            </div>
        </>
    )
    function NewSpecialty() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/newspecialty`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='specialty'>Специальность</label>
                                </td>
                                <td>
                                    <input className='text-field__input' id='specialty' type="text" name='specialty' placeholder='Специальность' required />
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

    function EditSpecialty() {

        function onSelectChange(v) {
            if (v.value === 'none') {
                document.getElementById('specialty').value = '';
            } else {
                const fac = findStuff(specialties, 'specialtyID', +v.value)
                document.getElementById('specialty').value = fac.name;
            }
        }
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/editspecialty`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            {!specialties ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" htmlFor="specialtyID">Специальность</label></td>
                                    <td><Select
                                        name="specialtyID"
                                        options={specialtiesOption}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder='Выбрать...'
                                        onChange={(v) => onSelectChange(v)}
                                        required
                                    />
                                    </td>
                                </tr></>)}
                            <tr>
                                <td className='td_label'>
                                    <label className="text-field__label" htmlFor='specialty'>Название</label>
                                </td>
                                <td>
                                    <input className='text-field__input' id='specialty' type="text" name='specialty' placeholder='Название' required />
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


    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i][propertyToFind] === valueToFind)
                return jsonobject[i];
        }
        return null;
    }

    function DeleteSpecialty() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/deletespecialty`)}>
                    <table className='FacultyFormTable'>
                        <tbody>
                            <tr>
                                <td colSpan='2'><p>Удаление одного элемента может привести к удалению всех связанных данных (аспирантов).</p>
                                    <p>Вы точно уверены?</p></td>
                            </tr>
                            {!specialties ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" htmlFor="specialtyID">Специальность</label></td>
                                    <td><Select
                                        name="specialtyID"
                                        options={specialtiesOption}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder='Выбрать...'
                                        required
                                    />
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
}

