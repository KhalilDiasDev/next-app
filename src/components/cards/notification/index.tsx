import { nextApi } from "@/services";
import { Badge, Card, Space, Typography } from "antd";
import { useState } from "react";

interface NotificationCardProps {
  item: Notification.Props;
}

export default function HeaderNotificationCardComponent({
  item,
}: NotificationCardProps) {
  const [isNew, setIsNew] = useState(item.new);

  const onView = async () => {
    setIsNew(false);
    await nextApi.put(`/api/notifications/${item._id.$oid}`, { new: false });
  };

  return (
    <Card
      onClick={isNew ? onView : undefined}
      style={{
        cursor: "pointer",
        width: "100vw",
        maxWidth: "28rem",
        opacity: isNew ? 1 : 0.75,
      }}
    >
      <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
        <div
          style={{
            fontSize: "1rem",
            opacity: isNew ? 1 : 0.5,
          }}
        >
          <Badge dot={isNew}>
            <div></div>
          </Badge>
        </div>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <Typography.Text
              ellipsis
              style={{
                fontWeight: isNew ? "bold" : "normal",
              }}
            >
              {item.title}
            </Typography.Text>
            <Typography style={{ fontSize: "11px" }}>
              {new Date(item.created_at).toLocaleString()}
            </Typography>
          </div>
          <Typography style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>
            {item.description}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
