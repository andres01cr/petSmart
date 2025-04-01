'use client';

import { Container, Box } from '@mui/material';
import PokemonGrid from '@/components/PokemonGrid';
import Image from 'next/image';

const HomePage = () => {
  return (
    <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ mb: 2, width: '100%' }}>
        <Image
          src="/images/pokemonbanner.jpeg"
          alt="Pokemon Gallery"
          width={1200}
          height={300}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          priority
        />
      </Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg,rgb(117, 162, 231),rgb(187, 148, 50))',
          p: 0,
          borderRadius: 2,
          width: '100%',
        }}
      >
        <PokemonGrid />
      </Box>
    </Container>
  );
};

export default HomePage;