import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: (limit = 151) => `/pokemon?limit=${limit}`,
      transformResponse: (response) => {
        return response.results.map((pokemon) => ({
          ...pokemon,
          id: pokemon.url.split("/")[6],
        }));
      },
    }),
    getPokemon: builder.query({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response) => ({
        id: response.id,
        name: response.name,
        height: response.height,
        weight: response.weight,
        base_experience: response.base_experience,
        abilities: response.abilities.map((ability) => ({
          name: ability.ability.name,
          is_hidden: ability.is_hidden,
        })),
        sprites: response.sprites,
        stats: response.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        types: response.types.map((type) => type.type.name),
        moves: response.moves.slice(0, 4).map((move) => move.move.name),
      }),
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonQuery } = pokemonApi;
