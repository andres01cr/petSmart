import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonGrid from '@/components/PokemonGrid';
import '@testing-library/jest-dom';
import { usePokemon } from '@/hooks/usePokemon';

jest.mock('@/hooks/usePokemon', () => ({
  usePokemon: jest.fn(),
}));

const mockedUsePokemon = usePokemon as jest.Mock;

describe('PokemonGrid', () => {
  const mockLoadRandomPokemon = jest.fn();
  const mockLoadPokemonDetail = jest.fn();
  const mockLoadGenderSpecies = jest.fn();

  const samplePokemons = [
    {
      id: 1,
      name: 'bulbasaur',
      image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
      abilities: ['overgrow', 'chlorophyll'],
    },
    {
      id: 2,
      name: 'charmander',
      image: 'https://img.pokemondb.net/artwork/charmander.jpg',
      abilities: ['blaze', 'solar-power'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading spinner when loading is true', () => {
    mockedUsePokemon.mockReturnValue({
      pokemons: [],
      loadPokemonDetail: mockLoadPokemonDetail,
      loadRandomPokemon: mockLoadRandomPokemon,
      loadGenderSpecies: mockLoadGenderSpecies,
      loading: true,
    });

    render(<PokemonGrid />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders Pokemon cards when loading is false', () => {
    mockedUsePokemon.mockReturnValue({
      pokemons: samplePokemons,
      loadPokemonDetail: mockLoadPokemonDetail,
      loadRandomPokemon: mockLoadRandomPokemon,
      loadGenderSpecies: mockLoadGenderSpecies,
      loading: false,
    });

    render(<PokemonGrid />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it('calls loadPokemonDetail and opens modal on card click', () => {
    mockedUsePokemon.mockReturnValue({
      pokemons: samplePokemons,
      loadPokemonDetail: mockLoadPokemonDetail,
      loadRandomPokemon: mockLoadRandomPokemon,
      loadGenderSpecies: mockLoadGenderSpecies,
      loading: false,
    });

    render(<PokemonGrid />);
    const card = screen.getByText(/bulbasaur/i);
    fireEvent.click(card);

    expect(mockLoadPokemonDetail).toHaveBeenCalledWith(samplePokemons[0]);
  });

  it('calls loadRandomPokemon and loadGenderSpecies on mount', () => {
    mockedUsePokemon.mockReturnValue({
      pokemons: [],
      loadPokemonDetail: mockLoadPokemonDetail,
      loadRandomPokemon: mockLoadRandomPokemon,
      loadGenderSpecies: mockLoadGenderSpecies,
      loading: true,
    });

    render(<PokemonGrid />);
    expect(mockLoadRandomPokemon).toHaveBeenCalledTimes(1);
    expect(mockLoadGenderSpecies).toHaveBeenCalledTimes(1);
  });
});
