import React from "react";
import { Tooltip, FloatButton } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNotificationContext } from "@/context/notification";

interface DownloadButtonProps {
  textToDownload: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ textToDownload }) => {
  const { notification } = useNotificationContext();

  const handleDownload = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([textToDownload], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "Logs.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      notification.success({ message: "Logs downloaded successfully" });
    } catch (error) {
      notification.error({ message: "Error downloading logs" });
    }
  };

  return (
    <Tooltip title="Download">
      <FloatButton
        onClick={handleDownload}
        className="text-white m-0"
        style={{ transform: "scale(0.7)" }}
        icon={<SaveOutlined />}
      />
    </Tooltip>
  );
};

export default DownloadButton;
