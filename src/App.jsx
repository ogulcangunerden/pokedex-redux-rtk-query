import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemons from "./pages/Pokemons";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Pokemons />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
