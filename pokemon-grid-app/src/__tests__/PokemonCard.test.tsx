import { render, screen } from '@testing-library/react';
import PokemonCard from '@/components/PokemonCard';

describe('PokemonCard', () => {
  it('renders the card with the correct name and image', () => {
    render(<PokemonCard name="pikachu" image="/pikachu.png" onClick={() => {}} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/pikachu.png');
  });
});
