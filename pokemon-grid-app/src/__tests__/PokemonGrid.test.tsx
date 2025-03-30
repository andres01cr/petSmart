import { render, screen } from '@testing-library/react';
import PokemonGrid from '@/components/PokemonGrid';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { fetchRandomPokemon } from '@/redux/slices/pokemonSlice';

describe('PokemonGrid', () => {
  it('renders a grid of pokemon cards', async () => {
    await store.dispatch(fetchRandomPokemon());
    render(
      <Provider store={store}>
        <PokemonGrid />
      </Provider>
    );
    const pokemonImages = await screen.findAllByRole('img');
    expect(pokemonImages.length).toBeGreaterThan(0);
  });
});
