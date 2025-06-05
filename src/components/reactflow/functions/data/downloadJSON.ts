import { downloadFile } from "@/utils/downloadFile";
import formatCanvas from "./format";

export default function downloadJSON(
  canvas: Workspace.CanvasModelProps,
  nodes: Flow.NodeProps[]
) {
  const body = {
    name: canvas.name,
    nodes: formatCanvas(nodes),
  };
  downloadFile(JSON.stringify(body, null, 2), `${canvas.name}.json`);
}

export function downloadWorkspaceJSON(data: any, filename: string) {
  const file = filename.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
  const body = {
    name: file,
    type: "Workspace",
    canvas: data,
  };
  downloadFile(JSON.stringify(body, null, 2), `${file}.json`);
}
