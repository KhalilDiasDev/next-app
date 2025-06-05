import { Badge, Tooltip } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { customTheme } from "@/assets/theme";

const errorColor = customTheme.token.error;

interface BadgeProps {
  condition: boolean;
  offset?: [number, number];
  children: React.ReactNode;
  message: string;
  [x: string]: any;
}

export const WarningBadgeComponent: React.FC<BadgeProps> = ({
  condition,
  offset = [0, 0],
  children,
  message,
  ...rest
}) => {
  return (
  <Badge
      {...rest}
      offset={offset}
      count={
        condition ? (
          //div added so that the offset works according to the values passed to it
          <div>
            <Tooltip title={condition ? message : undefined}>
              <div
                className="text-white rounded-full p-1"
                style={{ backgroundColor: errorColor }}
              >
                <WarningOutlined />
              </div>
            </Tooltip>
          </div>
        ) : undefined
      }
    >
      {children}
    </Badge>
  );
};