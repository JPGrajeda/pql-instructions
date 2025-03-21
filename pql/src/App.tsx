import './App.css'
import { AppProvider } from './context/appContext/AppProvider'
import Home from './pages/Home'

function App() {

  return (
    <>
      <AppProvider>
        <Home />
      </AppProvider>
    </>
  )
}

export default App
