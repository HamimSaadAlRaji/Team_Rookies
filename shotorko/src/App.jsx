
import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Map from './components/Map/Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header></Header>
      <Map></Map>
    </div>
  )
}

export default App
