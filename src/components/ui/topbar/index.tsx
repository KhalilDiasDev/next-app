import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { nextApi } from "@/services";
import formatError from "@/utils/format/formatError";
import { verifyPermissionLevel } from "@/utils/permissions/verifyPermissionLevel";

interface TopbarComponentProps {
  userPermission?: PermissionLevels;
}

export default function TopbarComponent({
  userPermission,
}: TopbarComponentProps) {
  const { data: session }: any = useSession();
  const router = useRouter();

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
      console.error("Failed to logout:", formatError(error));
    }
  }

  // Você pode adicionar aqui algum botão ou estrutura de UI própria,
  // já que o Topbar foi removido.
  return (
    <div>
      <p>User: {session?.user?.name}</p>
      <button onClick={handleLogout} disabled={hasEditPermission}>
        Logout
      </button>
    </div>
  );
}
