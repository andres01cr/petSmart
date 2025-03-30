import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
