import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { specialtiesOption, scientificSupervisorsOption, departmentsOption } from '../data.ts';
import Select from 'react-select';
import * as XLSX from 'xlsx';

export default function RegistrationFile() {
    const { id } = useParams();
    const userID = +id;
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState(null)
    const [specialties, setSpecialties] = useState(null)
    const [scientificSupervisors, setScientificSupervisors] = useState(null)

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
        fetch('http://localhost:3001/specialties', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(response => {
                response.map((c) => {
                    if (specialtiesOption.find(x => x.value === c.specialtyID) === undefined) {
                        specialtiesOption.push({
                            value: c.specialtyID,
                            label: c.name,
                            isFixed: false,
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
            .then(response => {
                response.map((c) => {
                    if (scientificSupervisorsOption.find(x => x.value === c.userID) === undefined) {
                        scientificSupervisorsOption.push({
                            value: c.userID,
                            label: c.lastname + " " + String(c.firstname).charAt(0).toUpperCase() + ". " + (c.patronymic == null ? "" : String(c.patronymic).charAt(0).toUpperCase() + "."),
                        isFixed: false,
                    })
                    }
                })
                return scientificSupervisorsOption;
            }
            )
            .then(f => setScientificSupervisors(f))
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

    return (
        <div>
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/RegistrationFile`)}>
                <input type="file" id="FormFile" accept=".xls,.xlsx" onChange={handleFileUpload} />

                <table className='RegistrationFormTAble'>
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
                        <input className='text-field__input' defaultValue={val} type="text" id={id} name={id} placeholder={name} required />
                    </td>
                </tr>
            )
            else return (
                <tr>
                    <td className='td_label'>
                        <label className="text-field__label" htmlFor={id}>{name}</label>
                    </td>
                    <td>
                        <input className='text-field__input' defaultValue={val} type="text" id={id} name={id} placeholder={name} />
                    </td>
                </tr>
            )
        }
        function equals(elem, base) {
            return elem.toUpperCase() == base.toUpperCase();
        };
        const onFix = (e) => {
            document.getElementById('lastname_' + rowIndex).readOnly = true;
            document.getElementById('firstname_' + rowIndex).readOnly = true;
            document.getElementById('patronymic_' + rowIndex).readOnly = true;
            document.getElementById('yearofadmission_' + rowIndex).readOnly = true;
        }

        return (
            <>
                {labelinputTR("Фамилия", "lastname_" + rowIndex, true, row.Фамилия)}
                {labelinputTR("Имя", "firstname_" + rowIndex, true, row.Имя)}
                {labelinputTR("Отчество", "patronymic_" + rowIndex, false, row.Отчество)}
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
                            required
                        />
                        </td>
                    </tr></>)}
                {!specialties ? (<><tr>
                    <td>Загрузка данных</td>
                </tr></>) : (<>
                    <tr>
                        <td className='td_label'><label className="text-field__label">Специальность</label></td>
                        <td><Select
                            name={"specialtyID_" + rowIndex}
                            id={"specialtyID_" + rowIndex}
                            defaultValue={specialties.find(x => equals(x.label, row.Специальность))}
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
                        <td className='td_label'><label className="text-field__label">Научный руководитель</label></td>
                        <td><Select
                            name={"scientificSupervisorID_" + rowIndex}
                            id={"scientificSupervisorID_" + rowIndex}
                            defaultValue={scientificSupervisors.find(x => equals(x.label, row.Руководитель))}
                            options={scientificSupervisors}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder='Выбрать...'
                            required
                        />
                        </td>
                    </tr></>)}
                <tr>
                    <td className='td_label'>
                        <label className="text-field__label">Год поступления</label>
                    </td>
                    <td>
                        <input className='text-field__input' type="number" defaultValue={row.Год} id={'yearofadmission_' + rowIndex} name={'yearofadmission_' + rowIndex} placeholder='2025' min="2020" max="2100" required />
                    </td>
                </tr>
                <tr>
                    <td></td><td>
                        <button className='adminActItem' type='button' id='NextButtonFile' onClick={onFix}>Фиксировать текстовые поля</button>
                    </td>
                </tr>
            </>
        )

    }
}