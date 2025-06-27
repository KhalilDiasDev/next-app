import TopbarComponent from "@/components/ui/topbar";
import {
  Modal,
  message,
  Button,
  Input,
  Card,
  Avatar,
  Badge,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  SecurityScanOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  username: string;
  email: string;
  status?: "active" | "inactive";
  lastLogin?: string;
  role?: string;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  disabledUsers: number;
  systemStatus: "Secure" | "Warning" | "Critical";
}

export default function UserControlPanel() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    disabledUsers: 0,
    systemStatus: "Secure",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { data: session } = useSession();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      const userData = Array.isArray(data.data) ? data.data : [];
  
      const currentUserId = session?.user?.id;
      const filtered = currentUserId
        ? userData.filter((u: User) => u.id !== currentUserId)
        : userData;
  
      setUsers(filtered);
      setStats((prev) => ({
        ...prev,
        totalUsers: filtered.length,
        activeUsers: filtered.filter((u: { status: string; }) => u.status === "active").length,
        disabledUsers: filtered.filter((u: { status: string; }) => u.status === "inactive").length,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Error loading users");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.email) {
      message.warning("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        setNewUser({ username: "", email: "", role: "user" });
        await fetchUsers();
        setIsCreateModalVisible(false);
        message.success("User created successfully!");
      } else {
        const errorData = await res.json();
        message.error(errorData.message || "Error creating user");
      }
    } catch (error) {
      console.error(error);
      message.error("Error creating user");
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;

    try {
      const updatePayload = {
        id: editingUser.id,
        username: editingUser.username,
        email: editingUser.email,
        enabled: editingUser.status === "active",
      };

      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log("User updated:", responseData);

        await fetchUsers(); // Reload users list
        setIsEditModalVisible(false);
        setEditingUser(null);
        message.success("User updated successfully!");
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        message.error(errorData.error || "Error updating user");
      }
    } catch (error) {
      console.error("Error in handleEditUser:", error);
      message.error("Error updating user");
    }
  };
  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (res.ok) {
        await fetchUsers();
        message.success("User deleted successfully!");
      } else {
        const errorText = await res.text();
        console.error("Error deleting user:", res.status, errorText);
        message.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error in handleDeleteUser:", error);
      message.error("Error deleting user");
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser({ ...user });
    setIsEditModalVisible(true);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "#52c41a";
      case "inactive":
        return "#faad14";
      default:
        return "#d9d9d9";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      default:
        return "Undefined";
    }
  };

  return (
    <>
      <TopbarComponent />

      <main className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <SecurityScanOutlined className="text-blue-400" />
            User Control Panel
          </h1>
          <p className="text-slate-400 text-lg">
            Manage users and monitor system security
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <div className="text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <UserOutlined className="text-4xl text-blue-200" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <div className="text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold">{stats.activeUsers}</p>
                </div>
                <div className="text-4xl text-green-200" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0">
            <div className="text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Disabled Users
                  </p>
                  <p className="text-3xl font-bold">{stats.disabledUsers}</p>
                </div>
                <UserOutlined className="text-4xl text-orange-200" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 border-0">
            <div className="text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    System Status
                  </p>
                  <p className="text-xl font-bold flex items-center gap-2">
                    {stats.systemStatus}
                    <div className="animate-pulse w-3 h-3 bg-emerald-200 rounded-full"></div>
                  </p>
                </div>
                <div className="text-4xl text-emerald-200" />
              </div>
            </div>
          </Card>
        </div>

        {/* Users Section */}
        <Card
          className="bg-slate-800 border-slate-700"
          title={
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <UserOutlined />
                User Management
              </h2>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsCreateModalVisible(true)}
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                size="large"
              >
                New User
              </Button>
            </div>
          }
          headStyle={{
            backgroundColor: "rgb(30 41 59)",
            borderBottom: "1px solid rgb(51 65 85)",
          }}
          bodyStyle={{ backgroundColor: "rgb(30 41 59)" }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="relative inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-blue-500"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-400 animate-pulse"></div>
              </div>
              <p className="text-slate-400 mt-6 text-lg animate-pulse"></p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className="bg-slate-700 border-slate-600 hover:border-blue-500 transition-all duration-300"
                  bodyStyle={{ padding: "16px" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size={48}
                        icon={<UserOutlined />}
                        className="bg-blue-600"
                      />
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {user.username}
                        </h3>
                        <Badge
                          color={getStatusColor(user.status)}
                          text={
                            <span className="text-slate-300 text-sm">
                              {getStatusText(user.status)}
                            </span>
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <MailOutlined className="text-blue-400" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    {user.role && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <UserOutlined className="text-green-400" />
                        <span className="text-sm capitalize">{user.role}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Tooltip title="Edit user">
                      <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(user)}
                        className="flex-1 bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:text-white"
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete user">
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => confirmDeleteUser(user)}
                        className="flex-1 bg-red-500 border-red-500 text-white hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="text-center py-12">
              <UserAddOutlined className="text-6xl text-slate-500 mb-4" />
              <h3 className="text-xl text-slate-400 mb-2">No users found</h3>
              <p className="text-slate-500 mb-4">
                Start by creating your first user
              </p>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsCreateModalVisible(true)}
                size="large"
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              >
                Create First User
              </Button>
            </div>
          )}
        </Card>

        {/* Create User Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-lg">
              <UserAddOutlined className="text-blue-500" />
              Create New User
            </div>
          }
          open={isCreateModalVisible}
          onOk={handleCreateUser}
          onCancel={() => {
            setIsCreateModalVisible(false);
            setNewUser({ username: "", email: "", role: "user" });
          }}
          okText="Create User"
          cancelText="Cancel"
          okButtonProps={{
            className:
              "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700",
            type: "default",
            size: "large",
          }}
          cancelButtonProps={{
            size: "large",
          }}
          width={500}
        >
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Username *
              </label>
              <Input
                placeholder="Enter username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                prefix={<UserOutlined className="text-gray-400" />}
                size="large"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                type="email"
                prefix={<MailOutlined className="text-gray-400" />}
                size="large"
              />
            </div>
          </div>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-lg">
              <EditOutlined className="text-orange-500" />
              Edit User
            </div>
          }
          open={isEditModalVisible}
          onOk={handleEditUser}
          onCancel={() => {
            setIsEditModalVisible(false);
            setEditingUser(null);
          }}
          okText="Save Changes"
          cancelText="Cancel"
          okButtonProps={{
            type: "default",
            className:
              "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700",
          }}
          cancelButtonProps={{
            size: "large",
          }}
          width={500}
        >
          {editingUser && (
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <Input
                  placeholder="Enter username"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                  prefix={<UserOutlined className="text-gray-400" />}
                  size="large"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  placeholder="Enter email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  type="email"
                  prefix={<MailOutlined className="text-gray-400" />}
                  size="large"
                />
              </div>
            </div>
          )}
        </Modal>
        <Modal
          title={
            <div className="flex items-center gap-2 text-lg text-red-500">
              <DeleteOutlined />
              Delete Confirm
            </div>
          }
          open={isDeleteModalVisible}
          onCancel={() => {
            setIsDeleteModalVisible(false);
            setUserToDelete(null);
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setIsDeleteModalVisible(false);
                setUserToDelete(null);
              }}
              size="large"
            >
              Cancel
            </Button>,
            <Button
              key="delete"
              onClick={() => {
                if (userToDelete) handleDeleteUser(userToDelete.id);
                setIsDeleteModalVisible(false);
              }}
              className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white"
              size="large"
            >
              Delete user
            </Button>,
          ]}
          width={500}
        >
          {userToDelete && (
            <div className="space-y-3 py-2">
              <p className="text-slate-300">
                Are you sure you want to delete the user?
              </p>
              <p className="text-lg font-semibold text-white">
                {userToDelete.username} ({userToDelete.email})
              </p>
              <p className="text-sm text-red-400">
                This action is irreversible and will permanently remove the user
                from the system.
              </p>
            </div>
          )}
        </Modal>
      </main>
    </>
  );
}
