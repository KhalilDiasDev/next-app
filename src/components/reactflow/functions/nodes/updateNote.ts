export default function updateNote(
  setNodes: Flow.SetNodesType,
  handleSetUnsavedChanges: (value: boolean) => void,
  id: string,
  operation: "update" | "delete" | "deleteAll",
  noteIndex: number = 0,
  noteField: string = "text",
  value?: string
) {
  let response: any = undefined;
  setNodes((nds: Flow.NodeProps[]) => {
    let index = nds.findIndex((node) => node.id === id);
    const selectedNodeData = nds[index].data as Flow.NodeDataProps;
    let prev = [...nds];

    let newItems = selectedNodeData.notes;
    if (operation === "update") {
      newItems[noteIndex] = { ...newItems[noteIndex], [noteField]: value };
    }
    if (operation === "delete") {
      newItems.splice(noteIndex, 1);
    }
    if (operation === "deleteAll") {
      newItems = [];
    }

    prev[index] = {
      ...nds[index],
      data: {
        ...nds[index].data,
        notes: newItems,
      } as Flow.NodeDataProps,
    };
    response = prev[index].data;
    return prev;
  });
  handleSetUnsavedChanges(true);
  return response;
}
