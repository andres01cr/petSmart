export interface Pokemon {
    name: string;
    image: string;
    id: number;
  }
  
  export interface PokemonDetail {
    name: string;
    image: string;
    abilities: string[];
    genderRate: number;
    description?: string;
  }
  
  export type PokemonDetailType = PokemonDetail;
  