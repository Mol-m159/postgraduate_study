import './AdminBoby.css';
import React, { useState } from 'react'
import RegistrationRole3 from './RegistrationRole/RegistrationRole3';
import RegistrationRole2 from './RegistrationRole/RegistrationRole2';
import RegistrationRole1 from './RegistrationRole/RegistrationRole1';
import { useParams, Link, Outlet } from 'react-router-dom';

export default function RegistrationPage() {
    const { id } = useParams();
    const userID = +id;
    const [showForm, setShowForm] = useState(false);
    const changeRole = event => {
        setShowForm(event.target.value)
    };

    return (
        <> <div className='AdminBoby'>
            <p>Регистрация нового пользователя</p>            
            <select className="select" id="select-1" name="role" onChange={changeRole}>
                <option value="0">--Выберите роль--</option>
                <option value="1">Обучающийся</option>
                <option value="2">Научный руководитель</option>
                <option value="3">Представитель подразделения</option>
                <option value="4">Администратор</option>
            </select>
            При изменении формы уже введенные данные не сохраняются. Будьте внимательны!
            {showForm ? ((showForm === "1" ?<RegistrationRole1 /> :
                ((showForm === "2") ?<RegistrationRole2 /> :
                    ((showForm === "3") ? <RegistrationRole3 /> :
                        ((showForm === "4") ? RegistrationRole4() :
                            "Возикла непредвиденная ошибка")
                    )))) : ""}

        </div>
        </>
    )


    function labelinputTR(name, id, r) {
        if (r) return (
            <tr>
                <td className='td_label'>
                    <label className="text-field__label" htmlFor={id}>{name}</label>
                </td>
                <td>
                    <input className='text-field__input' type="text" name={id} placeholder={name} required />
                </td>
            </tr>
        )
        else return (
            <tr>
                <td className='td_label'>
                    <label className="text-field__label" htmlFor={id}>{name}</label>
                </td>
                <td>
                    <input className='text-field__input' type="text" name={id} placeholder={name} />
                </td>
            </tr>
        )
    }

    function RegistrationRole4() {
        return (<>
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/RegistrationForm/4`)}>
                <table className='RegistrationFormTAble'>
                    <tbody>
                        {labelinputTR("Фамилия", "lastname", true)}
                        {labelinputTR("Имя", "firstname", true)}
                        {labelinputTR("Отчество", "patronymic", false)}
                    </tbody>
                    <tbody className='formRole' id='formRole4'>

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
        </>
        );
    }


}
