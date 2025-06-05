import PopConfirmButtonComponent from "@/components/buttons/popConfirmButton";
import UserPermissionSelectComponent from "@/components/inputs/userPermissionSelect";
import Icons from "@/data/icons";
import { TableColumnsType } from "antd";
import React from "react";

// columns of users' table
export const usersPermissionsTableColumns = (
  onDelete: (id: string) => Promise<void>,
  onUpdateStatus: (
    id: string,
    permission: keyof PermissionsProps
  ) => Promise<void>,
  permissions?: PermissionsProps
): TableColumnsType<User.TableProps> => {
  return [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Permission Level",
      key: "enabled",
      width: 200,
      render: (record: User.TableProps) => (
        <UserPermissionSelectComponent
          user={record}
          permissions={permissions}
          onUpdate={onUpdateStatus}
        />
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 20,
      render: (record: User.TableProps) => {
        return (
          <PopConfirmButtonComponent
            title="Delete user"
            description="Are you sure you want to delete this user? This action can not be undone."
            onConfirm={onDelete.bind(this, record.id)}
            type="primary"
            danger
            icon={<Icons.Trash size={"20px"} />}
          />
        );
      },
    },
  ];
};
