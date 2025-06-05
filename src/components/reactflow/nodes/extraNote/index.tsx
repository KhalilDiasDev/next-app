import React, { memo, useContext } from "react";
import { FlowContext } from "@/context/flow";
import NoteCardComponent from "@/components/cards/notes";
import { handleShortcuts } from "@/utils/nodeShortcuts";
import { useSession } from "next-auth/react";

interface props {
  id: string;
  type: string;
  data: Workspace.ExtraPropsData;
  xPos: number;
  yPos: number;
}

function ExtraNoteNode(this: any, props: props) {
  const { id, data, xPos, yPos } = props;
  const { nodeFunctions, handleSocket, disabled, socketData } =
    useContext(FlowContext);
  const { updateProp, deleteNode } = nodeFunctions(id);
  const { data: session } = useSession() as any;
  const editingUser = socketData.activeUsers.find(
    (user) => user.nodes?.includes?.(id) && user.user_id !== session.user?.id
  );

  const handleUpdateProp = (field: string, value: string) => {
    const response = updateProp(field, value);
    handleSocket([
      { ...props, position: { x: xPos, y: yPos }, data: response },
    ]);
  };

  const handleDelete = () => {
    deleteNode();
    handleSocket([{ ...props }], "delete");
  };

  const shortcuts = {
    external: {
      Delete: () => handleDelete(),
      Backspace: () => handleDelete(),
    },
  };

  return (
    <div
      className="flex flex-col items-center"
      onKeyDown={(event) => handleShortcuts(shortcuts, id, event)}
    >
      <NoteCardComponent
        id={`extra-note-${id}`}
        item={data}
        onChange={handleUpdateProp.bind(this)}
        onDelete={handleDelete}
        disabled={disabled}
        user={editingUser}
      />
    </div>
  );
}

export default memo(ExtraNoteNode);
