export default function deleteNode(
  setNodes: Flow.SetNodesType,
  handleSetUnsavedChanges: (value: boolean) => void,
  id: string
) {
  let response: any = undefined;
  setNodes((nds) => {
    return nds.filter((item) => item.id !== id);
  });
  handleSetUnsavedChanges(true);
  return response;
}
