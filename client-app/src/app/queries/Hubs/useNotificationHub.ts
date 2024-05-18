import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Notification, useGetNotifications } from "../Notifications";
import { isEmpty } from "../../shared";

const useNotificationHub = (userId: string) => {
  const url = "http://localhost:5000/notificationHub";

  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  const { notifications, setParams, isFetching } = useGetNotifications();

  useEffect(() => {
    setParams({ pageSize: -1, userId });
  }, [setParams, userId]);

  const [messages, setMessages] = useState<Notification[]>([]);

  console.log(messages, messages);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [url]);

  useEffect(() => {
    if (!isFetching && !isEmpty(notifications)) {
      setMessages(notifications);
    }
  }, [isFetching, notifications]);

  useEffect(() => {
    if (connection) {
      const startConnection = async () => {
        try {
          await connection.start();
          console.log("Connected to SignalR hub");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          connection.on("ReceiveNotification", (message: Notification) => {
            console.log('newMessage', message);
            if (message.receiverId != userId) {
              return;
            }
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        } catch (e) {
          console.log("Connection failed: ", e);
        }
      };

      startConnection();

      connection.onreconnected(() => {
        console.log("Reconnected to SignalR hub");
      });

      connection.onclose(async () => {
        console.log("Connection closed. Reconnecting...");
        await startConnection();
      });

      // Clean up on component unmount
      return () => {
        connection.stop();
      };
    }
  }, [connection, userId]);

  return { connection, messages };
};

export default useNotificationHub;
