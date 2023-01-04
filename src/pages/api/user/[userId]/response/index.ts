// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Message, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  prompt: string;
  responseMessage: Message;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const { userId } = req.query;

    const response = "Hi I'm ChatGPT";

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
