import { SchemaType } from "@google/generative-ai";

export const generateSchema = (data: Workspace.CanvasModelProps) => {
  const maxItems = Math.min(
    ...data.elements
      .filter((item) => item.type === "board")
      .map((item) => item.cols * (item.rows - 1))
  );
  const nBoards = data.elements.filter((item) => item.type === "board")?.length;

  return {
    description: "Generate Model Canvas API",
    type: SchemaType.OBJECT,
    properties: {
      name: {
        type: SchemaType.STRING,
      },
      nodes: {
        type: SchemaType.OBJECT,
        properties: {
          extra: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                key: { type: SchemaType.STRING },
                value: { type: SchemaType.STRING },
              },
            },
          },
          items: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                notes: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      text: {
                        type: SchemaType.STRING,
                        maxLength: 60,
                      },
                    },
                    required: ["text"],
                  },
                  minItems: 3,
                  maxItems: maxItems,
                },
              },
              required: ["notes"],
            },
            minItems: nBoards,
            maxItems: nBoards,
          },
        },
      },
    },
    required: ["name", "nodes"],
  };
};
