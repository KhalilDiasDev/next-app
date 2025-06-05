import { Button, Modal, Popconfirm, Tooltip } from "antd";
import { LegacyButtonType } from "antd/es/button/button";
import { useState } from "react";

interface props {
  onConfirm?: () => Promise<void>;
  okText?: string;
  okType?: LegacyButtonType;
  children?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  [x: string]: any;
}

/**
 * @name PopConfirmButtonComponent
 * @function
 * @description Button with a popconfirm modal before calling confirm action
 *
 * @param onConfirm function called when the action button is clicked
 * @param children content of button
 * @param title title of the modal
 * @param description description message of the modal
 */
export default function PopConfirmButtonComponent({
  onConfirm,
  children,
  title,
  description,
  okText = "Delete",
  okType = "danger",
  ...rest
}: props) {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onOpen = () => setIsPopOpen(true);
  const onCancel = () => {
    setIsLoading(false);
    setIsPopOpen(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      if (onConfirm) {
        await onConfirm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsPopOpen(false);
    }
  };

  return (
    <Tooltip title={title} className="ml-2">
  
      <Popconfirm
        title={title}
        description={description}
        open={isPopOpen}
        onConfirm={handleConfirm}
        okText={okText}
        okType={okType}
        okButtonProps={{ loading: isLoading }}
        onCancel={onCancel}
      >
        <Button
          type="text"
          className="p-0"
          onClick={onOpen}
          loading={isLoading}
          {...rest}
        >
          {children}
        </Button>
      </Popconfirm>
    </Tooltip>
  );
}
