import './App.css';
import jQuery from 'jquery';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './pages/Landing';
import { NAV } from './appConstants';
import Stats from './pages/Stats';
import Teams from './pages/Teams';
import NotFound from './pages/NotFound';

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'http://localhost/nba/getStats.php',
      success: (data) => { setData(data)},
    });
  }, []);

  console.log(data);

  return (
    // <LandingPage/>
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path={NAV.STATS} element={<Stats />}/>
        <Route path={NAV.TEAMS} element={<Teams />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
