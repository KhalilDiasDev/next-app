import { Modal, Select, Space } from "antd";
import { useState } from "react";

interface Props {
  user: User.Props;
  permissions?: PermissionsProps;
  onUpdate: (id: string, permission: keyof PermissionsProps) => Promise<void>;
}

const permissionsOptions = [
  { label: "Viewer", value: "viewer" },
  { label: "Editor", value: "editor" },
  // { label: "Maintainer", value: "maintainer" },
];

function findPermissionLevel(userId: string, permissions?: PermissionsProps) {
  for (const [key, value] of Object.entries(permissions || {})) {
    if (value?.includes(userId)) {
      return key as keyof PermissionsProps;
    }
  }
  return "viewer";
}

export default function UserPermissionSelectComponent({ user, permissions, onUpdate }: Props) {
  const [value, setValue] = useState<keyof PermissionsProps>(
    findPermissionLevel(user.id, permissions)
  );
  const [confirmVisible, setConfirmVisible] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const handleChange = (newValue: keyof PermissionsProps) => {
    setValue(newValue);
    setConfirmVisible(true);
  };

  const handleConfirm = async () => {
    setLoading(true); 
    try {
      await onUpdate(user.id, value);
    } finally {
      setLoading(false); 
      setConfirmVisible(false); 
    }
  };

  const handleCancel = () => {
    setConfirmVisible(false);
    setValue(findPermissionLevel(user.id, permissions)); 
  };

  return (
    <Space>
      <Select
        className="w-[200px]"
        placeholder={"Permissions"}
        value={value}
        onChange={handleChange}
        options={permissionsOptions}
      />
      
      <Modal
        title={`Update user permissions`}
        visible={confirmVisible}
        onOk={handleConfirm}
        okText="Yes" 
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <p>{`Are you sure you want to update this user's permissions to ${value}?`} </p>
      </Modal>
    </Space>
  );
}
