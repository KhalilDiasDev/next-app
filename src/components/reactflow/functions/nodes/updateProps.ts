export default function updateProp(
  setNodes: Flow.SetNodesType,
  handleSetUnsavedChanges: (value: boolean) => void,
  id: string,
  field: string,
  value: string
) {
  let response: any = undefined;
  setNodes((nds: Flow.NodeProps[]) => {
    let index = nds.findIndex((node) => node.id === id);
    let prev = [...nds];

    prev[index] = {
      ...nds[index],
      data: {
        ...nds[index].data,
        [field]: value,
      },
    };

    response = prev[index].data;
    return prev;
  });
  handleSetUnsavedChanges(true);
  return response;
}
