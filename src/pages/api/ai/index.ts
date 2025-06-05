import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { generateNotesWithAI } from "@/services/ai";
import formatError from "@/utils/format/formatError";

async function createNotesWithAI(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.NEXT_PRIVATE_AI_TOKEN as string;
    const results = await generateNotesWithAI(
      token,
      req.body.prompt,
      req.body.data
    );

    return res.status(200).json({
      message: "Response generated successfully!",
      results,
    });
  } catch (error) {
    return res.status(400).json({
      message: formatError(error),
    });
  }
}

const methods = {
  POST: createNotesWithAI,
};

export default apiHandler(methods);
