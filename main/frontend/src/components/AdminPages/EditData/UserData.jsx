import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Select from 'react-select';

import { usersOption } from '../data.ts';

export default function UserData() {
    const [showUser, setShowUser] = useState(false);

    const [users, setData] = useState(null)
    const { id } = useParams();
    const userID = +id;

    useEffect(() => {
        fetch('http://localhost:3001/users', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setData(f))
    }, [])

    if (users) users.map((c) => {
        if (usersOption.find(x => x.value === c.userID) === undefined) {
            usersOption.push({
                value: c.userID,
                label: c.lastname + " " + c.firstname + (c.patronymic == null ? "" : " " + c.patronymic),
                blocking: c.blocking
            })
        }
    }
    )
    function onSelectChange(value) {
        if (value.value === undefined) {
            document.getElementById('lastname').value = '';
            document.getElementById('firstname').value = '';
            document.getElementById('patronymic').value = '';
        } else {
            const u = findStuff(users, 'userID', +value.value)
            document.getElementById('lastname').value = u.lastname;
            document.getElementById('firstname').value = u.firstname;
            document.getElementById('patronymic').value = u.patronymic;;
            document.getElementById('role').value = u.role;;
        }
    }
    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i][propertyToFind] === valueToFind)
                return jsonobject[i];
        }
        return null;
    }
    function changeShowUser(i) {
        setShowUser(i)
    };
    return (
        <>
            <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDF2' onClick={() => changeShowUser(1)} >
                        Редактировать учетную запись
                    </button >
                    <button className='adminActItemSec' id='EDF3' onClick={() => changeShowUser(2)} >
                        Удалить учетную запись
                    </button >
                </div>
                {showUser ? (
                    (showUser === 1) ? ChangeUserData() : ((showUser === 2) ? DeleteUser() : " ")) : ""}
            </div>
        </>
    )

    function ChangeUserData() {
        return (
            <>
                <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/changeUserData/1`)}>
                    <table className='RegistrationFormTAble'>
                        <tbody>
                            <tr>
                                <td className='tdSpanHead' colSpan={2}><p>При изменении ФИО пользователя будут также изменены логин и пароль!
                                </p><p>
                                        Если меняется роль пользователя с Администратор/Обучающийся на Науч. руководитель/Представитель подразделения,
                                        после изменения здесь, пожалуйста, перейдите в Изменение данных о преподавателях и укажите для измененного пользователя Факультет и Кафедру.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className='td_label'><label className="text-field__label" htmlFor="user">Пользователь</label></td>
                                <td><Select name="user" options={usersOption} className="basic-multi-select" classNamePrefix="select"
                                    placeholder='Выбрать...' onChange={(value) => onSelectChange(value)} required/>
                                </td>
                            </tr>
                            {labelinputTR("Фамилия", "lastname", true)}
                            {labelinputTR("Имя", "firstname", true)}
                            {labelinputTR("Отчество", "patronymic", false)}

                            <tr>
                                <td className='td_label'><label className="text-field__label" for="role">Роль пользователя</label></td>
                                <td><select className="select" id="role" name="role">
                                    <option value="1">Обучающийся</option>
                                    <option value="2">Научный руководитель</option>
                                    <option value="3">Представитель подразделения</option>
                                    <option value="4">Администратор</option>
                                </select>
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
        function labelinputTR(name, id, r) {
            if (r) return (
                <tr>
                    <td className='td_label'>
                        <label className="text-field__label" htmlFor={id}>{name}</label>
                    </td>
                    <td>
                        <input maxlength="50" className='text-field__input' type="text" id={id} name={id} placeholder={name} required />
                    </td>
                </tr>
            )
            else return (
                <tr>
                    <td className='td_label'>
                        <label className="text-field__label" htmlFor={id}>{name}</label>
                    </td>
                    <td>
                        <input maxlength="50" className='text-field__input' type="text" id={id} name={id} placeholder={name} />
                    </td>
                </tr>
            )
        }
    }
    function DeleteUser() {
        return (<><form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/changeUserData/4`)}>
            <table className='RegistrationFormTAble'>
                <tbody>
                    <tr>
                        <td className='tdSpanHead' colSpan={2}>
                            <p>
                                Удаление учетной записи повлечет за собой удаление всех связанных данных!
                            </p>
                            <p>
                                Для Обучающегося: его оценки;
                            </p>
                            <p>
                                Для Научного руководителя и Представителя подразделения: данные по аспирантом, у которых эта запись указана как научный руководитель,
                                учебные курсы, где эта запись указана как преподаватель, и оценки по этим курсам;
                            </p>
                            <p>
                                Если вы хотите ограничить доступ к функционалу, рекомендуем заблокировать эту учетную запись.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td className='td_label'><label className="text-field__label" htmlFor="user">Пользователь</label></td>
                        <td><Select name="user" options={usersOption}className="basic-multi-select"
                            classNamePrefix="select" placeholder='Выбрать...' required/>
                        </td>
                    </tr>
                    <tr>
                        <td></td><td>
                            <button className='adminActItem' id='NextButton' type="submit">Далее</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </form></>)
    }

}