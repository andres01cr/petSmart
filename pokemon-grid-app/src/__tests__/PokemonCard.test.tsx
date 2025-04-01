import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from '@/components/PokemonCard';
import '@testing-library/jest-dom';

describe('PokemonCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with name and image', () => {
    render(
      <PokemonCard
        name="pikachu"
        image="https://example.com/pikachu.png"
        onClick={mockOnClick}
      />
    );

    const name = screen.getByText(/pikachu/i);
    const image = screen.getByRole('img', { name: /pikachu/i });

    expect(name).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/pikachu.png');
    expect(image).toHaveAttribute('alt', 'pikachu');
  });

  it('shows skeleton and alert when image is missing', () => {
    render(
      <PokemonCard
        name="missingno"
        image=""
        onClick={mockOnClick}
      />
    );

    const alert = screen.getByText(/image not available/i);
    const skeleton = screen.getByTestId('skeleton');

    expect(alert).toBeInTheDocument();
    expect(skeleton).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(
      <PokemonCard
        name="charmander"
        image="https://example.com/charmander.png"
        onClick={mockOnClick}
      />
    );

    const cardImage = screen.getByRole('img', { name: /charmander/i });
    fireEvent.click(cardImage);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
