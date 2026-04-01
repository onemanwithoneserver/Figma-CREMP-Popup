import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { SectionHeader, InfoCard, GoldButton } from "../../../components";

const mockBuildings = [
  { id: 1, title: "Tower Alpha", subtitle: "Commercial - 14 floors", value: "95%" },
  { id: 2, title: "Residence Nova", subtitle: "Residential - 8 floors", value: "87%" },
  { id: 3, title: "Hub Central", subtitle: "Mixed Use - 6 floors", value: "72%" },
];

const BuildingMainScreen: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ color: "text.primary" }}>
        Buildings
      </Typography>

      <SectionHeader
        title="My Buildings"
        action={
          <GoldButton
            goldVariant="outlined"
            size="small"
            onClick={() => navigate("/all-building/view-all")}
          >
            View All
          </GoldButton>
        }
      />

      <Stack spacing={2}>
        {mockBuildings.map((b) => (
          <InfoCard
            key={b.id}
            icon={<ApartmentIcon />}
            title={b.title}
            subtitle={b.subtitle}
            value={b.value}
          />
        ))}
      </Stack>

      <SectionHeader title="Quick Actions" />
      <Stack direction="row" spacing={2}>
        <GoldButton
          goldVariant="filled"
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
        >
          New Building
        </GoldButton>
        <GoldButton
          goldVariant="outlined"
          startIcon={<ListAltIcon />}
          fullWidth
        >
          Reports
        </GoldButton>
      </Stack>
    </Stack>
  );
};

export default BuildingMainScreen;
