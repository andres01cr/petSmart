import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchRandomPokemon, fetchPokemonDetail } from '@/redux/slices/pokemonSlice';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';

export const usePokemon = () => {
  const dispatch = useAppDispatch();
  const pokemons: Pokemon[] = useAppSelector((state) => state.pokemon.pokemons);
  const selectedPokemon: PokemonDetail | null = useAppSelector((state) => state.pokemon.selectedPokemon);
  const loading: boolean = useAppSelector((state) => state.pokemon.loading);

  const loadRandomPokemon = () => {
    dispatch(fetchRandomPokemon());
  };

  const loadPokemonDetail = (name: string) => {
    dispatch(fetchPokemonDetail(name));
  };

  return { pokemons, selectedPokemon, loading, loadRandomPokemon, loadPokemonDetail };
};
