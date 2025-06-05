import { handleShortcuts } from "@/utils/nodeShortcuts";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState, useRef } from "react";

interface Props {
  id: string;
  onChange: (field: string, value: string) => void;
  onDelete: () => void;
  disabled?: boolean;
  colors: string[];
  children: React.ReactNode;
}

export default function ExtraNoteWrapper({
  id,
  onChange,
  onDelete,
  disabled,
  children,
  colors,
}: Props) {
  const [focus, setFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    if (!disabled) setFocus(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setFocus(false);
    }
  };

  const shortcuts = {
    internal: {
      Backspace: () => onDelete(),
      Delete: () => onDelete(),
    },
  };

  return (
    <div
      ref={containerRef}
      id={`${id}-wrapper`}
      onClick={handleFocus}
      onKeyDown={(event) => handleShortcuts(shortcuts, id, event)}
      onBlur={handleBlur}
      tabIndex={0}
      className="flex items-center h-full w-full justify-center relative"
    >
      {focus && (
        <div>
          <Button.Group className="absolute left-[50%] -top-12 -translate-x-[50%] scale-75 shadow-md rounded-md">
            {colors.map((preColor) => (
              <Button
                key={preColor}
                style={{ backgroundColor: preColor }}
                onClick={() => onChange("color", preColor)}
              />
            ))}
            <Tooltip title="Delete">
              <Button onClick={onDelete} icon={<DeleteOutlined />} />
            </Tooltip>
          </Button.Group>
        </div>
      )}
      {children}
    </div>
  );
}
