import { Dispatch, SetStateAction, useState } from "react";
import { useNotificationContext } from "@/context/notification";
import {  UserAddOutlined } from "@ant-design/icons";
import { Button, Select, Space, Table, Typography } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { UserPemissionsTabFunctions } from "./functions";
import { usersPermissionsTableColumns } from "@/assets/columns/usersPermissions";
import UserAvatarComponent from "@/components/misc/userAvatar";
import { LoadingHook } from "@/hooks/loading";
import { SpinnerComponent } from "@/components/misc/spinner";
import formatError from "@/utils/format/formatError";
import { ModalHook } from "@/hooks/modal";
import PermissionsModal from "./modal";
import { verifyPermissionLevel } from "@/utils/permissions/verifyPermissionLevel";
import PermissionErrorComponent from "@/components/misc/permissionError";
import { useSession } from "next-auth/react";
import Icons from "@/data/icons";

interface props<
  T extends {
    _id?: { $oid?: string };
    permissions?: PermissionsProps;
  }
> {
  data: T | undefined;
  setData: Dispatch<SetStateAction<T>>;
  path: string;
  title: string;
  permissions: PermissionLevelsListProps;
  userPermission: PermissionLevels;
}

export default function UsersPermissionsTabComponent<
  T extends {
    _id?: { $oid?: string };
    permissions?: PermissionsProps;
  }
>({ data, setData, path, title, permissions, userPermission }: props<T>) {
  const { data: session }: any = useSession() as any;
  const [selectedUsers, setSelectedUsers] = useState<ListItemProps[]>([]);
  const { notification } = useNotificationContext();
  const { isLoading, toggleLoading } = LoadingHook(false);
  const idsOnWOrkspace = Object.values(data?.permissions || {}).flat(1);
  const [usersOnWorkspace, setUsersOnWorkspace] = useState<User.Props[]>([]);
  const { isModalOpen, toggleModal } = ModalHook(false);
  const hasEditPermission = verifyPermissionLevel("maintainer", userPermission);

  // function to refetch the request
  const onRefresh = async () => {
    await refetch();
  };

  const { onAdd, onRemove, onUpdatePermission } =
    new UserPemissionsTabFunctions(path, onRefresh, data);

  // getting all forms from workspacebase
  const {
    isFetching,
    data: users,
    refetch: refetch,
  } = useQuery(
    [`get-permissions-users`],
    () =>
      axios
        .get(`/api/users`)
        .then(
          (res) =>
            res.data.data?.filter(
              (user: User.Props) => user.id !== session?.user?.id
            ) as User.Props[]
        ),
    {
      onSuccess: (res) => {
        setUsersOnWorkspace(
          res.filter((user) => idsOnWOrkspace.includes(user.id))
        );
      },
      onError: (error) =>
        notification.error({
          message: `Error fetching users`,
          description: formatError(error),
        }),
    }
  );

  const handleAdd = async () => {
    try {
      toggleLoading(true);
      const idsToAdd = selectedUsers.map((item) => item.value);
      const updatedPermissions = await onAdd(idsToAdd);
      setSelectedUsers([]);
      setUsersOnWorkspace((prev) => [
        ...prev,
        ...(users?.filter((user) => idsToAdd.includes(user.id)) || []),
      ]);
      setData((prev) => ({
        ...prev,
        ...updatedPermissions,
      }));
    } finally {
      toggleLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      toggleLoading(true);
      const updatedPermissions = await onRemove(id);
      setSelectedUsers([]);
      setUsersOnWorkspace((prev) => [...prev.filter((user) => user.id !== id)]);
      setData((prev) => ({
        ...prev,
        ...updatedPermissions,
      }));
    } finally {
      toggleLoading(false);
    }
  };

  const handleUpdateStatus = async (
    id: string,
    permission: keyof PermissionsProps
  ) => {
    try {
      const updatedPermissions = await onUpdatePermission(id, permission);
      setData((prev) => ({
        ...prev,
        ...updatedPermissions,
      }));
    } catch (error) {
      notification.error({
        message: `Unexpected Error updating user permissions`,
        description: formatError(error),
      });
    }
  };

  if (!hasEditPermission) {
    return (
      <PermissionErrorComponent message="The user must have maintainer access to read and edit the users permissions" />
    );
  }

  return (
    <>
      <PermissionsModal
        {...{ title, permissions }}
        open={isModalOpen}
        onClose={() => toggleModal(false)}
      />
      <div className="p-4 pb-16 h-[calc(100vh-var(--navbarHeight)-var(--footerHeight))] overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <Space>
            <Select
              className="w-[200px]"
              value={selectedUsers}
              labelInValue
              optionFilterProp="label"
              mode="multiple"
              placeholder="Select Users"
              onChange={(e) => setSelectedUsers(e)}
              options={users
                ?.filter(
                  (item) =>
                    !selectedUsers
                      .map((item) => item.value)
                      .includes(item.id) && !idsOnWOrkspace.includes(item.id)
                )
                ?.map((item: any) => ({
                  ...item,
                  label: item.username,
                  value: item.id,
                }))}
              allowClear
              optionRender={(item) => (
                <Space>
                  <UserAvatarComponent user={item.data} />
                  {item.label}
                </Space>
              )}
            />
            <Button
              onClick={handleAdd}
              loading={isLoading}
              type="primary"
              icon={<UserAddOutlined />}
            >
              Add User
            </Button>
            <div
              className="flex items-center gap-1 px-2 cursor-pointer"
              onClick={() => toggleModal(true)}
            >
              <Icons.Help className="opacity-50 text-lg" />
              <Typography>Learn more about permissions</Typography>
            </div>
          </Space>
        </div>
        {isFetching ? (
          <div className="flex justify-center items-center h-1/2">
            <SpinnerComponent />
          </div>
        ) : (
          <Table
            loading={isFetching}
            bordered
            columns={usersPermissionsTableColumns(
              handleRemove,
              handleUpdateStatus,
              data?.permissions
            )}
            dataSource={usersOnWorkspace
              ?.sort((a, b) => (a.username > b.username ? 1 : -1))
              ?.map((item: any, index: number) => ({
                ...item,
                key: index,
              }))}
          />
        )}
      </div>
    </>
  );
}
