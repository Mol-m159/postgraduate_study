import './/../MainPage.css';
import { useParams} from 'react-router-dom';
import Header from '../Header/Header';

export default function DBcallback() {
const { type } = useParams();

if (type === "Error") return (
    <>
          <div className='body' >
          <Header />
    <div className='CenterMain'>
        <div className='message'>Возникла ошибка. Перепроверьте данные и попробуйте еще раз.</div>
    
    </div>
    </div>
    </>
  )
  if (type === "Well") return (
    <>
          <div className='body' >
          <Header />
    <div className='CenterMain'>
        <div className='message'>Данные внесены успешно.</div>
    </div>
    </div>
    </>
  )
  if (type === "Nodata") return (
    <>
          <div className='body' >
          <Header />
    <div className='CenterMain'>
        <div className='message'>Возникла непредвиденная ошибка.</div>
   
    </div>
    </div>
    </>
  )
  if (type === "FIO") return (
    <>
          <div className='body' >
          <Header />
    <div className='CenterMain'>
        <div className='message'> Пользователь с такими ФИО и той же ролью уже есть в системе. </div>
   
    </div>
    </div>
    </>
  )
  if (type === "Delete") return (
    <>
          <div className='body' >
          <Header />
    <div className='CenterMain'>
        <div className='message'>Данные удалены успешно.</div>
    </div>
    </div>
    </>
  )

};
