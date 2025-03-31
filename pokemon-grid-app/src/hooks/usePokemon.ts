import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchRandomPokemon, fetchPokemonDetail } from '@/redux/slices/pokemonSlice';
import type { Pokemon } from '@/types/pokemon';

import { useCallback } from 'react';

export const usePokemon = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const selectedPokemon = useAppSelector((state) => state.pokemon.selectedPokemon);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const detailLoading = useAppSelector((state) => state.pokemon.detailLoading);

  const loadRandomPokemon = useCallback(() => {
    dispatch(fetchRandomPokemon());
  }, [dispatch]);

  const loadPokemonDetail = useCallback((pokemon: Pokemon) => {
    dispatch(fetchPokemonDetail(pokemon));
  }, [dispatch]);

  return {
    pokemons,
    selectedPokemon,
    loading,
    detailLoading,
    loadRandomPokemon,
    loadPokemonDetail,
  };
};
