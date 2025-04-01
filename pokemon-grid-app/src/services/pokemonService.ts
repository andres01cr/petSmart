import axios from 'axios';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';

const BASE = 'https://pokeapi.co/api/v2';

export const getRandomPokemonList = async (count: number): Promise<Pokemon[]> => {
  const uniqueIds = new Set<number>();
  while (uniqueIds.size < count) {
    uniqueIds.add(Math.floor(Math.random() * 151) + 1);
  }

  const detailResponses = await Promise.allSettled(
    Array.from(uniqueIds).map((id) => axios.get(`${BASE}/pokemon/${id}`))
  );

  return detailResponses
    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
    .map((r) => {
      const data = r.value.data;
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default || '',
        abilities: data.abilities.map((a: any) => a.ability.name),
      };
    });
};

export const getPokemonDetails = async (
  id: number,
  name: string,
  abilities: string[],
  image: string
): Promise<PokemonDetail> => {
  const response = await axios.get(`${BASE}/pokemon/${id}`);
  const data = response.data;

  const types = data.types.map((t: any) => t.type.name).join(', ');
  const height = data.height / 10;
  const weight = data.weight / 10;
  const baseExperience = data.base_experience;

  const stats = data.stats.reduce((acc: any, stat: any) => {
    acc[stat.stat.name] = stat.base_stat;
    return acc;
  }, {});

  const description = `${name} is a ${types} type Pokemon with a height of ${height}m and a weight of ${weight}kg. It has a base experience of ${baseExperience}, and is known for its base stats like ${stats.hp} HP and ${stats.attack} attack.`;

  return {
    name,
    image,
    abilities,
    gender: '-1',
    description,
  };
};

export const getGenderSpecies = async () => {
  const [femaleRes, maleRes] = await Promise.all([
    axios.get(`${BASE}/gender/1`),
    axios.get(`${BASE}/gender/2`),
  ]);

  const femaleNames = femaleRes.data.pokemon_species_details.map(
    (p: any) => p.pokemon_species.name
  );

  const maleNames = maleRes.data.pokemon_species_details.map(
    (p: any) => p.pokemon_species.name
  );

  return { femaleNames, maleNames };
};
