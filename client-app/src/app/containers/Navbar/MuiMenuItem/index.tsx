
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

interface Props {
  itemKey: string;
  path: string;
  label: string;
} 

export const MuiMenuItem = ({ itemKey, path, label }: Props) => {
  return (
    <Button key={itemKey} component={Link} to={path}>
      <Typography sx={{ my: 2, color: "white", display: "block", fontSize: 14 }}>
        {label}
      </Typography>
    </Button>
  );
};
