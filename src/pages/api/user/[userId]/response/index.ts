// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Message, PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

type Data = {
  prompt: string;
  responseMessage: Message;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const { userId } = req.query;

    const data = {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1000,
      top_p: 0.1,
    };

    const headers = {
      Authorization: `Bearer ${process.env.GPT3_API_KEY}`,
    };

    const gpt3Response = await axios.post('https://api.openai.com/v1/completions', data, {
      headers,
    });

    const gpt3Choices = gpt3Response.data.choices as Array<any>;
    const response = gpt3Choices[0].text;

    const responseMessage = await prisma.message.create({
      data: {
        is_gpt_response: true,
        content: response,
        datetime: new Date(),
        uid: userId as string,
      },
    });

    res.status(200).json({ prompt, responseMessage });
  }
}
