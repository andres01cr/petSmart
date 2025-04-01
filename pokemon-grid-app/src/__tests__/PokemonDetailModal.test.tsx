import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonDetailModal from '@/components/PokemonDetailModal';
import '@testing-library/jest-dom';
import { usePokemon } from '@/hooks/usePokemon';

jest.mock('@/hooks/usePokemon', () => ({
  usePokemon: jest.fn(),
}));

const mockedUsePokemon = usePokemon as jest.Mock;

describe('PokemonDetailModal', () => {
  const mockOnClose = jest.fn();

  const defaultPokemon = {
    name: 'bulbasaur',
    image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
    description:
      'bulbasaur is a grass, poison type Pokemon with a height of 0.7m and a weight of 6.9kg. It has a base experience of 64, and is known for its base stats like 45 HP and 49 attack.',
    abilities: ['overgrow', 'chlorophyll'],
    gender: 'male',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when detailLoading is true', () => {
    mockedUsePokemon.mockReturnValue({
      selectedPokemon: null,
      detailLoading: true,
    });

    render(<PokemonDetailModal open={true} onClose={mockOnClose} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays selected Pokemon data when loaded', () => {
    mockedUsePokemon.mockReturnValue({
      selectedPokemon: defaultPokemon,
      detailLoading: false,
    });

    render(<PokemonDetailModal open={true} onClose={mockOnClose} />);

    expect(screen.getByText(/abilities/i)).toBeInTheDocument();
    expect(screen.getByText(/• overgrow/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/base stats like 45 HP and 49 attack/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    mockedUsePokemon.mockReturnValue({
      selectedPokemon: defaultPokemon,
      detailLoading: false,
    });

    render(<PokemonDetailModal open={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render if modal is closed', () => {
    mockedUsePokemon.mockReturnValue({
      selectedPokemon: defaultPokemon,
      detailLoading: false,
    });

    const { queryByText } = render(<PokemonDetailModal open={false} onClose={mockOnClose} />);
    expect(queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });
});
