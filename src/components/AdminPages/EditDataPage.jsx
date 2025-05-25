import './AdminBoby.css';
import { useState } from 'react'

import Faculty from './EditData/Faculty';
import Department from './EditData/Department';
import Specialty from './EditData/Specialty';
import ChangePassword from './EditData/ChangePassword';
import UserData from './EditData/UserData';
import ChangeGraduateStudent from './EditData/ChangeGraduateStudent';
import ChangeAffiliation from './EditData/ChangeAffiliation';
import EducationalCourse from './EditData/EducationalCourse';
import Assessments from './EditData/Assessments';

export default function EditDataPage() {
    const [showType, setShowType] = useState(false);

    const changeType = event => {
        setShowType(event.target.value)
    };
    return (
        <>
            <div className='AdminBoby'>
                <p> Изменение и удаление данных</p>    
                <select className="select" id="select-1" name="type" onChange={changeType}>
                    <option value="0">--Выберите тип данных--</option>
                    <option value="1">Пароль пользователя</option>
                    <option value="2">Данные пользователя</option>
                    <option value="3">Оценки</option>
                    <option value="4">Учебные курсы</option>
                    <option value="5">Данные аспирантов</option>
                    <option value="6">Данные о преподавателях</option>
                    <option value="7">Специальности</option>
                    <option value="8">Кафедры</option>
                    <option value="9">Факультеты</option>
                </select>
                <p>При изменении формы уже введенные данные не сохраняются. Будьте внимательны!</p>
                <p>Если в полях выбора не хватает данных или есть лишние, рекомендуем перезагрузить страницу.</p>
                {showType ? ((showType === "1" ? <div className='AdminBoby'>
                    <ChangePassword />
                </div> :
                    ((showType === "2") ? <UserData /> :
                        ((showType === "3") ? <Assessments /> :
                            ((showType === "4") ? <EducationalCourse /> :
                                ((showType === "5") ? <div className='AdminBoby'>
                                    <ChangeGraduateStudent />
                                </div> :
                                    ((showType === "6") ? <div className='AdminBoby'>
                                        <ChangeAffiliation />
                                    </div> :
                                        ((showType === "7") ? <Specialty /> :
                                            ((showType === "8") ? <Department /> :
                                                ((showType === "9") ? <Faculty /> :
                                                    "Возикла непредвиденная ошибка")
                                            ))))))))) : ""
                }
            </div>
        </>
    )
}