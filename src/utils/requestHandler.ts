import { AxiosResponse } from "axios";
import { NextApiResponse } from "next";
import formatError from "./format/formatError";

export default async function requestHandler(
  res: NextApiResponse,
  request: () => Promise<AxiosResponse<any, any>>,
  message: {
    success?: string;
    error?: string;
  }
) {
  try {
    const response = await request();

    res.status(200).json({
      message: message?.success || "",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: formatError(error),
    });
  }
}
