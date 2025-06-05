import { AxiosResponse } from "axios";
import { api } from ".";
export class NotificationService {
  private static url = `/notifications`;

  /**
   * @name createNotification
   * @function
   * @description creates a new workspace in the database
   * @param data the workspace data
   */
  static createNotification(data: Notification.Props) {
    return api.request({
      url: `${NotificationService.url}`,
      method: "POST",
      data: {
        ...data,
        new: true,
        created_at: Date.now(),
        updated_at: Date.now(),
      },
    });
  }

  /**
   * @name getNotifications
   * @function
   * @description get all notifications by user id
   */
  static getNotifications(
    id: string,
    queryFilter?: string
  ): Promise<AxiosResponse<Notification.Props[]>> {
    const filter = { user_id: id, ...JSON.parse(queryFilter || "{}") };
    return api.request({
      url: `${NotificationService.url}?filter=${JSON.stringify(filter)}`,
      method: "GET",
    });
  }

  // /**
  //  * @name getNotificationById
  //  * @function
  //  * @description get workspace details by id
  //  * @param id the id of the workspace
  //  */
  // static getNotificationById(
  //   id: string
  // ): Promise<AxiosResponse<Notification.Props>> {
  //   return api.request({
  //     url: `${NotificationService.url}/${id}`,
  //     method: "GET",
  //   });
  // }

  /**
   * @name updateNotification
   * @function
   * @description
   * @param isNew true to amrk the notification as new
   */
  static updateNotification(id: string, isNew: boolean) {
    return api.request({
      url: `${NotificationService.url}/${id}`,
      method: "PATCH",
      data: { new: isNew, updated_at: Date.now() },
    });
  }

  /**
   * @name deleteNotificationById
   * @function
   * @description delete the notification by id
   * @param id the id of the workspace
   */
  static deleteNotification(id: string) {
    return api.request({
      url: `${NotificationService.url}/${id}`,
      method: "DELETE",
    });
  }
}
