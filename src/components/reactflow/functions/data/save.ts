import { nextApi } from "@/services";
import formatCanvas from "./format";
import { AxiosResponse } from "axios";
import formatError from "@/utils/format/formatError";
import { Dispatch, SetStateAction } from "react";

export default async function saveChanges(
  nodes: Flow.NodeProps[],
  canvas: Workspace.CanvasModelProps,
  data: Workspace.Props,
  notification: any,
  setData: Dispatch<SetStateAction<Workspace.Props>>
) {
  try {
    let body = formatCanvas(nodes);

    let response: AxiosResponse<any, any>;
    response = await nextApi.put(`/api/workspaces/${data._id.$oid}`, {
      canvas: {
        ...data.canvas,
        [canvas.name]: body,
      },
    });

    setData((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        [canvas.name]: body,
      },
    }));

    return;
  } catch (error) {
    notification.error({
      message: "Error saving canvas",
      description: formatError(error),
    });
    return;
  }
}
