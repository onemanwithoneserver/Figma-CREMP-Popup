import type { FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TerrainIcon from "@mui/icons-material/Terrain";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { colors, gradients, borders } from "../theme";

const navItems = [
  { label: "Land", icon: <TerrainIcon />, path: "/land" },
  { label: "All Building", icon: <ApartmentIcon />, path: "/all-building" },
] as const;

const OutfitLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = navItems.findIndex((item) =>
    location.pathname.startsWith(item.path),
  );

  const isSubPage =
    location.pathname.includes("/view-all") ||
    location.pathname.split("/").filter(Boolean).length > 2;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: 430,
        mx: "auto",
        background: gradients.mainBackground,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          borderBottom: borders.goldSubtle,
          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar>
          {isSubPage && (
            <IconButton
              edge="start"
              sx={{ color: colors.goldPrimary, mr: 1 }}
              onClick={() => navigate(-1)}
              aria-label="go back"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              color: colors.goldPrimary,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            CREMP
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflow: "auto", px: 2, py: 3 }}>
        <Outlet />
      </Box>

      <BottomNavigation
        value={activeTab === -1 ? 0 : activeTab}
        onChange={(_, newValue) => navigate(navItems[newValue].path)}
        sx={{
          bgcolor: "rgba(28,42,68,0.95)",
          borderTop: borders.goldSubtle,
          backdropFilter: "blur(12px)",
          "& .Mui-selected": {
            color: `${colors.goldPrimary} !important`,
          },
          "& .MuiBottomNavigationAction-root": {
            color: "rgba(255,255,255,0.5)",
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default OutfitLayout;
