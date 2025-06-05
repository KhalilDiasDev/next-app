import { Layout, Space, theme, Typography } from "antd";
import packageJson from "../../../../package.json";
import { features } from "../../../data/text/version/features";
import { bugsFixes } from "../../../data/text/version/bugs";

interface ItemProps {
  flag: string;
  text: string;
}

export default function VersionTab() {
  const version = packageJson.version;
  const {
    token: { colorText },
  } = theme.useToken();

  return (
    <Layout
      className="w-full h-full overflow-y-auto wrapper-padding-x wrapper-padding-y"
      style={{ color: colorText }}
    >
      <Space direction="horizontal" className="mb-8">
        <Typography className="text-3xl font-bold">
          Version {version}
        </Typography>
      </Space>
      <Typography className="text-xl font-bold">What is new?</Typography>
      <div className="p-4 ">
        <ul>
          {features.map((item: ItemProps, index: number) => (
            <li className="mb-4" key={index}>
              <Space>{item.text}</Space>
            </li>
          ))}
        </ul>
      </div>

      <Typography className="text-xl font-bold">Bug Fixes</Typography>
      <div className="p-4">
        <ul>
          {bugsFixes.map((item: ItemProps, index: number) => (
            <li className="mb-4" key={index}>
              <Space>{item.text}</Space>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
