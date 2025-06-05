import { capitalize } from "@/utils/format/capitalize";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Modal, Typography } from "antd";
import dot from "dot-object";

interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  permissions?: PermissionLevelsListProps;
}

function PermissionIcon({ hasAccess }: { hasAccess: boolean }) {
  const styles = { fontSize: "1.5em", margin: "0 auto" };
  if (hasAccess)
    return <CheckCircleFilled style={{ color: "green", ...styles }} />;
  return <CloseCircleFilled style={{ color: "red", ...styles }} />;
}

export default function PermissionsModal({
  title,
  open,
  onClose,
  permissions,
}: Props) {
  const permissionsList = Object.keys(dot.dot(permissions?.viewer));
  const permissionsDotObject = dot.dot(permissions);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={`${title} Permission Levels`}
      footer={null}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          fontWeight: "bold",
        }}
      >
        <Typography>Permission</Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            margin: "0.2rem 0",
          }}
        >
          <Typography style={{ margin: "0 auto" }}>Viewer</Typography>
          <Typography style={{ margin: "0 auto" }}>Editor</Typography>
          <Typography style={{ margin: "0 auto" }}>Maintainer</Typography>
        </div>
      </div>
      {permissionsList.map((permission, index) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
          key={index}
        >
          <Typography>
            {permission
              .split(".")
              .at(0)
              ?.split("_")
              .map((item) => capitalize(item))
              .join(" ")}
            : {capitalize(permission.split(".").at(1))}
          </Typography>
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "0.2rem 0",
            }}
          >
            <PermissionIcon
              hasAccess={permissionsDotObject[`viewer.${permission}`]}
            />
            <PermissionIcon
              hasAccess={permissionsDotObject[`editor.${permission}`]}
            />
            <PermissionIcon
              hasAccess={permissionsDotObject[`maintainer.${permission}`]}
            />
          </div>
        </div>
      ))}
    </Modal>
  );
}
