import './App.css';
import jQuery from 'jquery';
import { useEffect, useState } from 'react';

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
    <div className="App">
      <header className="App-header">
        NBA Project
      </header>
    </div>
  );
}

export default App;
