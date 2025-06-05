import { Image, Tooltip, Typography } from "antd";
import React, { memo } from "react";
import NodeComponent, { noteGap, noteSize } from "../utils/nodeComponent";

interface props {
  id: string;
  data: Flow.NodeDataProps;
}

function ImageNode({ id, data }: props) {
  return (
    <NodeComponent
      {...{ id, data }}
      type="transparent"
      styles={{ padding: "0 8px" }}
    >
      <div className="grid grid-rows-2 items-center justify-center h-full w-full">
        <Image
          src={data.image}
          alt={data.title}
          className="object-contain"
          preview={false}
        />
        <Tooltip title={data.subtitle}>
          <Typography
            className="text-xl text-center font-bold"
            style={{
              height: (noteSize * data.rows + (data.rows - 1) * noteGap) / 2,
            }}
          >
            {(data.subtitle?.length || 0) > 50
              ? data.subtitle?.substring(0, 50) + "..."
              : data.subtitle}
          </Typography>
        </Tooltip>
      </div>
    </NodeComponent>
  );
}

export default memo(ImageNode);
