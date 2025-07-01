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

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

 

  return (
    <></>
  );
}
