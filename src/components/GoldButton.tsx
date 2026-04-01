import type { FC } from "react";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { colors } from "../theme";

type GoldButtonVariant = "filled" | "outlined";

interface GoldButtonProps extends Omit<ButtonProps, "variant"> {
  goldVariant?: GoldButtonVariant;
}

const GoldButton: FC<GoldButtonProps> = ({
  goldVariant = "filled",
  sx,
  ...rest
}) => {
  const styles =
    goldVariant === "filled"
      ? {
          bgcolor: colors.goldPrimary,
          color: colors.primaryDarkBlue,
          "&:hover": { bgcolor: colors.goldDark, color: colors.white },
        }
      : {
          border: `1px solid ${colors.goldPrimary}`,
          color: colors.goldPrimary,
          "&:hover": {
            bgcolor: "rgba(200,155,60,0.1)",
            borderColor: colors.goldPrimary,
          },
        };

  return (
    <Button
      variant={goldVariant === "filled" ? "contained" : "outlined"}
      sx={{ ...styles, ...sx }}
      {...rest}
    />
  );
};

export default GoldButton;
