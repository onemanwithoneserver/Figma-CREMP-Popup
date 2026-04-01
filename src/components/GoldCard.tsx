import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { gradients, borders } from "../theme";

const GoldCard = styled(Card)({
  background: gradients.goldSoftCard,
  border: borders.goldSubtle,
  backdropFilter: "blur(8px)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(200,155,60,0.2)",
  },
});

export default GoldCard;
