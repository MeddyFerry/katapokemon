import React, { useReducer, useEffect } from "react";
import { PokemonInterface } from "../../interface/interface";
import {
  pokemonReducer,
  initialState,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "../../reducer/pokemon.reducer";

const Pokemon: React.FC = () => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const data = await response.json();
        dispatch(fetchSuccess(data));
      } catch (error) {
        dispatch(fetchFailure(error as Error));
      }
    };

    fetchData();
  }, []);

  const { isFetching, isLoading, error, data } = state;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isFetching ? (
        <div>Fetching data...</div>
      ) : (
        <ul>
          {data.results.map((pokemon: PokemonInterface) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pokemon;
