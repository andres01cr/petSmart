'use client';

import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import PokemonGrid from '@/components/PokemonGrid';
import { usePokemon } from '@/hooks/usePokemon';

const HomePage = () => {
  const { loadRandomPokemon } = usePokemon();

  useEffect(() => {
    loadRandomPokemon();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Pokemon Gallery
      </Typography>
      <PokemonGrid />
    </Container>
  );
};

export default HomePage;
