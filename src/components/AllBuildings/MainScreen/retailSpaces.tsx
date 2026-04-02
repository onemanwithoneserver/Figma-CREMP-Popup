import React from 'react';
import { Box, Typography, Grid, Paper, Stack, Button } from '@mui/material';

interface UnitCard {
  id: string;
  name: string;
  location: string;
  area: number;
  floor: string;
  price: string;
  image: string;
  tag: string;
}

const highlightUnit = {
  name: 'Retail Unit A105',
  location: 'Ground Floor • Main Entrance',
  area: 1250,
  tenant: 'Available',
  image: 'https://via.placeholder.com/120x80/1a237e/ffffff?text=Retail',
};

const retailUnits: UnitCard[] = [
  {
    id: '1',
    name: 'Retail Unit A101',
    location: 'Ground Floor',
    area: 850,
    floor: 'G',
    price: '₹85,000/mo',
    image: 'https://via.placeholder.com/150x100/283593/ffffff?text=Unit+1',
    tag: 'Retail',
  },
  {
    id: '2',
    name: 'Retail Unit A102',
    location: 'Ground Floor',
    area: 920,
    floor: 'G',
    price: '₹92,000/mo',
    image: 'https://via.placeholder.com/150x100/3949ab/ffffff?text=Unit+2',
    tag: 'Retail',
  },
  {
    id: '3',
    name: 'Retail Unit B201',
    location: 'First Floor',
    area: 1100,
    floor: '1',
    price: '₹99,000/mo',
    image: 'https://via.placeholder.com/150x100/5e60ce/ffffff?text=Unit+3',
    tag: 'Retail',
  },
  {
    id: '4',
    name: 'Retail Unit B202',
    location: 'First Floor',
    area: 780,
    floor: '1',
    price: '₹70,000/mo',
    image: 'https://via.placeholder.com/150x100/6f70d4/ffffff?text=Unit+4',
    tag: 'Retail',
  },
];

const UnitCard: React.FC<{ unit: UnitCard }> = ({ unit }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={unit.image}
          alt={unit.name}
          sx={{ width: '100%', height: 100, objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: 'rgba(26, 35, 126, 0.9)',
            color: '#FFFFFF',
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" fontWeight="600">
            {unit.tag}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Typography variant="body2" fontWeight="600" noWrap>
          {unit.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Floor {unit.floor} • {unit.area} sqft
        </Typography>
        <Typography variant="body2" fontWeight="bold" color="primary" sx={{ mt: 0.5 }}>
          {unit.price}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            mt: 1,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: 12,
          }}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );
};

const RetailSpaces: React.FC = () => {
  return (
    <Stack spacing={2}>
      {/* Highlight Card */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          backgroundColor: '#f8f9ff',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight="600" gutterBottom>
              {highlightUnit.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {highlightUnit.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {highlightUnit.area} sqft
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                mt: 1,
                px: 1.5,
                py: 0.5,
                backgroundColor: '#4caf50',
                borderRadius: 1,
              }}
            >
              <Typography variant="caption" fontWeight="600" sx={{ color: '#FFFFFF' }}>
                {highlightUnit.tenant}
              </Typography>
            </Box>
          </Box>
          <Box
            component="img"
            src={highlightUnit.image}
            alt="Highlight Unit"
            sx={{
              width: 120,
              height: 80,
              borderRadius: 1,
              objectFit: 'cover',
            }}
          />
        </Stack>
      </Paper>

      {/* Units Grid */}
      <Grid container spacing={1.5}>
        {retailUnits.map((unit) => (
          <Grid item xs={6} key={unit.id}>
            <UnitCard unit={unit} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default RetailSpaces;
