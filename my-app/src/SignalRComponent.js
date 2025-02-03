import React, { useEffect, useState, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  // Use useCallback to prevent function recreation
  const startConnection = useCallback(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7234/bookingHub") // Your SignalR Hub URL
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
        setIsConnected(true);
      })
      .catch((err) => {
        console.error("SignalR Connection Error: ", err);
        setError("Failed to connect to SignalR hub");
      });

    // Handle receiving notifications
    connection.on("BookingSuccess", (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    return connection;
  }, []);

  useEffect(() => {
    const connection = startConnection();

    // Cleanup: Stop the connection when component is unmounted
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [startConnection]);

  return (
    <div>
      <h2>Notifications</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isConnected && !error && <p>Connecting...</p>}
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default SignalRComponent;
