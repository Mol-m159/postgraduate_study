import './/../AdminBoby.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function SpecialtyFile() {
    const { id } = useParams();
    const userID = +id;
    const [data, setData] = useState([]);
    
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
            alert('Файл должен содержать колонку с названем:\n"Название" ' +
                 'в первой строке файла. \n\n Название в формате: "1.1.2 Дифференциальные уравнения и математическая физика".\n '
                )
        }
    return (
        <div><p></p>
            <form className='AdminBobyForm' method="post" action={(`http://localhost:3001/${userID}/newspecialties`)}>
             <button className='onFix' type='button' id='onShow' onClick={onShow}>Показать требования к файлу</button>
                <input type="file" id="FormFile" accept=".xls,.xlsx" onChange={handleFileUpload} />
                <div className='RegistrationFormTAble'>
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
            document.getElementById('name_' + rowIndex).readOnly = true;
        }
        const onUnFix = (e) => {
            document.getElementById('onFix_' + rowIndex).style.display = 'flex'
            document.getElementById('onUnFix_' + rowIndex).style.display = 'none'
            document.getElementById('name_' + rowIndex).readOnly = false;
        }

        return (
            <>
                {labelinputTR("Название", "name_" + rowIndex, true, row.Название)}
                <tr>
                    <td></td><td><button className='onUnFix' type='button' id={'onUnFix_' + rowIndex} onClick={onUnFix}>Снять фиксацию</button>
                        <button className='onFix' type='button' id={'onFix_' + rowIndex} onClick={onFix}>Фиксировать текстовые поля</button>
                    </td>
                </tr>
            </>
        )
    }
}