import { Result } from "antd";

interface Props {
  message: string;
}

export default function PermissionErrorComponent({ message }: Props) {
  return (
    <div className="flex h-[50vh] justify-center items-center">
      <Result status="error" title="Access Denied" subTitle={message} />
    </div>
  );
}
