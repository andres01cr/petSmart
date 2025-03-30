'use client';

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import PokemonCard from './PokemonCard';
import { usePokemon } from '@/hooks/usePokemon';
import PokemonDetailModal from './PokemonDetailModal';

const PokemonGrid: React.FC = () => {
  const { pokemons, loadPokemonDetail, selectedPokemon } = usePokemon();
  const [open, setOpen] = useState(false);

  const handleOpen = (name: string) => {
    loadPokemonDetail(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
          <Grid size={{ xs: 2, sm: 4, md: 4 }} key={pokemon.id}>
            <PokemonCard
              name={pokemon.name}
              image={pokemon.image}
              onClick={() => handleOpen(pokemon.name)}
            />
          </Grid>
        ))}
      </Grid>

      <PokemonDetailModal open={open} onClose={handleClose} />
    </>
  );
};

export default PokemonGrid;

