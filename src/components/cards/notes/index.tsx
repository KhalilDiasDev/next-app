
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
   <></>
  );
}
