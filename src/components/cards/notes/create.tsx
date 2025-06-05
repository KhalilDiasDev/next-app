import { PlusOutlined } from "@ant-design/icons";
import { theme } from "antd";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function CreateNoteCardComponent({ onClick, disabled }: Props) {
  const {
    token: { colorBorder, colorBgContainer },
  } = theme.useToken();
  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        borderColor: colorBorder,
        backgroundColor: colorBgContainer,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
      }}
      className="border border-solid rounded-lg shadow-lg flex flex-col items-center justify-center h-full w-full text-xl"
    >
      New
      <PlusOutlined />
    </div>
  );
}
