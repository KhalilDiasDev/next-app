import Icons from "@/data/icons";

interface Props {
  onClick: () => void;
  size?: string;
  children?: React.ReactNode;
}

export default function GoBackButtonComponent({
  onClick,
  size = "20px",
  children,
}: Props) {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <Icons.Back style={{ fontSize: size }} />
      {children}
    </div>
  );
}
