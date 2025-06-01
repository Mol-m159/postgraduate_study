import './/../AdminPage.css';
import { useState } from 'react'
import RegistrationFile2 from './FileProcessing/RegistrationFile2';
import RegistrationFile from './FileProcessing/RegistrationFile';
import CourseFile from './FileProcessing/CourseFile';
import SpecialtyFile from './FileProcessing/SpecialtyFile'

export default function UploadData() {
    const [showType, setShowType] = useState(false);
    return (
            <>
                <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDF1' onClick={() => setShowType(1)} >
                        Регистрация обучающихся
                    </button >
                     <button className='adminActItemSec' id='EDF1' onClick={() => setShowType(3)} >
                        Регистрация преподавателей
                    </button >
                    <button className='adminActItemSec' id='EDF1' onClick={() => setShowType(4)} >
                        Специальности
                    </button >
                    <button className='adminActItemSec' id='EDF2' onClick={() => setShowType(2)} >
                        Новый учебный курс с оценками
                    </button >
                </div>
               {showType ? ((showType === 1) ? <RegistrationFile/>:
                    ((showType === 2) ? <CourseFile/> : 
                     ((showType === 3) ? <RegistrationFile2/> :  ((showType === 4) ? <SpecialtyFile/> :  "")))
                        ) : ""}
            </div>
            </>
        )
};