import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk"
import { getSystemPrompt } from "../prompts";
import { TextBlock } from "@anthropic-ai/sdk/resources";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY
})

export const chatHandler = async (req: Request, res: Response) => {
  const { messages } = req.body;

  try {
    // Stream messages from the API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 7999,
      system: getSystemPrompt(),
      messages: messages
    })
    
    res.json((response.content[0] as TextBlock).text)

  } catch (error: any) {
    console.error('Error:', error);
  }
};