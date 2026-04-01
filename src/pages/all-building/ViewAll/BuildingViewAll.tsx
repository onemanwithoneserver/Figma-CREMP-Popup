import type { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { GoldCard, SectionHeader } from "../../../components";
import { colors } from "../../../theme";

const allBuildings = [
  { id: 1, title: "Tower Alpha", type: "Commercial", floors: 14, occupancy: 95 },
  { id: 2, title: "Residence Nova", type: "Residential", floors: 8, occupancy: 87 },
  { id: 3, title: "Hub Central", type: "Mixed Use", floors: 6, occupancy: 72 },
  { id: 4, title: "Plaza East", type: "Commercial", floors: 20, occupancy: 91 },
  { id: 5, title: "Sky Lofts", type: "Residential", floors: 12, occupancy: 63 },
  { id: 6, title: "Grand Mall", type: "Retail", floors: 4, occupancy: 100 },
];

const BuildingViewAll: FC = () => (
  <Stack spacing={3}>
    <SectionHeader title="All Buildings" />
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {allBuildings.length} buildings total
    </Typography>

    <Grid container spacing={2}>
      {allBuildings.map((b) => (
        <Grid key={b.id} size={{ xs: 12, sm: 6 }}>
          <GoldCard>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <ApartmentIcon sx={{ color: colors.goldPrimary }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {b.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                {b.type} &middot; {b.floors} floors
              </Typography>
              <Box sx={{ mt: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Occupancy
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.goldPrimary, fontWeight: 700 }}>
                    {b.occupancy}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={b.occupancy}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "rgba(200,155,60,0.1)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                      bgcolor: colors.goldPrimary,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </GoldCard>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default BuildingViewAll;
