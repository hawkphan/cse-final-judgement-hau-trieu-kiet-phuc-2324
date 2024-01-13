import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  key: string;
  path: string;
  label: string;
}

export const MuiMenuItem = ({ key, path, label }: Props) => {
  return (
    <Button key={key} component={Link} to={path}>
      <Typography sx={{ my: 2, color: "white", display: "block", fontSize: 14 }}>
        {label}
      </Typography>
    </Button>
  );
};
