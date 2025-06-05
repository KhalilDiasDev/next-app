import { Button, Tooltip, Typography } from "antd";
import React, { memo, useContext } from "react";
import { FlowContext } from "@/context/flow";
import NodeComponent, { noteGap, noteSize } from "../utils/nodeComponent";
import NoteCardComponent from "@/components/cards/notes";
import CreateNoteCardComponent from "@/components/cards/notes/create";
import { useSession } from "next-auth/react";
import UserAvatarComponent from "@/components/misc/userAvatar";
import { EditOutlined } from "@ant-design/icons";

interface props {
  id: string;
  data: Flow.NodeDataProps;
}

function BoardNode(this: any, { id, data }: props) {
  const {
    nodeFunctions,
    socketData,
    handleSocket,
    selectedItem,
    disabled,
    handleRemoveUser,
    toggleDrawer,
  } = useContext(FlowContext);
  const { addNote, updateNote, updateProp } = nodeFunctions(id);
  const { data: session } = useSession() as any;

  const handleAddNote = () => {
    const response = addNote();
    handleSocket([{ id, data: response }], "update", data.notes?.length);
  };

  const handleUpdateNote = (
    operation: "update" | "delete",
    noteIndex?: number,
    noteField?: string,
    value?: string
  ) => {
    const response = updateNote(operation, noteIndex, noteField, value);
    handleSocket([{ id, data: response }], operation, noteIndex);

    if (operation === "delete") {
      const selectedUser = socketData.activeUsers.find(
        (item) =>
          item.board === selectedItem &&
          item.nodes?.includes(id) &&
          item.note_id === noteIndex
      );
      handleRemoveUser(selectedUser?.user_id);
    }
  };

  const activeUsers = socketData.activeUsers.filter(
    (item) =>
      item.board === selectedItem &&
      item.nodes?.includes(id) &&
      item.user_id !== session.user?.id
  );

  const handleUpdateProp = (field: string, value: string) => {
    const response = updateProp(field, value);
    handleSocket([{ id, data: { ...response, notes: undefined } }], "update");
  };

  const shortcuts = {
    internal: {
      Enter:
        data.notes?.length < data.cols * (data.rows - 1)
          ? () => handleAddNote()
          : () => undefined,
    },
    external: {
      // Delete: () => handleUpdateNote("deleteAll"),
      // Backspace: () => handleUpdateNote("deleteAll"),
    },
    enableFocusOnNumbers: true,
  };

  return (
    <>
      {activeUsers.length > 0 && (
        <div className="absolute top-2 left-2 h-full flex gap-1 z-[100]">
          {activeUsers.map((item, index) => (
            <UserAvatarComponent
              user={{ name: item.user }}
              key={index}
              tooltip={`${item.user} is editing`}
            />
          ))}
        </div>
      )}
      <Tooltip title="Edit">
        <Button
          icon={<EditOutlined />}
          type="text"
          className="absolute top-2 right-2 z-[100]"
          onClick={() => toggleDrawer(true)}
        />
      </Tooltip>
      <NodeComponent {...{ id, data, shortcuts }}>
        <div
          className="flex flex-col items-center justify-center py-4 px-4"
          style={{ height: noteSize }}
        >
          <Typography className="text-bold-break text-center text-2xl font-bold -mt-2 px-2">
            {data.title}
          </Typography>
          <Typography className=" text-center mt-1">{data.subtitle}</Typography>
        </div>

        <div
          className="grid gap-4 p-4 w-full "
          style={{
            height: (data.rows - 1) * noteSize + (data.rows - 2) * noteGap,
            gridTemplateColumns: `repeat(${data.cols}, 1fr)`,
            gridTemplateRows: `repeat(${data.rows - 1}, 1fr)`,
          }}
        >
          {data.notes?.map((item, index) => (
            <div
              onBlur={() => handleRemoveUser()}
              key={`${data.title
                .replaceAll(" ", "-")
                .toLowerCase()}-${index}-div`}
            >
              <NoteCardComponent
                id={`${data.title.replaceAll(" ", "-").toLowerCase()}-${index}`}
                item={item}
                onChange={handleUpdateNote.bind(this, "update", index)}
                onDelete={() => handleUpdateNote("delete", index)}
                disabled={disabled}
                user={activeUsers.find((user) => user.note_id === index)}
              />
            </div>
          ))}

          {data.notes?.length < data.cols * (data.rows - 1) && (
            <div
              style={{ height: noteSize - noteGap, width: noteSize - noteGap }}
            >
              <CreateNoteCardComponent
                onClick={handleAddNote}
                disabled={disabled}
              />
            </div>
          )}
        </div>
      </NodeComponent>
    </>
  );
}

export default memo(BoardNode);
