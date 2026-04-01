import type { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TerrainIcon from "@mui/icons-material/Terrain";
import { GoldCard, SectionHeader } from "../../../components";
import { colors } from "../../../theme";

const allPlots = [
  { id: 1, title: "Plot A-101", zone: "Downtown District", area: "2,400 sqft", status: "Owned" },
  { id: 2, title: "Plot B-207", zone: "Riverside Zone", area: "3,100 sqft", status: "Owned" },
  { id: 3, title: "Plot C-315", zone: "Highland Area", area: "1,850 sqft", status: "Leased" },
  { id: 4, title: "Plot D-422", zone: "Central Park", area: "4,200 sqft", status: "Owned" },
  { id: 5, title: "Plot E-518", zone: "Harbor Front", area: "2,750 sqft", status: "Pending" },
  { id: 6, title: "Plot F-609", zone: "Mountain View", area: "5,000 sqft", status: "Owned" },
];

const statusColor: Record<string, string> = {
  Owned: "#4CAF50",
  Leased: colors.goldPrimary,
  Pending: "#FF9800",
};

const LandViewAll: FC = () => (
  <Stack spacing={3}>
    <SectionHeader title="All Land Plots" />
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {allPlots.length} plots total
    </Typography>

    <Grid container spacing={2}>
      {allPlots.map((plot) => (
        <Grid key={plot.id} size={{ xs: 12, sm: 6 }}>
          <GoldCard>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <TerrainIcon sx={{ color: colors.goldPrimary }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {plot.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                {plot.zone}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                <Typography variant="body2" sx={{ color: colors.goldPrimary, fontWeight: 600 }}>
                  {plot.area}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.5,
                    py: 0.25,
                    borderRadius: 1,
                    bgcolor: `${statusColor[plot.status] ?? colors.white}22`,
                    color: statusColor[plot.status] ?? colors.white,
                    fontWeight: 600,
                  }}
                >
                  {plot.status}
                </Typography>
              </Box>
            </CardContent>
          </GoldCard>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default LandViewAll;
