export default function addNote(
  setNodes: Flow.SetNodesType,
  handleSetUnsavedChanges: (value:boolean) => void,
  id: string,
  value: string = ""
) {
  let response: any = undefined;
  setNodes((nds) => {
    let index = nds.findIndex((node) => node.id === id);
    let prev = [...nds];

    prev[index] = {
      ...nds[index],
      data: {
        ...nds[index].data,
        notes: [...nds[index].data.notes, { text: value }],
      },
    };
    response = prev[index].data;

    return prev;
  });
  handleSetUnsavedChanges(true);
  return response;
}
