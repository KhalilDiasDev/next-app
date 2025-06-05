export default function formatCanvas(nodes: Flow.NodeProps[]) {
  if (!nodes || !Array.isArray(nodes)) {
    return [];
  }

  const extra = nodes
    ?.filter((node) => node.type?.includes("extra"))
    .map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    }));

  const items = nodes
    ?.filter((node) => !node.type?.includes("extra"))
    .map((node) => ({
      comment: (node.data as Flow.NodeDataProps).comment,
      notes: (node.data as Flow.NodeDataProps).notes,
    }));

  return { extra, items };
}
