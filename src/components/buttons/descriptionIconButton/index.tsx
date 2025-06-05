import { Tooltip, Button } from "antd";
import { FileFilled, FileOutlined } from "@ant-design/icons";

interface Props {
  id: string;
  description: string;
  onClick: () => void;
}

export default function DescriptionIconButtonComponent({ description, onClick }: Props) {
  return (
    <Tooltip title="Edit Description">
      <Button
        className="description-button"
        onClick={onClick}
        size="small"
        type="text"
        style={{ color: description ? "#17d130" : "#eb4034" }}
      >
        {description ? <FileFilled rev="" /> : <FileOutlined rev="" />}
      </Button>
    </Tooltip>
  );
}
