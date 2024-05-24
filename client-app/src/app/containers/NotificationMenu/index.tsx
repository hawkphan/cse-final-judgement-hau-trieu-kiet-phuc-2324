import { Avatar, Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Callback, Notification, useGetNotifications } from "../../queries";
import { Button, isEmpty } from "../../shared";
import { useStore } from "../../shared/common/stores/store";
import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

interface Props {
  onCloseNotification: Callback;
  anchorElNotification: HTMLElement;
  onSetNumber: React.Dispatch<React.SetStateAction<number>>;
}

const NotificationMenu = ({
  anchorElNotification,
  onCloseNotification,
  onSetNumber,
}: Props) => {
  const { userStore } = useStore();
  const user = userStore?.user;

  const { notifications, isFetching, setParams } = useGetNotifications();

  const url = "http://localhost:5000/notificationHub";

  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [messages, setMessages] = useState<Notification[]>([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [url]);

  useEffect(() => {
    setParams({ userId: user?.id, pageSize: -1 });
  }, [setParams, user?.id]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");

          connection.on("ReceiveNotification", (message: Notification) => {
            if (message.receiverId != user.id) {
              return;
            }
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection, user?.id]);

  useEffect(() => {
    if (!isEmpty(notifications)) {
      setMessages(notifications);
      onSetNumber(notifications.length);
    }
  }, [notifications, onSetNumber]);

  if (isFetching) {
    return <></>;
  }

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
        {messages?.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={onCloseNotification}
            style={{ opacity: notification.status == 0 ? "1" : "0.5" }}
          >
            <Avatar
              alt="Avatar"
              src={
                notification?.sender?.avatar
                  ? "data:image/jpeg;base64," + notification?.sender?.avatar
                  : ""
              }
              style={{ marginRight: "15px" }}
            />
            <div>
              {/* <strong>{notification.type}</strong>
              <br /> */}
              <span>{notification.content}</span>
              <br />
              <small>{notification.timestamp}</small>
            </div>
          </MenuItem>
        ))}
        <MenuItem>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button
              color="primary"
              onClick={onCloseNotification}
              isLoading={true}
            >
              Load more
            </Button>
          </Stack>
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default NotificationMenu;
