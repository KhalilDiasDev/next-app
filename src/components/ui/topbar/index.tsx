import { useNotificationContext } from "@/context/notification";
import { nextApi } from "@/services";
import formatError from "@/utils/format/formatError";
import { verifyPermissionLevel } from "@/utils/permissions/verifyPermissionLevel";
import { Topbar, TopbarProps } from "@qriar-labs/qore";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface TopbarComponentProps extends Omit<TopbarProps, "user"> {
  userPermission?: PermissionLevels;
}

export default function TopbarComponent({
  userPermission,
  ...props
}: TopbarComponentProps) {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { notification } = useNotificationContext();
  const hasEditPermission = verifyPermissionLevel(
    "editor",
    userPermission || "viewer"
  );

  async function handleLogout() {
    try {
      localStorage.clear();
      const response = await nextApi.post(
        `/api/auth/logout?id_token=${session?.user?.id_token}`
      );
      signOut({ redirect: false });
      window.location.href = response.data.path;
    } catch (error) {
      notification.error({
        message: "Failed to logout",
        description: formatError(error),
      });
    }
  }
//fix verify edit permission
  return (
    <Topbar
      {...props}
      disabled={hasEditPermission}
      breadcrumbs={undefined}
      user={session?.user}
      onSignOut={handleLogout}
     
    />
  );
}
