import { useState } from 'react';
import FeelingForm from './components/form/FeelingForm.tsx'
import MonsterArea from './components/monsterArea/MonsterArea';
import './App.css'

function App() {
  const [monster, setMonster] = useState<string>('');

  return (
    <div className="App">
      <h1>Adopt a Feeling</h1>
      <main>
        <FeelingForm setMonster={setMonster} />
        <MonsterArea monster={monster} />
      </main>
    </div>
  )
}

export default App