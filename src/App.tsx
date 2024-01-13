import {
    Route,
    Routes,
} from 'react-router-dom'
import './App.css'
import {TopPage} from './pages/TopPage.tsx';
import {GachaAction} from './pages/GachaAction.tsx';
import {PokedexPage} from './pages/PokedexPage.tsx';


function App() {

  return (
    <>
      <Routes>
           <Route
               path='/pokemon-silhouette-quiz'
               element={<TopPage />}
           />
          <Route
              path='/pokemon-silhouette-quiz/action'
              element={<GachaAction />}
          />
          <Route
              path='/pokemon-silhouette-quiz/status'
              element={<PokedexPage />}
          />
      </Routes>
    </>
  )
}

export default App
