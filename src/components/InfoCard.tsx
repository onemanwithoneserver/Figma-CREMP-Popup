import type { FC, ReactNode } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GoldCard from "./GoldCard";
import { colors } from "../theme";

interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  value?: string | number;
  onClick?: () => void;
}

const InfoCard: FC<InfoCardProps> = ({ icon, title, subtitle, value, onClick }) => (
  <GoldCard
    sx={{ cursor: onClick ? "pointer" : "default" }}
    onClick={onClick}
  >
    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
      {icon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "50%",
            bgcolor: "rgba(200,155,60,0.15)",
            color: colors.goldPrimary,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: colors.white }}
          noWrap
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {subtitle}
          </Typography>
        )}
      </Box>
      {value !== undefined && (
        <Typography
          variant="h6"
          sx={{ color: colors.goldPrimary, fontWeight: 700, flexShrink: 0 }}
        >
          {value}
        </Typography>
      )}
    </CardContent>
  </GoldCard>
);

export default InfoCard;
