import { AxiosResponse } from "axios";
import { api } from ".";
export class WorkspaceService {
  private static url = `/workspaces`;

  /**
   * @name createWorkspace
   * @function
   * @description creates a new workspace in the database
   * @param data the workspace data
   */
  static createWorkspace(data: Workspace.Props) {
    return api.request({
      url: `${WorkspaceService.url}`,
      method: "POST",
      data,
    });
  }

  /**
   * @name getWorkspaces
   * @function
   * @description get all available workspaces in the database, can be filtered by User ID
   */
  static getWorkspaces(
    id?: string,
    extraFilter?: string
  ): Promise<AxiosResponse<Workspace.Props[]>> {
    let filter = JSON.parse(extraFilter || "{}");

    if (id) {
      filter.$or = [
        { user_id: id },
        { "permissions.viewer": { $in: [id] } },
        { "permissions.editor": { $in: [id] } },
        { "permissions.maintainer": { $in: [id] } },
      ];
    }

    let filterString = Object.keys(filter).length
      ? `?filter=${JSON.stringify(filter)}`
      : "";
    return api.request({
      url: `${WorkspaceService.url}${filterString}`,
      method: "GET",
    });
  }

  /**
   * @name getWorkspaceById
   * @function
   * @description get workspace details by id
   * @param id the id of the workspace
   */
  static getWorkspaceById(id: string) {
    return api
      .request({
        url: `${WorkspaceService.url}/${id}`,
        method: "GET",
      })
      .then((res) => res.data as Workspace.Props);
  }

  /**
   * @name editWorkspace
   * @function
   * @description
   * @param data
   */
  static editWorkspace(id: string, data: any) {
    return api.request({
      url: `${WorkspaceService.url}/${id}`,
      method: "PATCH",
      data,
    });
  }

  /**
   * @name deleteWorkspaceById
   * @function
   * @description delete the workspace by id
   * @param id the id of the workspace
   */
  static deleteWorkspace(id: string) {
    return api.request({
      url: `${WorkspaceService.url}/${id}`,
      method: "DELETE",
    });
  }
}
