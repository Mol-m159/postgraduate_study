import isu_white from './isu_white.png';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import './Header.css';



export default function Header() {
  const [data, setData] = useState(null)
  const [show, setShow] = useState(false);

  const { id } = useParams();
  const userID = +id;

  useEffect(() => {
    fetch('http://localhost:3001/user/' + userID, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(f => setData(f))
  }, [])

  return (
    <header className="App-header">
      <div className="S-header">
        <button className='Buttom-Menu' type='button' onClick={() => setShow(!show)}></button>
        <img src={isu_white} className="App-logo" alt="logo" />
        <a id='headerText' href={"http://localhost:3000/" + userID}>
          <h3>Успеваемость аспирантов ИГУ</h3>
        </a>
        <div className='UserInfo'>
          <b>
            {!data ? "loading..." : (determineRole(data.role) === "Вход не выполнен") ? "" : 
            data.lastname + " " + String(data.firstname).charAt(0).toUpperCase() + ". " + (data.patronymic == null ? "" : String(data.patronymic).charAt(0).toUpperCase() + ".")}
          </b>
          <br></br>
          {!data ? "loading..." : determineRole(data.role)
          }
        </div>
      </div>
      {show && (!data ? viewMenu(0, false) : viewMenu(data.role, data.blocking))}
    </header>
  );

  function viewMenu(role, blocking) {

    let listMenu = [["Личный кабинет", "http://localhost:3000/personal/" + userID]]
    if (!blocking){ 
     switch (role) {
      case 1:
        listMenu.push(["Информация об оценках", "http://localhost:3000/info/1/" + userID])
        break //"Обучающийся"
      case 2:
        listMenu.push(["Информация об оценках", "http://localhost:3000/info/2/" + userID])
        break //"Научный руководитель"
      case 3:
        listMenu.push(["Информация об оценках", "http://localhost:3000/info/3/" + userID])
        break //"Представитель кафедры"
      case 4:
        listMenu.push(["Информация об оценках", "http://localhost:3000/info/4/" + userID])
        listMenu.push(["Администрирование", "http://localhost:3000/admin/" + userID])
        break //"Администратор"
      default:
        listMenu.splice(0)
        break 
        //"Роль не определена"
    }}
    listMenu.push(["Выйти", "http://localhost:3001/exit"])

    const listItems = listMenu.map((lM) =>
      <> <a className='MenuItem' href={lM[1]}>
        <div  >
          {lM[0]}
        </div>
      </a>
      </>
    );

    return (
      <div id="MenuList">
        {listItems}
      </div>
    );
  };


  function determineRole(number) {
     switch (number) {
      case 1:
        return "Обучающийся"
      case 2:
        return "Научный руководитель"
      case 3:
        return "Представитель подразделения"
      case 4:
        return "Администратор"
      default:
        return "Вход не выполнен"
    }
  }
}