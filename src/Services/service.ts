import axios from "axios";

export const getPokemons = async (offset = 0, limit = 20) => {
  return await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
};
