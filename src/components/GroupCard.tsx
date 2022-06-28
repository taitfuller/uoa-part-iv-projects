import { Paper, styled } from "@mui/material";

const GroupCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  rowGap: theme.spacing(2),
}));

export default GroupCard;
