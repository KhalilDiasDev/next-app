import axios from "axios";

export const QIAMApi = (token: string, url?: string) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.create({
    baseURL: url || process.env.NEXT_PRIVATE_QIAM_ISSUER,
    ...config,
  });
};

class QIAMService {
  // -----------------------------------------------------
  // gel all user
  static async getAllUsers(token: string, search?: string) {
    const queryString = search ? `?search=${search}` : "";

    return await QIAMApi(token, process.env.NEXT_PRIVATE_QIAM_REALM_URL).get(
      `/users${queryString}`
    );
  }

  // -----------------------------------------------------
  // gel user by id
  static async getUserById(token: string, id?: string) {
    return await QIAMApi(token, process.env.NEXT_PRIVATE_QIAM_REALM_URL).get(
      `/users/${id}`
    );
  }

  // -----------------------------------------------------
  // Update user
  static async updateUser(id: string, body: any, token: string) {
    return await QIAMApi(token).post(`/account`, body);
  }

  // -----------------------------------------------------
  // update password
  // static async updatePassword(uid: any, updateNewPassword: any, token: any) {
  //   return await QIAMApi(token).post(`/account`, {
  //     password: updateNewPassword,
  //   });
  // }
}
export default QIAMService;
