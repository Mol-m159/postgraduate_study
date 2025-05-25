import './AdminBoby.css';
import  { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Select from 'react-select';

import { usersOption } from './data.ts';


export default function Blocking() {
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

    const [selectedBlock, setSelectedBlock] = useState("");
    const [usersItems, setUsersItems] = useState([]);

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
    useEffect(() => {
        setUsersItems([]);
        selectedBlock &&
            setUsersItems(usersOption.filter((c) => c.blocking !== +selectedBlock));
    }, [selectedBlock]);



    return (
        <><div className='AdminBoby'>
            <p>Блокировка пользователей</p>    
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/editdata/blocking`)}>
                <table className='RegistrationFormTAble'>
                    <tbody>
                        <tr>
                            <td colSpan='2'>
                                <select className="select" name="block" id="block"
                                    onChange={e => { setSelectedBlock(e.target.value) }}>
                                    <option value="none">--Выбрать--</option>
                                    <option value="1">Заблокировать</option>
                                    <option value="0">Разблокировать</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className='td_label'><label className="text-field__label" htmlFor="user">Пользователь</label></td>
                            <td><Select
                                isMulti
                                name="users"
                                options={usersItems}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder='Выбрать...'
                                required
                            />
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
        </div>
        </>
    )

}
