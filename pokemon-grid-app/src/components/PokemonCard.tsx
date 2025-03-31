import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Box,
  Alert,
} from '@mui/material';

interface PokemonCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, onClick }) => {
  const isImageAvailable = !!image;

  return (
    <Card onClick={onClick} sx={{ width: 160, m: 1 }}>
      <CardActionArea>
        {isImageAvailable ? (
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{ height: 140, objectFit: 'contain' }}
          />
        ) : (
          <Box sx={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton variant="rectangular" width={100} height={100} />
          </Box>
        )}
        <CardContent>
          <Typography variant="h6" align="center" sx={{ textTransform: 'capitalize' }}>
            {name}
          </Typography>
          {!isImageAvailable && (
            <Alert severity="warning" sx={{ mt: 1, fontSize: '0.8rem' }}>
              Image not available
            </Alert>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
