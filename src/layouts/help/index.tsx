import { Tabs, theme } from "antd";
import { useState } from "react";
import VersionTab from "./tabs/version";
import TopbarComponent from "@/components/ui/topbar";

const tabs = [{ key: "version", label: "Version", children: <VersionTab /> }];

export default function HelpLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [activeKey, setActiveKey] = useState<string>("version");

  return (
    <div className="flex flex-col flex-1">
      <TopbarComponent />
      <Tabs
        items={tabs}
        activeKey={activeKey}
        onChange={setActiveKey}
        className="w-full"
        tabBarStyle={{
          backgroundColor: colorBgContainer,
        }}
      />
    </div>
  );
}
