import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

interface AddItemButtonComponentProps {
  onClick: () => void;
  tooltip?: string;
  label?: string;
  [x: string]: any;
}
export default function AddItemButtonComponent({
  onClick,
  tooltip = "Add New Item",
  label = "Add New Item",
  ...rest
}: AddItemButtonComponentProps) {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={onClick}
        className="w-full"
        icon={<PlusOutlined />}
        {...rest}
      >
        {label}
      </Button>
    </Tooltip>
  );
}
