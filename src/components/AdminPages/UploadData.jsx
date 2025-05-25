import './/../AdminPage.css';
import { useState } from 'react'

import RegistrationFile from './FileProcessing/RegistrationFile';
import CourseFile from './FileProcessing/CourseFile';

export default function UploadData() {
    const [showType, setShowType] = useState(false);
    return (
            <>
                <div className='AdminBoby'>
                <div className='blockButtons'>
                    <button className='adminActItemSec' id='EDF1' onClick={() => setShowType(1)} >
                        Регистрация обучающихся
                    </button >
                    <button className='adminActItemSec' id='EDF2' onClick={() => setShowType(2)} >
                        Новый учебный курс с оценками
                    </button >
                </div>
               {showType ? ((showType === 1) ? <RegistrationFile/>:
                    ((showType === 2) ? <CourseFile/> : "")
                        ) : ""}
            </div>
            </>
        )
};