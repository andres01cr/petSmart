export interface Pokemon {
  id: number;
  name: string;
  image: string;
  abilities: string[];
}

export interface PokemonDetail {
  name: string;
  image: string;
  abilities: string[];
  gender: string;
  description?: string;
}
