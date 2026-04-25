import FeelingForm from './components/form/FeelingForm.tsx'
import MonsterArea from './components/monsterArea/MonsterArea';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Adopt a Feeling</h1>
      <main>
        <FeelingForm />
        <MonsterArea />
      </main>
    </div>
  )
}

export default App