import React, { useState } from "react";
import { FormattedInputComponent } from "@/components/inputs/FormattedInput";
import { useNotificationContext } from "@/context/notification";
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
