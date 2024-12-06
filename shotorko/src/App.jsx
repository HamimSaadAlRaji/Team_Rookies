
import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import CrimeMap from './components/CrimeMap/CrimeMap'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Map />
      <div id="crimeMapSection"> {/* Add the id for scroll target */}
        <CrimeMap />
      </div>
    </div>
  );
}

export default App
