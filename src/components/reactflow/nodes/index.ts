import BoardNode from "./board";
import TextNode from "./text";
import ImageNode from "./image";
import ExtraNoteNode from "./extraNote";
import stickerNode from "./sticker";

const nodeTypes = {
  board: BoardNode,
  text: TextNode,
  image: ImageNode,
  "extra-sticker": stickerNode,
  "extra-note": ExtraNoteNode,
};

export default nodeTypes;
