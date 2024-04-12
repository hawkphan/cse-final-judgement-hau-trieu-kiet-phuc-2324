import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { Callback } from "../../queries";
import { Button } from "../../shared";

interface Props {
  onCloseNotification: Callback;
  anchorElNotification: HTMLElement;
}

const NotificationMenu = ({
  anchorElNotification,
  onCloseNotification,
}: Props) => {
  const notifications = [
    {
      id: 1,
      type: "New Message",
      content: "You have a new message from John Doe",
      timestamp: "2022-10-25 14:30:00",
      isRead: false,
      relatedId: 123,
    },
    {
      id: 2,
      type: "Friend Request",
      content: "You have a new friend request from Jane Smith",
      timestamp: "2022-10-24 09:45:00",
      isRead: true,
      relatedId: 456,
    },
    {
      id: 3,
      type: "Mention",
      content: "You were mentioned in a post by Alan Johnson",
      timestamp: "2022-10-23 17:15:00",
      isRead: false,
      relatedId: 789,
    },
    {
      id: 4,
      type: "New Notification",
      content: "This is a new notification",
      timestamp: "2022-10-22 12:00:00",
      isRead: false,
      relatedId: 987,
    },
    {
      id: 5,
      type: "Reminder",
      content: "Don't forget to attend the meeting tomorrow",
      timestamp: "2022-10-21 10:00:00",
      isRead: true,
      relatedId: 654,
    },
    {
      id: 6,
      type: "Event Invitation",
      content: "You're invited to the company's annual party",
      timestamp: "2022-10-20 15:30:00",
      isRead: false,
      relatedId: 321,
    },
  ];

  return (
    <Menu
      id="notification-menu"
      anchorEl={anchorElNotification}
      keepMounted
      open={Boolean(anchorElNotification)}
      onClose={onCloseNotification}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Typography variant="h5" component="h5" margin={2}>
          Notifications
        </Typography>
        <MenuItem onClick={onCloseNotification}>
          <Typography variant="body2" color="primary">
            Marks all as read
          </Typography>
        </MenuItem>
      </Box>
      <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={onCloseNotification}
            style={{ opacity: notification.isRead ? "1" : "0.5" }}
          >
            <Avatar
              alt="Avatar"
              src={`https://i.pravatar.cc/40?u=${notification.relatedId}`}
              style={{ marginRight: "15px" }}
            />
            <div>
              <strong>{notification.type}</strong>
              <br />
              <span>{notification.content}</span>
              <br />
              <small>{notification.timestamp}</small>
            </div>
          </MenuItem>
        ))}
      </Box>
      <Box textAlign="center">
        <Button color="primary" onClick={onCloseNotification} isLoading={true}>
          Load more
        </Button>
      </Box>
    </Menu>
  );
};

export default NotificationMenu;
