import ExtraNoteWrapper from "@/components/reactflow/nodes/utils/extraNoteWrapper";
import {
  noteGap,
  noteSize,
} from "@/components/reactflow/nodes/utils/nodeComponent";
import { Input } from "antd";

interface Props {
  id: string;
  item: { text?: string; color?: string };
  onChange: (field: string, value: string) => void;
  onDelete: () => void;
  disabled?: boolean;
  user?: Socket.UserProps;
}

const maxLength = 150;
export const predefinedColors = ["#6D9FFF", "#edcb51", "#60D960", "#E57373"];

export default function NoteCardComponent({
  item,
  id,
  onChange,
  onDelete,
  disabled,
  user,
}: Props) {
  const isNoteDisabeld = disabled || user?.user_id != undefined;
  return (
    <div className="flex flex-col items-center relative">
      <ExtraNoteWrapper
        {...{ id, onChange, onDelete }}
        disabled={isNoteDisabeld}
        colors={predefinedColors}
      >
        <div
          className="flex items-center rounded-lg shadow-lg textarea-wrapper overflow-y-hidden"
          style={{
            backgroundColor: item?.color || predefinedColors[0],
            height: noteSize - noteGap,
            width: noteSize - noteGap,
          }}
        >
          <Input.TextArea
            id={id}
            disabled={isNoteDisabeld}
            maxLength={maxLength}
            // autoSize={{ minRows: 1, maxRows: 7 }}
            style={{
              fontSize: Math.max(
                36 - Math.sqrt(item?.text?.length || 1) * 3,
                10
              ),
            }}
            className="bg-transparent outline-none textarea-wrapper border-0 h-full w-full text-center resize-none px-1 py-0 m- overflow-y-hidden"
            value={item?.text}
            onChange={(e) => onChange("text", e.target.value)}
          />
        </div>
      </ExtraNoteWrapper>
      {user?.user_id && (
        <div className="absolute top-[100%] w-max">
          {(user.user?.length || 0) > 20
            ? `${user.user?.slice(0, 20)}...`
            : user.user}{" "}
          is editing
        </div>
      )}
    </div>
  );
}
