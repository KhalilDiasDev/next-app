import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

interface props {
  isHidden: boolean;
  onClick?: () => void;
  tooltip?: string;
  [x: string]: any;
}

export default function VisibilityButtonComponent({
  isHidden,
  onClick,
  tooltip = "Hide element",
  ...rest
}: props) {
  return (
    <Tooltip title={tooltip}>
      <Button
        size="small"
        className="flex gap-2 items-center"
        onClick={onClick}
        {...rest}
      >
        {isHidden ? <EyeInvisibleOutlined rev="" /> : <EyeOutlined rev="" />}
      </Button>
    </Tooltip>
  );
}
