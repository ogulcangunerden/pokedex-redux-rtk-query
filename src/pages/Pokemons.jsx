import { useGetPokemonsQuery } from "../services/api";
import { Link } from "react-router-dom";

function Pokemons() {
  const { data, error, isLoading } = useGetPokemonsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading Pokémon data!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Pokédex
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((pokemon) => (
          <Link
            key={pokemon.name}
            to={`/pokemon/${pokemon.name}`}
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {pokemon.name}
                </h2>
                <p className="text-gray-600">
                  #{String(pokemon.id).padStart(3, "0")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Pokemons;
