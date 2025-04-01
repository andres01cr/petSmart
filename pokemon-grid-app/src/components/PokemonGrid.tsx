'use client';

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PokemonCard from './PokemonCard';
import PokemonDetailModal from './PokemonDetailModal';
import { usePokemon } from '@/hooks/usePokemon';

const PokemonGrid: React.FC = () => {
  const { pokemons, loadPokemonDetail, loadRandomPokemon, loading, loadGenderSpecies } = usePokemon();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadRandomPokemon();
    loadGenderSpecies();
  }, []);

  const handleOpen = (pokemonId: number) => {
    const selected = pokemons.find((p) => p.id === pokemonId);
    if (selected) {
      loadPokemonDetail(selected);
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);
  

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4 }, py: 3 }}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress size={60} thickness={5} color="primary" />
        </Box>
      ) : (
        <Grid
          container
          spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }}
          columns={12}
          wrap="wrap"
          justifyContent="center"
        >
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              onClick={() => handleOpen(pokemon.id)}
            />
          ))}
        </Grid>
      )}

      <PokemonDetailModal open={open} onClose={handleClose} />
    </Box>
  );
};

export default PokemonGrid;
