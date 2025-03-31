import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRandomPokemonList, getPokemonDetails } from '@/services/pokemonService';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';

interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: PokemonDetail | null;
  loading: boolean;
  detailLoading: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  detailLoading: false,
};

export const fetchRandomPokemon = createAsyncThunk('pokemon/fetchRandom', async () => {
  return await getRandomPokemonList(8);
});

export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchDetail',
  async (pokemon: Pokemon) => {
    return await getPokemonDetails(pokemon.id, pokemon.name, pokemon.abilities, pokemon.image);
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomPokemon.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.pokemons = action.payload;
        state.loading = false;
      })
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action: PayloadAction<PokemonDetail>) => {
        state.selectedPokemon = action.payload;
        state.detailLoading = false;
      });
  },
});

export default pokemonSlice.reducer;
