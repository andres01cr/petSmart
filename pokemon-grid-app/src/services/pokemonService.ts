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
  const [genderRes, charRes] = await Promise.allSettled([
    axios.get(`${BASE}/gender/${id}`),
    axios.get(`${BASE}/characteristic/${id}`),
  ]);

  const genderData = genderRes.status === 'fulfilled' ? genderRes.value.data : null;
  const charData = charRes.status === 'fulfilled' ? charRes.value.data : null;

  const genderInfo = genderData?.pokemon_species_details.find(
    (p: any) => p.pokemon_species.name === name
  );
  const gender = genderInfo ? genderData.name : 'unknown';

  const description =
    charData?.descriptions.find((d: any) => d.language.name === 'en')?.description ??
    'Description not available.';

  return {
    name,
    image,
    abilities,
    gender,
    description,
  };
};
