import { LoadingHook } from "@/hooks/loading";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

interface SaveButtonComponentProps {
  onClick?: () => Promise<void>;
  tooltip?: string;
  label?: string;
  [x: string]: any;
}
export default function SaveButtonComponent({
  onClick,
  tooltip = "Save",
  label,
  ...rest
}: SaveButtonComponentProps) {
  const { isLoading, toggleLoading } = LoadingHook(false);

  async function handleSave() {
    toggleLoading(true);
    if (onClick) await onClick();
    toggleLoading(false);
  }

  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={handleSave}
        loading={isLoading}
        icon={<SaveOutlined />}
        {...rest}
      >
        {label}
      </Button>
    </Tooltip>
  );
}
