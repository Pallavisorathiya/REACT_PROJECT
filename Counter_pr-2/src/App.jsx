import { useState } from 'react'
import './App.css'
import Counter from './Components/Counter.jsx'
// import './Components/counter.css'

function App() {
  const [Count, setCount] = useState(0)

  return (
    <div>
  <Counter/>
  </div>
   
  )
}

export default App
