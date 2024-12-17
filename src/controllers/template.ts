import { Request, Response } from "express";
import {TextBlock} from "@anthropic-ai/sdk/resources"
import { REACT_BASE_PROMPT } from "../defaults/reactBasePrompt";
import { DEFAULT_PROMPT } from "../prompts";
import { NODE_BASE_PROMPT } from "../defaults/nodeBasePrompt";
import Anthropic from "@anthropic-ai/sdk"

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY
})
  

export const templateHandler = async (req: Request, res: Response) => {
  const {prompt} = req.body;

  const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      temperature: 0,
      system: "Based on the given prompt, determine whether it is a node application or react application. Return 'node' or 'react' keywords only. Do not return anything extra.",
      messages: [{role: "user", content: prompt}], 
  });

  const template = (response.content[0] as TextBlock).text

  if(template=="react"){
    res.json({
      prompts: [
        DEFAULT_PROMPT,
        `# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n\n${REACT_BASE_PROMPT}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
      ],
      uiPrompt: REACT_BASE_PROMPT,
      success: true,
      message: "react"
    })
    return;
  } else if (template=="node") {
    res.json({
      prompts: [
        `# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n\n${NODE_BASE_PROMPT}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
      ],
      uiPrompt: NODE_BASE_PROMPT,
      success: true,
      message: "node"
    })
    return;
  } else {
    res.json({success: false, message: "Some error has occured."})
  }
}