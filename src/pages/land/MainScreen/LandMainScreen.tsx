import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TerrainIcon from "@mui/icons-material/Terrain";
import MapIcon from "@mui/icons-material/Map";
import GridViewIcon from "@mui/icons-material/GridView";
import { SectionHeader, InfoCard, GoldButton } from "../../../components";

const mockLandItems = [
  { id: 1, title: "Plot A-101", subtitle: "Downtown District", value: "2,400 sqft" },
  { id: 2, title: "Plot B-207", subtitle: "Riverside Zone", value: "3,100 sqft" },
  { id: 3, title: "Plot C-315", subtitle: "Highland Area", value: "1,850 sqft" },
];

const LandMainScreen: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ color: "text.primary" }}>
        Land Overview
      </Typography>

      <SectionHeader
        title="My Land Plots"
        action={
          <GoldButton
            goldVariant="outlined"
            size="small"
            onClick={() => navigate("/land/view-all")}
          >
            View All
          </GoldButton>
        }
      />

      <Stack spacing={2}>
        {mockLandItems.map((item) => (
          <InfoCard
            key={item.id}
            icon={<TerrainIcon />}
            title={item.title}
            subtitle={item.subtitle}
            value={item.value}
          />
        ))}
      </Stack>

      <SectionHeader title="Quick Actions" />
      <Stack direction="row" spacing={2}>
        <GoldButton
          goldVariant="filled"
          startIcon={<MapIcon />}
          fullWidth
        >
          Explore Map
        </GoldButton>
        <GoldButton
          goldVariant="outlined"
          startIcon={<GridViewIcon />}
          fullWidth
        >
          Grid View
        </GoldButton>
      </Stack>
    </Stack>
  );
};

export default LandMainScreen;
