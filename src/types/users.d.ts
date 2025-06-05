export {};

declare global {
  namespace User {
    interface Props {
      id: string;
      username: string;
      firstName?: string;
      lastName?: string;
      groups?: string[];
      email?: string;
      emailVerified?: boolean;
      enabled?: boolean;
      given_name?: string;
      family_name?: string;
      name: string;
      preferred_username?: string;
    }

    interface TableProps extends Props {
      key: number;
    }
  }
}
