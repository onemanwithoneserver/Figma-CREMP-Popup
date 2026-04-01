import type { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { colors } from "../theme";

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, action }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: colors.goldPrimary,
        fontWeight: 700,
        letterSpacing: "0.03em",
      }}
    >
      {title}
    </Typography>
    {action}
  </Box>
);

export default SectionHeader;
