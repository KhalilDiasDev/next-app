import { FloatButton, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useNotificationContext } from "@/context/notification";

export default function CopyButtonComponent({ text }: { text: string }) {
  const { notification } = useNotificationContext();

  // copy code to clipboard
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    notification.success({ message: "Copied to clipboard!" });
  };

  return (
    <Tooltip title="Copy to clipboard">
      <FloatButton
        style={{ transform: "scale(0.7)" }}
        className="text-white m-0"
        onClick={onCopy}
        icon={<CopyOutlined />}
      />
    </Tooltip>
  );
}
