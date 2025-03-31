'use client';

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
  CircularProgress,
  Skeleton,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { usePokemon } from '@/hooks/usePokemon';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<Props> = ({ open, onClose }) => {
  const { selectedPokemon, detailLoading } = usePokemon();
  const imageAvailable = selectedPokemon?.image;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {detailLoading ? 'Loading...' : selectedPokemon?.name ?? 'Not Found'}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {detailLoading || !selectedPokemon ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress size={60} thickness={5} color="primary" />
          </Box>
        ) : (
          <Box textAlign="center" display="flex" flexDirection="column" gap={2}>
            {imageAvailable ? (
              <Box
                component="img"
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                sx={{ width: 150, mx: 'auto' }}
              />
            ) : (
              <>
                <Skeleton variant="rectangular" width={150} height={150} sx={{ mx: 'auto' }} />
                <Alert severity="warning" sx={{ mx: 'auto', width: 'fit-content' }}>
                  Image not available
                </Alert>
              </>
            )}
            <Typography variant="body1">{selectedPokemon.description}</Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              Abilities
            </Typography>
            <List dense>
              {selectedPokemon.abilities.map((a, i) => (
                <ListItem key={i}>• {a}</ListItem>
              ))}
            </List>
            <Typography variant="body2" color="text.secondary">
              Gender: {selectedPokemon.gender}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetailModal;
