import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonDetailModal from '@/components/PokemonDetailModal';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '@/redux/slices/pokemonSlice';
import type { RootState } from '@/redux/store';

const mockState: Partial<RootState> = {
  pokemon: {
    pokemons: [],
    loading: false,
    selectedPokemon: {
      name: 'Pikachu',
      image: '/pikachu.png',
      description: 'A yellow mouse with electric powers.',
      abilities: ['static', 'lightning-rod'],
      genderRate: 4,
    },
  },
};

const renderWithState = (open: boolean = true, onClose = jest.fn()) => {
  const store = configureStore({
    reducer: {
      pokemon: pokemonReducer,
    },
    preloadedState: mockState,
  });

  return render(
    <Provider store={store}>
      <PokemonDetailModal open={open} onClose={onClose} />
    </Provider>
  );
};

describe('PokemonDetailModal', () => {
  it('renders modal with Pokémon details when open', () => {
    renderWithState(true);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/a yellow mouse with electric powers/i)).toBeInTheDocument();
    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
    expect(screen.getByText(/gender rate/i)).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    renderWithState(false);

    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });

  it('calls onClose when close icon is clicked', () => {
    const handleClose = jest.fn();
    renderWithState(true, handleClose);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });
});
