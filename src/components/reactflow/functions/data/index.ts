import downloadJSON from "./downloadJSON";
import loadNode from "./load";
import saveChanges from "./save";

export function dataFunctionsList() {
  return {
    downloadJSON: downloadJSON,
    loadNode: loadNode,
    save: saveChanges,
  };
}
