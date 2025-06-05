import { DeleteFilled } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface DeleteButtonComponentProps {
  onClick?: () => void;
  size?: SizeType;
  title?: string;
  [x: string]: any;
}

export default function DeleteButtonComponent({
  onClick,
  size = "small",
  title = "Delete Item",
  ...rest
}: DeleteButtonComponentProps) {
  return (
    <Tooltip title={title}>
      <Button danger size={size} onClick={onClick} {...rest}>
        <DeleteFilled />
      </Button>
    </Tooltip>
  );
}
