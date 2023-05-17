import React, { useEffect, useState } from 'react'

function NotificationPage({ socket }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(async () => {
    await socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
        const displayNotification = ({ senderName, type }) => {
          let action;

          if (type === 1) {
            action = "liked";
          } else if (type === 2) {
            action = "commented";
          } else {
            action = "shared";
          }
          return (
            <span className="notification">{`${senderName} ${action} your post.`}</span>
          );
        };
    return (
      <div style={{ margin: "15%" }}>
        {notifications?.map((n) => displayNotification(n))}
      </div>
    );
}

export default NotificationPage