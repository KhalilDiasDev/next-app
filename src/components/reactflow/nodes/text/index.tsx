import { Typography } from "antd";
import React, { memo } from "react";
import NodeComponent, { noteGap, noteSize } from "../utils/nodeComponent";

interface props {
  id: string;
  data: Flow.NodeDataProps;
}

function TextNode(this: any, { id, data }: props) {
  return (
    <>
      <NodeComponent {...{ id, data }} styles={{ padding: "0 8px" }}>
        <div
          className="relative py-4 text-center"
          style={{ height: noteSize - noteGap }}
        >
          <Typography className="truncate m-0 text-2xl font-bold">
            {data.title}
          </Typography>
          <Typography className="text-lg mt-2">{data.subtitle}</Typography>
        </div>
      </NodeComponent>
    </>
  );
}

export default memo(TextNode);
