import { Card, Typography, Dropdown, Tooltip, Checkbox } from "antd";
import React from "react";
import { LoadingHook } from "@/hooks/loading";
import { formatDateTime } from "@/utils/format/formatDateTime";
import Icons from "@/data/icons";

export interface CardComponentProps {
  title: string;
  subtitle: string;
  details?: { title: string; label: string | number }[];
  onClick?: () => Promise<void>;
  disabled?: boolean;
  items?: { key: string; label: string; onClick: () => void }[];
  date?: string;
  dateLabel?: string;
  checked?: boolean;
  showCheckbox?: boolean;
  warning?: {
    display: boolean;
    message: string;
  };
  people?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  }[];
}

export default function CardComponent({
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
  showCheckbox,
  people,
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
      hoverable
      loading={isLoading}
      style={{
        justifyContent: details?.length ? "flex-center" : "center",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className="rounded-xl w-full h-[220px] text-center px-2"
      onClick={disabled ? undefined : handleClick}
      styles={{ body: { height: "100%" } }}
    >
      {showCheckbox && (
        <Checkbox
          checked={checked}
          className="absolute top-5 left-5 cursor-pointer"
        />
      )}

      {items && items.length > 0 && (
        <Dropdown
          menu={{
            items,
            onClick: (e) => {
              e.domEvent.stopPropagation();
            },
            style: { width: "8rem" },
          }}
          trigger={["hover"]}
          placement="bottomLeft"
          className="absolute top-5 right-2 cursor-pointer"
        >
          <div onClick={handleIconClick}>
            <Icons.DotsVertical className="text-xl" />
          </div>
        </Dropdown>
      )}
      <div className="flex flex-col h-full justify-center">
        <div>
          <Tooltip title={title}>
            <Typography className="font-bold text-xl truncate">
              {title}
            </Typography>
          </Tooltip>
          <Tooltip title={subtitle}>
            <Typography className="text-secondary truncate font-bold">
              {subtitle}
            </Typography>
          </Tooltip>

          <div className="text-left my-2">
            {details?.map((item, index) => (
              <Typography key={index} className="text-xs line-clamp-5">
                <strong>{item.title}</strong>: {item.label}
              </Typography>
            ))}
          </div>
        </div>
        {/* {formattedDate && (
          <Typography className="text-[10px] text-right">
            {dateLabel} {formattedDate}
          </Typography>
        )} */}
        <div className="absolute bottom-2 right-2">
          {people?.map((person, index) => (
            <UserAvatarComponent
              key={index}
              user={person}
              size="small"
              tooltip={`${person.name} is editing`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
