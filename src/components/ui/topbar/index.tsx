import { signOut, useSession } from "next-auth/react";
import { nextApi } from "@/services";
import formatError from "@/utils/format/formatError";
import { verifyPermissionLevel } from "@/utils/permissions/verifyPermissionLevel";
import { Button } from "antd";

interface TopbarComponentProps {
  userPermission?: PermissionLevels;
}

export default function TopbarComponent({
  userPermission,
}: TopbarComponentProps) {
  const { data: session }: any = useSession();

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

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#080b11",
        borderBottom: "none",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "1.25rem", color: "#333" }}>
        <img src="https://storage.googleapis.com/images.qriarlabs.com/qiam/qiam-mono-white.png" width={"150px"}></img>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "0.95rem", color: "#555" }}>
          {session?.user?.name}
        </span>
        <Button
          onClick={handleLogout}
         className="border-white text-white hover:bg-white/10 hover:border-gray-300"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
