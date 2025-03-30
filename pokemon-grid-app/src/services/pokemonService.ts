import axios from 'axios';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';

export const getRandomPokemonList = async (count: number): Promise<Pokemon[]> => {
  const ids = Array.from({ length: count }, () => Math.floor(Math.random() * 151) + 1); // Gen 1 IDs: 1-151

  const responses = await Promise.allSettled(
    ids.map((id) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    )
  );

  return responses
    .filter((res): res is PromiseFulfilledResult<any> => res.status === 'fulfilled')
    .map((res) => ({
      id: res.value.data.id,
      name: res.value.data.name,
      image: res.value.data.sprites.other['official-artwork'].front_default,
    }));
};

export const getPokemonDetails = async (name: string): Promise<PokemonDetail> => {
  const [res, species] = await Promise.all([
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
  ]);

  return {
    name: res.data.name,
    image: res.data.sprites.other['official-artwork'].front_default,
    abilities: res.data.abilities.map((a: any) => a.ability.name),
    genderRate: species.data.gender_rate,
    description: species.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    )?.flavor_text,
  };
};
