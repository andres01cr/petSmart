'use client';

import { Container, Typography } from '@mui/material';
import PokemonGrid from '@/components/PokemonGrid';

const HomePage = () => {

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
