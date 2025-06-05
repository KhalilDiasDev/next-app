import { templateItems } from "@/data/templates";
import { Card, Form, Input, Typography } from "antd";
import Link from "next/link";

interface FormDetailsProps {
  type?: string;
  templates: Template.Props[];
  selectedTemplate?: Template.Props;
  onSelectTemplate: (template: Template.Props) => void;
}

export function FormDetails({
  type,
  templates,
  selectedTemplate,
  onSelectTemplate,
}: FormDetailsProps) {
  if (type === "template") {
    const templateList = templates;
    if (templateList.length < 3) {
      templateList.push(...templateItems.slice(-3 + templateList.length));
    }

    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <Typography>Main templates</Typography>
          <Link
            href="/templates"
            style={{ textDecoration: "underline", color: "var(--text-color)" }}
          >
            Explore Templates
          </Link>
        </div>
        {templateList.map((item) => (
          <Card
            hoverable
            key={item.key}
            onClick={() => onSelectTemplate(item)}
            style={{
              marginBottom: "0.25rem",
              borderColor:
                selectedTemplate?.key === item.key
                  ? "var(--primary-color)"
                  : undefined,
            }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{item.label}</div>
              <div style={{ fontSize: "12px", color: "gray" }}>
                {item.description}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "ai") {
    return (
      <Form.Item
        name="prompt"
        label="Write your idea and let our AI generate the API notes for you."
        rules={[
          { required: true, message: "Please provide a prompt" },
          { pattern: /^[^\d]+$/, message: "Numbers are not allowed" },
        ]}
      >
        <Input placeholder="Describe the workspace you want to create" />
      </Form.Item>
    );
  }

  return (
    <Form.Item
      name="description"
      label="Description"
      style={{ marginBottom: "2rem" }}
    >
      <Input.TextArea
        rows={4}
        showCount
        maxLength={100}
        placeholder="Describe your business idea"
        style={{ resize: "none" }}
      />
    </Form.Item>
  );
}
