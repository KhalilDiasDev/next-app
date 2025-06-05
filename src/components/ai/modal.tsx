import React from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useNotificationContext } from "@/context/notification";
import { LoadingHook } from "@/hooks/loading";
import formatError from "@/utils/format/formatError";
import { nextApi } from "@/services";
import { canvasItems } from "@/data/canvas";

interface AIComponentProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (result: any) => void;
}

interface FormValuesProps {
  prompt: string;
}

export default function AIDrawer({
  open,
  onClose,
  onSubmit,
}: AIComponentProps) {
  const { isLoading, toggleLoading } = LoadingHook(false);
  const { notification } = useNotificationContext();
  const [form] = Form.useForm();

  const handleSubmit = async (values: FormValuesProps) => {
    try {
      toggleLoading(true);

      const promises = canvasItems.map((item) =>
        nextApi
          .post("/api/ai", {
            prompt: values.prompt,
            data: item,
          })
          .then((res) => res.data.results)
      );

      const result = await Promise.all(promises);

      const updatedNotes: {
        [x: string]: { extra?: any[]; items: Workspace.CanvasItemProps[] };
      } = {};

      result.forEach((item) => {
        updatedNotes[item.name] = item.nodes;
      });

      onSubmit(updatedNotes);

      onClose();
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Error generating response",
        description: formatError(error),
      });
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <Modal title="Create With AI" open={open} onCancel={onClose} footer={null}>
      <Typography>
        Hi, I'm your virtual assistant trained to help you develop your API
        business model!
      </Typography>
      <p style={{ marginTop: 10 }}>
        Write your idea and let our AI generate the API notes for you.
      </p>

      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <Form.Item
          name="prompt"
          label="Create an API about..."
          rules={[
            { required: true, message: "This field is required" },
            { pattern: /^[^\d]+$/, message: "Numbers are not allowed" },
          ]}
          style={{ marginBottom: "16px" }}
        >
          <Input placeholder="Write here your idea" inputMode="text" />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            style={{ marginTop: "8px" }}
          >
            Generate Model
          </Button>
        </Form.Item>

        <img
          src="/bykonneqt.png"
          width="35%"
          style={{ marginTop: "5px", marginBottom: "-10px" }}
          alt="Logo"
        />
      </Form>
    </Modal>
  );
}
