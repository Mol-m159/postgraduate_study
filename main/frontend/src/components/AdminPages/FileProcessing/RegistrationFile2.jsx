import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { departmentsOption } from '../data.ts';
import Select from 'react-select';
import * as XLSX from 'xlsx';

export default function RegistrationFile() {
    const { id } = useParams();
    const userID = +id;
    const [data, setData] = useState([]);
    const [show, setShow] = useState(null);
    const [departments, setDepartments] = useState(null)
    const [faculties, setFaculties] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/departments', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(response => {
                response.map((c) => {
                    if (departmentsOption.find(x => x.value === c.departmentID) === undefined) {
                        departmentsOption.push({
                            value: c.departmentID,
                            label: c.name,
                            isFixed: false,
                        })
                    }
                })
                return departmentsOption;
            }
            )
            .then(f => setDepartments(f))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/faculties', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(f => setFaculties(f))
    }, [])



    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
        };
        reader.readAsBinaryString(file);
    };
     const onShow = (e) => {
            alert('Файл должен содержать колонки с названиями:\n"Фамилия", \n"Имя",	\n"Отчество", \n"Кафедра", \n"Факультет" \n' +
                 'в первой строке файла. \n\n Факультет: полное название.\n ' +
                'Кафедра: полное название без слова "кафедра" \n \n Факультет и кафедра могут быть пустыми.')
        }

    return (
        <div><p></p>
            <select className="select" id="select-1" name="role" onChange={e => {
                                                 setShow(e.target.value);
                                            }}>
                <option value="0">--Выберите роль--</option>
                <option value="2">Научный руководитель</option>
                <option value="3">Представитель подразделения</option>
            </select>
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/RegistrationFile2/${show}`)}>
             <button className='onFix' type='button' id='onShow' onClick={onShow}>Показать требования к файлу</button>
                <input type="file" id="FormFile" accept=".xls,.xlsx" onChange={handleFileUpload} />
                <div className='RegistrationFormTAble'>{show === "2" ? "Форма для научных руководителей и простых преподавателей" : (show === "3" ? "Форма для заведующих кафедрами и представителей подразделений" : "Роль не выбрана")}
                </div><table className='RegistrationFormTAble'>
                    <tbody className='formRole' id='formRole1'>
                        {data.map((row, index) => (
                            rowProc(index, row)
                        ))}
                        <tr>
                            <td></td><td>
                                <button className='adminActItem' id='NextButton' type="submit">Далее</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
    );



    function rowProc(rowIndex, row) {
        function labelinputTR(name, id, r, val) {
            if (r) return (
                <tr>
                    <td className='td_label'>
                        <label className="text-field__label" htmlFor={id}>{name}</label>
                    </td>
                    <td>
                        <input maxlength="50" className='text-field__input' defaultValue={val} type="text" id={id} name={id} placeholder={name} required />
                    </td>
                </tr>
            )
            else return (
                <tr>
                    <td className='td_label'>
                        <label className="text-field__label" htmlFor={id}>{name}</label>
                    </td>
                    <td>
                        <input maxlength="50" className='text-field__input' defaultValue={val} type="text" id={id} name={id} placeholder={name} />
                    </td>
                </tr>
            )
        }
        const onFix = (e) => {
            document.getElementById('onUnFix_' + rowIndex).style.display = 'flex'
            document.getElementById('onFix_' + rowIndex).style.display = 'none'
            document.getElementById('lastname_' + rowIndex).readOnly = true;
            document.getElementById('firstname_' + rowIndex).readOnly = true;
            document.getElementById('patronymic_' + rowIndex).readOnly = true;
        }
        const onUnFix = (e) => {
            document.getElementById('onFix_' + rowIndex).style.display = 'flex'
            document.getElementById('onUnFix_' + rowIndex).style.display = 'none'
            document.getElementById('lastname_' + rowIndex).readOnly = false;
            document.getElementById('firstname_' + rowIndex).readOnly = false;
            document.getElementById('patronymic_' + rowIndex).readOnly = false;
        }

        return (
            <>
                {labelinputTR("Фамилия", "lastname_" + rowIndex, true, row.Фамилия)}
                {labelinputTR("Имя", "firstname_" + rowIndex, true, row.Имя)}
                {labelinputTR("Отчество", "patronymic_" + rowIndex, false, row.Отчество)}
                {!faculties ? (<><tr>
                                <td>Загрузка данных</td>
                            </tr></>) : (<>
                                <tr>
                                    <td className='td_label'><label className="text-field__label" >Факультет</label></td>
                                    <td><select className="select" id="select-department" name={"facultyID_"+ rowIndex} defaultValue={!row.Факультет ?"NULL":findStuff(faculties, "name", row.Факультет).facultyID}>
                                        <option value="NULL">Без факультета</option>
                                        {
                                            faculties.map(item => (<>
                                                <option key={item.facultyID} value={item.facultyID}>{item.name}</option>
                                            </>)
                                            )
                                        }
                                    </select>
                                    </td>
                                </tr></>)}
                {!departments ? (<><tr>
                    <td>Загрузка данных</td>
                </tr></>) : (<>
                    <tr>
                        <td className='td_label'><label className="text-field__label">Кафедра</label></td>
                        <td><Select
                            name={"departmentID_" + rowIndex}
                            id={"departmentID_" + rowIndex}
                            defaultValue={departments.find(x => equals(x.label, row.Кафедра))}
                            options={departments}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder='Выбрать...'
                        />
                        </td>
                    </tr></>)}
                <tr>
                    <td></td><td><button className='onUnFix' type='button' id={'onUnFix_' + rowIndex} onClick={onUnFix}>Снять фиксацию</button>
                        <button className='onFix' type='button' id={'onFix_' + rowIndex} onClick={onFix}>Фиксировать текстовые поля</button>
                    </td>
                </tr>
            </>
        )

    function equals(elem, base) {
        if(base){return elem.toUpperCase() == base.toUpperCase()}
            else return false;
        };
    function findStuff(jsonobject, propertyToFind, valueToFind) {
        for (var i = 0; i < jsonobject.length; i++) {
            if (equals(jsonobject[i][propertyToFind] , valueToFind))
                return jsonobject[i];
        }
        return null;
    }}
}