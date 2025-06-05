import { useNotificationContext } from "@/context/notification";
import formatError from "@/utils/format/formatError";
import axios from "axios";

export class UserPemissionsTabFunctions<
  T extends { _id?: { $oid?: string }; permissions?: PermissionsProps }
> {
  workspace?: T = undefined;
  api = axios.create({});
  notification = useNotificationContext().notification;
  onRefresh: () => Promise<void> = async () => undefined;

  constructor(path: string, onRefresh: () => Promise<void>, workspace?: T) {
    this.workspace = workspace;
    this.api = axios.create({
      baseURL: `/api/${path}/${workspace?._id?.$oid}`,
    });
    this.onRefresh = onRefresh;
    this.notification = useNotificationContext().notification;
  }

  // function to display error notification
  onError(message: string, error: any) {
    this.notification.error({
      message: `Error ${message}`,
      description: formatError(error),
    });
  }

  // function to delete an item
  onAdd = async (newPermissions: string[]) => {
    try {
      const body = {
        permissions: {
          ...this.workspace?.permissions,
          viewer: [
            ...(this.workspace?.permissions?.viewer || []),
            ...newPermissions,
          ],
        },
      };
      await this.api.put(`/`, body);
      await this.onRefresh();
      this.notification.success({
        message: `User added to workspace successfully!`,
      });

      return body;
    } catch (error) {
      this.onError("adding user to workspace", error);
    }
  };

  // function to delete an item
  onRemove = async (idToRemove: string) => {
    try {
      const body = {
        permissions: {
          viewer:
            this.workspace?.permissions?.viewer?.filter(
              (id) => id !== idToRemove
            ) || [],
          editor:
            this.workspace?.permissions?.editor?.filter(
              (id) => id !== idToRemove
            ) || [],
          maintainer:
            this.workspace?.permissions?.maintainer?.filter(
              (id) => id !== idToRemove
            ) || [],
        },
      };
      await this.api.put(`/`, body);
      await this.onRefresh();
      this.notification.success({
        message: `User removed from workspace successfully!`,
      });
      return body;
    } catch (error) {
      this.onError("removing user from workspace", error);
    }
  };

  // function to update user status
  onUpdatePermission = async (
    userId: string,
    newPermission: keyof PermissionsProps
  ) => {
    try {
      let body = {
        permissions: {
          viewer:
            this.workspace?.permissions?.viewer?.filter(
              (id) => id !== userId
            ) || [],
          editor:
            this.workspace?.permissions?.editor?.filter(
              (id) => id !== userId
            ) || [],
          maintainer:
            this.workspace?.permissions?.maintainer?.filter(
              (id) => id !== userId
            ) || [],
        },
      };

      // add user to new permission
      body.permissions[newPermission]?.push(userId);

      await this.api.put(`/`, body);
      await this.onRefresh();
      this.notification.success({
        message: `User permissions updated successfully!`,
      });

      return body;
    } catch (error) {
      this.onError("updating user permissions", error);
    }
  };
}
