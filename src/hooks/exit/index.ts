import { Modal } from "antd";
import { useEffect } from "react";

export default function ExitHook(condition: boolean, onConfirm: () => void) {
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (condition) {
        e.returnValue =
          "You have unsaved changes!\n Do you really want to leave without saving?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [condition]);

  const confirmationModal = () =>
    Modal.confirm({
      title: "You have unsaved changes!",
      content: "Do you really want to leave without saving?",
      onOk() {
        onConfirm();
      },
      onCancel() {
        Modal.destroyAll();
      },
    });

  return { confirmationModal };
}
