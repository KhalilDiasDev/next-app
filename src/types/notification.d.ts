export {};

declare global {
  namespace Notification {
    interface Props {
      _id: {
        $oid: string;
      };
      user_id: string;
      new: boolean;
      title: string;
      description: string;
      details: GenericObject;
      created_at: number;
      updated_at: number;
    }
  }
}
