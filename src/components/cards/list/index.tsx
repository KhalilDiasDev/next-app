import {
  Card,
  Typography,
  Dropdown,
  Row,
  Col,
  Space,
  Skeleton,
  Checkbox,
} from "antd";
import React from "react";
import { LoadingHook } from "@/hooks/loading";
import { formatDateTime } from "@/utils/format/formatDateTime";
import { CardComponentProps } from "..";
import Icons from "@/data/icons";

export default function ListCardComponent({
  title,
  subtitle,
  details,
  onClick,
  disabled = false,
  items,
  date,
  dateLabel = "Created at",
  warning,
  checked,
  showCheckbox = false,
}: CardComponentProps) {
  const formattedDate = date ? formatDateTime(date) : undefined;
  const { isLoading, toggleLoading } = LoadingHook(false);

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClick = async () => {
    toggleLoading(true);
    await onClick?.();
    toggleLoading(false);
  };

  return (
    <Card
      size="small"
      hoverable
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className="rounded-xl w-full px-2"
      onClick={disabled ? undefined : handleClick}
      styles={{ body: { height: "100%" } }}
    >
      {isLoading ? (
        <Skeleton.Input className="w-full" size="small" active />
      ) : (
        <Row gutter={8} className="relative">
          <Col span={6}>
            <Space.Compact>
              {showCheckbox && <Checkbox checked={checked} className="mr-2" />}
              <Typography className="font-bold text-titleText truncate">
                {title}
              </Typography>
            </Space.Compact>
          </Col>
          <Col span={4}>
            <Typography className="text-secondary truncate">
              {subtitle}
            </Typography>
          </Col>

          <Col span={8}>
            {(details?.length || 0) > 1 ? (
              <Space>
                {details?.map((item, index) => (
                  <Typography key={index} className="truncate">
                    <strong>{item.title}</strong>: {item.label}
                  </Typography>
                ))}
              </Space>
            ) : (
              <Typography className="truncate">
                <strong>{details?.[0]?.title}</strong>: {details?.[0]?.label}
              </Typography>
            )}
          </Col>
          <Col span={items && items.length ? 5 : 6}>
            {formattedDate && (
              <Typography className="truncate">
                {dateLabel} {formattedDate}
              </Typography>
            )}
          </Col>
          {items && items.length > 0 && (
            <div className="absolute right-0">
              <Dropdown
                menu={{
                  items,
                  onClick: (e) => {
                    e.domEvent.stopPropagation();
                  },
                  style: { width: "8rem" },
                }}
                trigger={["hover", "click"]}
                placement="bottomLeft"
              >
                <div onClick={handleIconClick}>
                  <Icons.DotsVertical className="text-xl" />
                </div>
              </Dropdown>
            </div>
          )}
        </Row>
      )}
    </Card>
  );
}
