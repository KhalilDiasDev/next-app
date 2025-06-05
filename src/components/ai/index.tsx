// src/components/AIComponent.tsx
import React from "react";
import { Button, Tooltip } from "antd";
import { ModalHook } from "@/hooks/modal";
import AIDrawer from "./modal";
import Icons from "@/data/icons";

interface AiButtonComponentProps {
  onSubmit: (result: any) => void;
}

export default function AiButtonComponent({
  onSubmit,
}: AiButtonComponentProps) {
  const { isModalOpen, openModal, closeModal } = ModalHook(false);

  return (
    <>
      <AIDrawer open={isModalOpen} onClose={closeModal} onSubmit={onSubmit} />
      <Tooltip title="Generate notes with AI">
        <Button onClick={openModal} icon={<Icons.AI />}>
          Create with AI
        </Button>
      </Tooltip>
    </>
  );
}
