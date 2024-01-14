import {
    Route,
    Routes,
} from 'react-router-dom'
import './App.css'
import {TopPage} from './pages/TopPage.tsx';
import {PokedexPage} from './pages/PokedexPage.tsx';
import {SilhouetteQuizPage} from './pages/SilhouetteQuizPage.tsx';


function App() {

  return (
    <>
      <Routes>
           <Route
               path='/pokemon-silhouette-quiz'
               element={<TopPage />}
           />
          <Route
              path='/pokemon-silhouette-quiz/quiz'
              element={<SilhouetteQuizPage />}
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
