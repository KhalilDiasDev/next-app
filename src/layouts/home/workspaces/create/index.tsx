import React, { useState } from "react";
import { FormattedInputComponent } from "@/components/inputs/FormattedInput";
import { useNotificationContext } from "@/context/notification";
import { LoadingHook } from "@/hooks/loading";
import { nextApi } from "@/services";
import formatError from "@/utils/format/formatError";
import {
  Button,
  Card,
  Col,
  Form,
  FormItemProps,
  Input,
  Modal,
  Row,
  Space,
  Switch,
} from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Icons from "@/data/icons";
import { canvasItems } from "@/data/canvas";
import { FormDetails } from "./formDetails";

export interface FormItem {
  name: string;
  label: string;
  type: string;
  rules?: FormItemProps["rules"];
}

interface Props {
  open: boolean;
  onClose: () => void;
  workspaces: Workspace.Props[];
  templates: Workspace.Props[];
}

type SelectedOptionProps = "scratch" | "template" | "ai";

const createOptions = [
  {
    key: "scratch",
    label: "Create From Scratch",
    icon: <Icons.Plus />,
    description: "Create a workspace from scratch.",
  },
  {
    key: "template",
    label: "Load Template",
    icon: <Icons.Template />,
    description: "Select a template and start writting your API notes.",
  },
  {
    key: "ai",
    label: "Create With AI",
    icon: <Icons.Robot />,
    description:
      "Write a brief description of your workspace and let the AI generate the API notes for you.",
  },
];

const formatBody = (values: Workspace.Props, workspaces: Workspace.Props[]) => {
  const uniqueValues: any[] = ["name"];

  // check if the values are unique
  uniqueValues.forEach((item: keyof Workspace.Props) => {
    if (workspaces.find((workspace) => workspace[item] === values[item])) {
      throw new Error(
        `Value ${values[item]} is already in use by another workspace`
      );
    }
  });

  return {
    ...values,
    canvas: {
      requirements: { extra: [], items: [] },
      value_proposition: { extra: [], items: [] },
      business_model: { extra: [], items: [] },
      business_impact: { extra: [], items: [] },
    },
    permissions: { viewer: [], editor: [], maintainer: [] },
  };
};

export default function CreateModal({
  open,
  onClose,
  workspaces,
  templates,
}: Props) {
  const [form] = Form.useForm();
  const { data: session }: any = useSession();
  const router = useRouter();
  const { notification } = useNotificationContext();
  const { isLoading, toggleLoading } = LoadingHook();
  const [selectedOption, setSelectedOption] = useState<
    SelectedOptionProps | undefined
  >(undefined);
  const [CreateButtonDisabled, setCreateButtonDisabled] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<
    Template.Props | undefined
  >(undefined);

  const handleCreateButton = (value: boolean) => {
    setCreateButtonDisabled(value);
  };

  const handleClose = () => {
    setSelectedOption(undefined);
    setSelectedTemplate(undefined);
    onClose();
  };

  const handleSelectTemplate = (template: Template.Props) => {
    setSelectedTemplate(template);
    setCreateButtonDisabled(false);
  };

  const handleSelectedOption = (option: SelectedOptionProps) => {
    setSelectedOption(option);

    if (option === "template" && !selectedTemplate) {
      setCreateButtonDisabled(true);
    } else {
      setCreateButtonDisabled(false);
    }
  };

  async function onCreate(values: any) {
    try {
      toggleLoading(true);

      let body: any;

      switch (selectedOption) {
        case "template":
          if (!selectedTemplate?.data?.canvas) {
            throw new Error(
              "Invalid template structure: missing second canvas."
            );
          }

          body = {
            description: selectedTemplate.description,
            canvas: selectedTemplate.data.canvas,
            user_id: session.user.id,
          };

          break;
        case "ai":
          const aiResult = await handleAICreation(values?.prompt);
          body = { ...aiResult, description: values?.prompt };
          break;
        default:
          body = {
            ...formatBody(values, workspaces),
            user_id: session.user.id,
          };
      }

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

      form.resetFields();
      handleClose();
    } catch (error) {
      notification.error({
        message: `Error creating workspace`,
        description: formatError(error),
      });
    } finally {
      toggleLoading(false);
    }
  }

  const handleAICreation = async (prompt: string) => {
    const promises = canvasItems.map((item) =>
      nextApi
        .post("/api/ai", {
          prompt: prompt,
          data: item,
        })
        .then((res) => res.data.results)
    );

    const result = await Promise.all(promises);

    const updatedCanvas = result.reduce((acc, item) => {
      acc[item.name] = item.nodes;
      return acc;
    }, {});

    const formValues = await form.validateFields();
    const workspaceData = {
      name: formValues.name,
      user_id: session.user.id,
      canvas: updatedCanvas,
    };

    return workspaceData;
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={
        selectedOption
          ? createOptions.find((item) => item.key === selectedOption)?.label
          : `Create Workspace`
      }
      footer={null}
    >
      {selectedOption ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={onCreate}
          >
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  name="name"
                  label="Workspace Name"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Input placeholder="Workspace Name" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="template"
                  label="Template"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <FormDetails
              type={selectedOption}
              templates={
                templates.map((item) => ({
                  key: item._id.$oid,
                  label: item.name,
                  description: "Custom template",
                  category: "Custom",
                  data: item,
                })) || []
              }
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
            />
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="default"
                onClick={() => setSelectedOption(undefined)}
              >
                Back
              </Button>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={isLoading}
                  disabled={CreateButtonDisabled}
                >
                  Create
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Space>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {createOptions.map((item) => (
            <Card
              key={item.key}
              hoverable
              onClick={() =>
                handleSelectedOption(item.key as SelectedOptionProps)
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "primary",
                }}
              >
                {item.icon}
                <div>
                  <div style={{ fontWeight: "bold" }}>{item.label}</div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    {item.description}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </Space>
      )}
    </Modal>
  );
}
