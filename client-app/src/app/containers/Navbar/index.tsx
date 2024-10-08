import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KEYS, LABELS } from "./helpers";
import { MuiMenuItem } from "./MuiMenuItem";
import { useStore } from "../../shared/common/stores/store";
import { PATHS } from "../../configs/paths";
import { Logout } from "@mui/icons-material";
import { API_QUERIES, useGetProfileById } from "../../queries";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationMenu from "../NotificationMenu";

function Navbar() {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const [notifinationNumber, setNotificationCationNumber] = React.useState<number>();

  userStore.getUser();

  const { profile } = useGetProfileById({
    id: userStore?.user?.id,
    queryKey: [API_QUERIES.GET_PROFILE_BY_ID, { id: userStore?.user?.id }],
  });

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate(PATHS.login);
    }
  }, [navigate]);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElNotification, setAnchorElNotification] = React.useState(null);

  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateToProfile = () => {
    navigate(PATHS.profile.replace(":id", userStore?.user?.id));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CodeCrafter
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MuiMenuItem
              itemKey={KEYS.problems}
              label={LABELS.problems}
              path={PATHS.problems}
            />
            <MuiMenuItem
              itemKey={KEYS.contests}
              label={LABELS.contests}
              path={PATHS.contests}
            />
            <MuiMenuItem
              itemKey={KEYS.users}
              label={LABELS.users}
              path={PATHS.users}
            />
            {/* <MuiMenuItem
              itemKey={KEYS.dev}
              label={LABELS.dev}
              path={PATHS.dev}
            /> */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              aria-label="show notifications"
              aria-controls="notification-menu"
              aria-haspopup="true"
              onClick={handleClickNotification}
              color="inherit"
              sx={{ marginRight: "20px" }}
            >
              <Badge badgeContent={notifinationNumber} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <NotificationMenu
              anchorElNotification={anchorElNotification}
              onCloseNotification={handleCloseNotification}
              onSetNumber={setNotificationCationNumber}
            />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={
                    profile?.avatar
                      ? "data:image/jpeg;base64," + profile?.avatar
                      : ""
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="menu-profile" onClick={handleNavigateToProfile}>
                <Avatar
                  src={
                    profile?.avatar
                      ? "data:image/jpeg;base64," + profile?.avatar
                      : ""
                  }
                />
                <Typography
                  textAlign="center"
                  component={Box}
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  {profile?.displayName}
                </Typography>
              </MenuItem>
              <MenuItem key="menu-logout" onClick={userStore.logout}>
                <Logout fontSize="small" />
                <Typography
                  textAlign="center"
                  component={Box}
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
