import { LoadingHook } from "@/hooks/loading";
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
  const { isLoading, toggleLoading } = LoadingHook(false);

  const handleClick = async () => {
    try {
      toggleLoading(true);
      await onClick();
    } catch (error) {
      console.error("error while fetching", error);
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <Button
      type={type}
      loading={isLoading}
      icon={icon}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  );
}
