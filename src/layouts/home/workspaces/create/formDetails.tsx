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
