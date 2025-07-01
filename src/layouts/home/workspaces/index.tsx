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
  
      const currentUserEmail = session?.user?.email;
      const filtered = currentUserEmail
        ? userData.filter((u: User) => u.email !== currentUserEmail)
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

      <main className="p-8 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <SecurityScanOutlined className="text-blue-600" />
            User Control Panel
          </h1>
          <p className="text-gray-600 text-lg">
            Manage users and monitor system security
          </p>
        </div>

        {/* Users Section */}
        <Card
          className="bg-white border-gray-200 shadow-lg"
          title={
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <UserOutlined />
                User Management
              </h2>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsCreateModalVisible(true)}
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white"
                size="large"
              >
                New User
              </Button>
            </div>
          }
          headStyle={{
            backgroundColor: "white",
            borderBottom: "1px solid #e5e7eb",
          }}
          bodyStyle={{ backgroundColor: "white" }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="relative inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-400 animate-pulse"></div>
              </div>
              <p className="text-gray-600 mt-6 text-lg animate-pulse">Loading users...</p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className="bg-gray-50 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
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
                        <h3 className="text-gray-900 font-semibold text-lg">
                          {user.username}
                        </h3>
                        <Badge
                          color={getStatusColor(user.status)}
                          text={
                            <span className="text-gray-700 text-sm">
                              {getStatusText(user.status)}
                            </span>
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MailOutlined className="text-blue-600" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    {user.role && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <UserOutlined className="text-green-600" />
                        <span className="text-sm capitalize">{user.role}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(user)}
                        className="flex-1 bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                      >
                        Edit
                      </Button>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => confirmDeleteUser(user)}
                        className="flex-1"
                      >
                        Delete
                      </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="text-center py-12">
              <UserAddOutlined className="text-6xl text-gray-400 mb-4" />
              <h3 className="text-xl text-gray-700 mb-2">No users found</h3>
              <p className="text-gray-500 mb-4">
                Start by creating your first user
              </p>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsCreateModalVisible(true)}
                size="large"
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white"
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
              <UserAddOutlined className="text-blue-600" />
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
            type: "primary",
            size: "large",
          }}
          cancelButtonProps={{
            size: "large",
          }}
          width={500}
        >
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
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
              <label className="block text-sm font-medium mb-2 text-gray-700">Email *</label>
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
              <EditOutlined className="text-orange-600" />
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
            type: "primary",
            className:
              "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700",
            size: "large",
          }}
          cancelButtonProps={{
            size: "large",
          }}
          width={500}
        >
          {editingUser && (
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
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
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
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

        {/* Delete Confirmation Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-lg text-red-600">
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
              danger
              size="large"
            >
              Delete user
            </Button>,
          ]}
          width={500}
        >
          {userToDelete && (
            <div className="space-y-3 py-2">
              <p className="text-gray-700">
                Are you sure you want to delete the user?
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {userToDelete.username} ({userToDelete.email})
              </p>
              <p className="text-sm text-red-600">
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