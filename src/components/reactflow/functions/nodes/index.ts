import addNote from "./addNote";
import deleteNode from "./deleteNode";
import updateNote from "./updateNote";
import updateProp from "./updateProps";

export function flowFunctionsList(
  this: any,
  setNodes: Flow.SetNodesType,
  handleSetUnsavedChanges: (value: boolean) => void
) {
  const nodeFunctions = (id: string) => {
    return {
      deleteNode: deleteNode.bind(this, setNodes, handleSetUnsavedChanges, id),
      addNote: addNote.bind(this, setNodes, handleSetUnsavedChanges, id),
      updateProp: updateProp.bind(this, setNodes, handleSetUnsavedChanges, id),
      updateNote: updateNote.bind(this, setNodes, handleSetUnsavedChanges, id),
    };
  };

  return nodeFunctions;
}
