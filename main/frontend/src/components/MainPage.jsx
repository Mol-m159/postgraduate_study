import './MainPage.css';
import Header from './Header/Header';

const MainPage = () => {
  let user;

  return (
    <>
      <div className='body' >
        <Header />

        <div className='CenterMain'>
          <form className='FormEnter' method="post" action={('http://localhost:3001/entranse/check')}>
            <input className='text-field__input' type="text" name="username" placeholder="Логин" required defaultValue={user} /> <br></br>
            <input className='text-field__input' type="password" name="password" placeholder="Пароль" required defaultValue="" /> <br></br>
            <button className='adminActItem' type="submit">Войти</button>
          </form>
          <div className='TextMain'>
          <p>Добро пожаловать на страницу веб-приложения «Успеваемость аспирантов Иркутского государственного университета»!</p>
            <p></p>
            <p>Здесь вы можете получить доступ к актуальной информации об успеваемости аспирантов.</p>
            <p></p>
            <p> Пожалуйста, войдите в систему, чтобы начать работу.</p>
          </div>
        </div>
      </div>

    </>
  )
};


export default MainPage;

