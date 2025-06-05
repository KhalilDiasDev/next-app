import Icons from "@/data/icons";
import { Card, Tooltip, Typography } from "antd";

export default function CreateCardComponent({
  onClick,
  text,
  disabled,
}: {
  onClick?: () => void;
  text?: string;
  disabled?: boolean;
}) {
  return (
    <Tooltip title={disabled ? `You have reached the limit` : undefined}>
      <Card
        onClick={disabled ? undefined : onClick}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          border: "none",
        }}
        hoverable={!disabled}
        className={`flex items-center justify-center rounded-xl w-[250px] h-[200px]`}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <Typography>New {text}</Typography>
          <Icons.Plus />
        </div>
      </Card>
    </Tooltip>
  );
}
