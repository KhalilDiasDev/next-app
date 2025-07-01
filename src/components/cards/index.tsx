import { Card, Typography, Dropdown, Tooltip, Checkbox } from "antd";
import React from "react";
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

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };



  return (
   <></>
  );
}
