import React, { memo, useContext } from "react";
import { FlowContext } from "@/context/flow";
import Icons from "@/data/icons";
import ExtraNoteWrapper from "../utils/extraNoteWrapper";
import { useSession } from "next-auth/react";

interface props {
  id: string;
  type: string;
  data: Workspace.ExtraPropsData;
  xPos: number;
  yPos: number;
}

function StickerNode(this: any, props: props) {
  const { id, data, xPos, yPos } = props;
  const { nodeFunctions, handleSocket, disabled, socketData } =
    useContext(FlowContext);
  const { updateProp, deleteNode } = nodeFunctions(id);
  const { data: session } = useSession() as any;
  const selectIcon: any = data.text;

  const editingUser = socketData.activeUsers.find(
    (user) => user.nodes?.includes?.(id) && user.user_id !== session.user?.id
  );

  const handleDelete = () => {
    deleteNode();
    handleSocket([{ ...props }], "delete");
  };

  const handleUpdateProp = (field: string, value: string) => {
    const response = updateProp(field, value);
    handleSocket([
      { ...props, position: { x: xPos, y: yPos }, data: response },
    ]);
  };
  const predefinedColors = [
    "#000000",
    "#6D9FFF",
    "#edcb51",
    "#60D960",
    "#E57373",
  ];

  const IconComponent = Icons[selectIcon];

  return (
    <ExtraNoteWrapper
      id={`extra-note-${id}`}
      onChange={handleUpdateProp.bind(this)}
      onDelete={handleDelete}
      disabled={disabled || editingUser?.user_id != undefined}
      colors={predefinedColors}
    >
      <div className="flex flex-col items-center">
        <div
          className="flex items-center"
          style={{ color: data.color || predefinedColors[0] }}
        >
          {IconComponent ? (
            <IconComponent size={60} />
          ) : (
            <Icons.Question size={60} />
          )}
        </div>
        {editingUser?.user_id && (
          <div className="overlay">
            {(editingUser?.user?.length || 0) > 20
              ? `${editingUser.user?.slice(0, 20)}...`
              : editingUser.user}{" "}
            is editing
          </div>
        )}
      </div>
    </ExtraNoteWrapper>
  );
}

export default memo(StickerNode);
