import { Drawer, DrawerProps } from "antd";

interface DrawerComponentProps extends DrawerProps {
  children?: React.ReactNode;
}

export default function DrawerComponent({
  children,
  ...props
}: DrawerComponentProps) {
  return (
    <Drawer width={480} {...props}>
      {children}
    </Drawer>
  );
}
