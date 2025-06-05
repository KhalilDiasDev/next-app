import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateSchema } from "./schema";

export const generateNotesWithAI = async (
  token: string,
  prompt: string,
  data: Workspace.CanvasModelProps
) => {
  const genAI = new GoogleGenerativeAI(token);
  const boardTitles = data.elements
    ?.filter((element) => element.type === "board")
    ?.map((element) => ({
      title: element.title,
      description: element.description,
    }));

  let updatePrompt = `Generate notes for API about ${prompt}
    with "name":"${data.name}" and add "extra": [] 
    For each section (${boardTitles}):
      - What are the key points? (Summarize each note in 50 characters)
      - Remember to generate the answers consistent with the questions proposals
      - Avoid putting titles in the answers
      - Do not add content in the extra array
        `;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: generateSchema(data),
    },
  });

  const content = await model.generateContent(updatePrompt);
  let result = JSON.parse(content.response.text());

  data.elements.forEach((item, index) => {
    if (item.type !== "board") {
      result.nodes.items?.splice(index, 0, {
        notes: [],
      });
    }
  });

  return result;
};
