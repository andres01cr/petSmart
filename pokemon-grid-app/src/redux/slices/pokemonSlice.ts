import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getRandomPokemonList,
  getPokemonDetails,
  getGenderSpecies,
} from '@/services/pokemonService';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';

interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: PokemonDetail | null;
  loading: boolean;
  detailLoading: boolean;
  femaleSpecies: string[];
  maleSpecies: string[];
}

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  detailLoading: false,
  femaleSpecies: [],
  maleSpecies: [],
};

export const fetchRandomPokemon = createAsyncThunk('pokemon/fetchRandom', async () => {
  return await getRandomPokemonList(8);
});

export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchDetail',
  async (pokemon: Pokemon, { getState }) => {
    const detail = await getPokemonDetails(
      pokemon.id,
      pokemon.name,
      pokemon.abilities,
      pokemon.image
    );

    const state = getState() as { pokemon: PokemonState };
    const { femaleSpecies, maleSpecies } = state.pokemon;

    const isFemale = femaleSpecies.includes(pokemon.name);
    const isMale = maleSpecies.includes(pokemon.name);

    let gender = 'genderless';
    if (isFemale && isMale) gender = 'both';
    else if (isFemale) gender = 'female';
    else if (isMale) gender = 'male';

    return { ...detail, gender };
  }
);

export const fetchGenderSpecies = createAsyncThunk('pokemon/fetchGenders', async () => {
  return await getGenderSpecies();
});

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
      })
      .addCase(fetchGenderSpecies.fulfilled, (state, action: PayloadAction<{ femaleNames: string[]; maleNames: string[] }>) => {
        state.femaleSpecies = action.payload.femaleNames;
        state.maleSpecies = action.payload.maleNames;
      });
  },
});

export default pokemonSlice.reducer;
