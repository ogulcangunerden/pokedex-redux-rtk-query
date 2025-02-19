import { useParams, Link } from "react-router-dom";
import { useGetPokemonQuery } from "../services/api";

const TYPE_COLORS = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const StatBar = ({ name, value }) => {
  const percentage = (value / 255) * 100;
  const getColor = () => {
    if (value < 50) return "bg-red-500";
    if (value < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {name.replace("-", " ")}
        </span>
        <span className="text-sm font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getColor()}`}
          style={{
            width: `${percentage}%`,
            transition: "width 1s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

const PokemonDetail = () => {
  const { name } = useParams();
  const { data: pokemon, error, isLoading } = useGetPokemonQuery(name);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">
          Error loading Pokémon data!
          <Link to="/" className="block mt-4 text-blue-500 hover:text-blue-700">
            Return to Pokédex
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Pokédex
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold capitalize text-gray-800">
                {pokemon.name}
              </h1>
              <span className="text-2xl font-semibold text-gray-500">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src={pokemon.sprites.front_default}
                alt={`${pokemon.name} front`}
                className="w-full h-32 object-contain"
              />
              <img
                src={pokemon.sprites.back_default}
                alt={`${pokemon.name} back`}
                className="w-full h-32 object-contain"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`${TYPE_COLORS[type]} px-4 py-1 rounded-full text-white capitalize text-sm font-medium`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Base Stats
              </h2>
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <StatBar
                    key={stat.name}
                    name={stat.name}
                    value={stat.value}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Abilities
              </h2>
              <div className="space-y-2">
                {pokemon.abilities.map((ability) => (
                  <div key={ability.name} className="flex items-center gap-2">
                    <span className="capitalize text-gray-700">
                      {ability.name.replace("-", " ")}
                    </span>
                    {ability.is_hidden && (
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Moves
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {pokemon.moves.map((move) => (
                  <span
                    key={move}
                    className="bg-gray-100 px-3 py-1 rounded capitalize"
                  >
                    {move.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <span className="block text-sm">Height</span>
                <span className="font-medium">{pokemon.height / 10} m</span>
              </div>
              <div>
                <span className="block text-sm">Weight</span>
                <span className="font-medium">{pokemon.weight / 10} kg</span>
              </div>
              <div>
                <span className="block text-sm">Base Experience</span>
                <span className="font-medium">{pokemon.base_experience}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
