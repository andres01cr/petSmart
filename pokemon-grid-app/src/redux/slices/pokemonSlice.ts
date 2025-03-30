import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';
import { getPokemonDetails, getRandomPokemonList } from '@/services/pokemonService';

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: PokemonDetail | null;
  loading: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
};

export const fetchRandomPokemon = createAsyncThunk<Pokemon[], void>(
  'pokemon/fetchRandom',
  async () => {
    return await getRandomPokemonList(8);
  }
);

export const fetchPokemonDetail = createAsyncThunk<PokemonDetail, string>(
  'pokemon/fetchDetail',
  async (name: string) => {
    return await getPokemonDetails(name);
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
      .addCase(fetchPokemonDetail.fulfilled, (state, action: PayloadAction<PokemonDetail>) => {
        state.selectedPokemon = action.payload;
      });
  },
});

export default pokemonSlice.reducer;
