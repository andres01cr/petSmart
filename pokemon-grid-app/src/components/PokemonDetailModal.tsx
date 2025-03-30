'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { usePokemon } from '@/hooks/usePokemon';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<Props> = ({ open, onClose }) => {
  const { selectedPokemon } = usePokemon();

  if (!selectedPokemon) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {selectedPokemon.name}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          gap={2}
        >
          <Box
            component="img"
            src={selectedPokemon.image}
            alt={selectedPokemon.name}
            sx={{ width: 150, height: 150 }}
          />

          <Typography variant="body1" color="text.secondary">
            {selectedPokemon.description}
          </Typography>

          <Box>
            <Typography variant="subtitle1" fontWeight={600} mt={2}>
              Abilities
            </Typography>
            <List dense>
              {selectedPokemon.abilities.map((ability, idx) => (
                <ListItem key={idx} sx={{ pl: 2 }}>
                  - {ability}
                </ListItem>
              ))}
            </List>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Gender Rate: {selectedPokemon.genderRate}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetailModal;
