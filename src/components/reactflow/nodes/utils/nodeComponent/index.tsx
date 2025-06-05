import React from "react";
import { handleShortcuts } from "@/utils/nodeShortcuts";
import { theme, Typography } from "antd";

interface props {
  id: string;
  data: Flow.NodeDataProps;
  shortcuts?: {
    internal?: { [x: string]: () => void };
    external?: { [x: string]: () => void };
    enableFocusOnNumbers?: boolean;
  };
  styles?: React.CSSProperties;
  children?: React.ReactNode;
  type?: "solid" | "transparent";
}

export const noteSize = 150;
export const noteGap = 16;

export default function NodeComponent(
  this: Object,
  { id, data, shortcuts, styles, children, type = "solid" }: props
) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let formattedShortcuts = {
    internal: {
      ...shortcuts?.internal,
    },
    external: {
      ...shortcuts?.external,
    },
    enableFocusOnNumbers: shortcuts?.enableFocusOnNumbers,
  };

  return (
    <>
      {data.step && (
        <Typography.Title
          level={2}
          className="absolute -top-4 -right-2 z-[100]"
        >
          {data.step}
        </Typography.Title>
      )}
      <div
        id={`node-${id}`}
        tabIndex={0}
        onKeyDown={(event) =>
          handleShortcuts(
            formattedShortcuts,
            data.title.replaceAll(" ", "-").toLowerCase(),
            event
          )
        }
        className="relative rounded-xl border-none shadow-md overflow-hidden"
        style={{
          background: type === "solid" ? colorBgContainer : "transparent",
          boxShadow: type === "transparent" ? "none" : undefined,
          width: noteSize * data.cols + (data.cols - 1) * noteGap,
          height: noteSize * data.rows + (data.rows - 1) * noteGap,
          ...styles,
        }}
      >
        {children}
      </div>
    </>
  );
}
