import { useState } from "react";
import { useRouter } from "next/router";
import { LoadingHook } from "@/hooks/loading";
import { useSession } from "next-auth/react";
import { nextApi } from "@/services";
import { useNotificationContext } from "@/context/notification";
import formatError from "@/utils/format/formatError";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
} from "antd";
import Icons from "@/data/icons";
import TopbarComponent from "@/components/ui/topbar";

export default function MyTemplatesLayout({}) {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>("Default Templates");
  const [selectedTemplate, setSelectedTemplate] = useState<
    Template.Props | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { notification } = useNotificationContext();
  const { isLoading, toggleLoading } = LoadingHook();
  const { data: session }: any = useSession();
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleOpenModal = (item: Template.Props) => {
    setSelectedTemplate(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  async function onCreate(values: any) {
    try {
      toggleLoading(true);

      let body: any;

      if (!selectedTemplate?.data?.canvas) {
        throw new Error("Invalid template structure: missing second canvas.");
      }

      body = {
        description: selectedTemplate.description,
        canvas: selectedTemplate.data.canvas,
        user_id: session.user.id,
      };

      body.name = values.name || "Untitled Workspace";
      body.template = values.template || false;

      if (!body.name || !body.user_id) {
        throw new Error("Missing required fields in the imported data.");
      }

      const result = await nextApi.post(`/api/workspaces`, body);

      notification.success({
        message: result.data.message,
      });

      const getPath = `/api/workspaces?filter={"name": "${body.name}"}&userId=${session.user.id}`;

      const response = await nextApi
        .get(getPath)
        .then((res) => res.data.data as Workspace.Props[]);

      if (response.length) {
        const createdItem = response[0];
        const id = createdItem._id?.$oid;

        await router.push(`/workspaces/${id}`);
      }

      handleCloseModal();
    } catch (error) {
      notification.error({
        message: `Error creating workspace`,
        description: formatError(error),
      });
    } finally {
      toggleLoading(false);
    }
  }
  const filterItems = (item: any) => {
    const matchesSearch = item.label
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  };

  const categories = [
    {
      key: "security",
      label: `Security`,
    },
    {
      key: "communication",
      label: `Communication`,
    },
    {
      key: "payment",
      label: `Payment`,
    },
    {
      key: "services",
      label: `Services`,
    },
  ];

  const tabs = [
    {
      key: "templates",
      label: `Templates`,
    },
  ];

  return (
    <>
      <TopbarComponent
      // items={[...router.pathname.split("/").slice(1), activeKey]}
      />
      <Tabs
        items={tabs}
        activeKey="templates"
        className="w-full"
        tabBarStyle={{
          marginBottom: "0rem",
          background: "white",
        }}
      />
      <div className="px-4">
        <div className="flex items-center p-1">
          <Input
            prefix={<Icons.Search style={{ color: "#d9d9d9" }} />}
            placeholder="Search templates..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mt-3 h-10 shadow-none"
          />
          <Select
            className="mt-3 h-10 ml-4 w-60 shadow-none"
            placeholder="Select a Category"
            value={selectedCategory}
            onChange={setSelectedCategory}
          >
            <Select.Option value="">All Categories</Select.Option>
            {categories.map((category) => (
              <Select.Option key={category.key} value={category.key}>
                {category.label}
              </Select.Option>
            ))}
          </Select>
        </div>

      
      </div>

      <Modal
        title={`Insert a name for your ${selectedTemplate?.label} Workspace`}
        visible={isModalOpen}
        footer={null}
        onCancel={handleCloseModal}
      >
        <Form name="name" form={form} onFinish={onCreate}>
          <Form.Item
            name="name"
            label="Workspace Name"
            rules={[{ required: true, message: "This field is required" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="Workspace Name" />
          </Form.Item>

          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="default" onClick={handleCloseModal}>
              Back
            </Button>
            <Form.Item style={{ margin: 0 }}>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Use Template
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
}
