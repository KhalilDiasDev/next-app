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

 
  return (
    <Tooltip title={tooltip}>
    
      
    </Tooltip>
  );
}
