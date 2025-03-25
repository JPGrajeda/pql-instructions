import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/appContext/AppProvider'
import Home from './pages/Player'
import { RouterProvider } from 'react-router';
import { router } from './routes';

function App() {

  return (
    <>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </>
  )
}

export default App
