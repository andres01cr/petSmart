import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface PokemonCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, onClick }) => (
  <Card onClick={onClick}>
    <CardActionArea>
      <CardMedia component="img" image={image} alt={name} />
      <CardContent>
        <Typography variant="h6" align="center">
          {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default PokemonCard;
