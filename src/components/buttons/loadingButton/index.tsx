import { Button } from "antd";

interface props {
  icon?: JSX.Element;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  onClick: () => Promise<void>;
  children: React.ReactNode;
  [x: string]: any;
}
export default function LoadingButtonComponent({
  icon,
  type = "primary",
  onClick,
  children,
  ...rest
}: props) {


  return (
<div></div>
  );
}
