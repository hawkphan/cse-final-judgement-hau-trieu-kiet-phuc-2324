/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Badge, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NotificationMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Dummy notifications data
  const notifications = [
    { id: 1, type: 'New Message', content: 'You have a new message from John Doe' },
    { id: 2, type: 'Friend Request', content: 'You have a new friend request from Jane Smith' },
    { id: 3, type: 'Mention', content: 'You were mentioned in a post by Alan Johnson' },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <IconButton
          aria-label="show notifications"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <strong>{notification.type}</strong>: {notification.content}
            </MenuItem>
          ))}
        </Menu>
      </AppBar>
    </div>
  );
};

export default NotificationMenu;
