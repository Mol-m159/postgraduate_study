import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalAccount from './components/PersonalAccount';
import InfoPage from './components/InfoPage';
import MainPage from './components/MainPage';
import AdminPage from './components/AdminPage';
import DBcallback from './components/AdminPages/DBcallback';
import SuccessfulRegistration from './components/AdminPages/SuccessfulRegistration';
import SuccessfulChange from './components/AdminPages/SuccessfulChange'

function App() {
  return (<div>
    <title>Успеваемость аспирантов ИГУ</title>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<MainPage />} />
        <Route path="personal/:id" element={<PersonalAccount />} />
        <Route path="info/:role/:id" element={<InfoPage />} />
        <Route path="admin/:id" element={<AdminPage />} />
        <Route path="callback/:id/:type" element={<DBcallback />} />
        <Route path="change/:id/:type" element={<SuccessfulChange />} />
        <Route path="successfulRegistration/:id/:type" element={<SuccessfulRegistration />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
