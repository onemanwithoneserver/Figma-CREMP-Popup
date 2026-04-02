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
  name: 'Office Suite 301',
  location: 'Third Floor • Corner Unit',
  area: 2500,
  tenant: 'Available',
  image: 'https://via.placeholder.com/120x80/1a237e/ffffff?text=Office',
};

const officeUnits: UnitCard[] = [
  {
    id: '1',
    name: 'Office Suite 201',
    location: 'Second Floor',
    area: 1800,
    floor: '2',
    price: '₹1,44,000/mo',
    image: 'https://via.placeholder.com/150x100/283593/ffffff?text=Office+1',
    tag: 'Office',
  },
  {
    id: '2',
    name: 'Office Suite 202',
    location: 'Second Floor',
    area: 1500,
    floor: '2',
    price: '₹1,20,000/mo',
    image: 'https://via.placeholder.com/150x100/3949ab/ffffff?text=Office+2',
    tag: 'Office',
  },
  {
    id: '3',
    name: 'Office Suite 301',
    location: 'Third Floor',
    area: 2200,
    floor: '3',
    price: '₹1,76,000/mo',
    image: 'https://via.placeholder.com/150x100/5e60ce/ffffff?text=Office+3',
    tag: 'Office',
  },
  {
    id: '4',
    name: 'Office Suite 302',
    location: 'Third Floor',
    area: 1950,
    floor: '3',
    price: '₹1,56,000/mo',
    image: 'https://via.placeholder.com/150x100/6f70d4/ffffff?text=Office+4',
    tag: 'Office',
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

const OfficeSpace: React.FC = () => {
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
        {officeUnits.map((unit) => (
          <Grid item xs={6} key={unit.id}>
            <UnitCard unit={unit} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default OfficeSpace;
