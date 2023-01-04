// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Message, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | Message[] | string>
) {
  const { content, isGptResponse } = req.body;
  const { userId } = req.query;

  if (req.method === 'GET') {
    console.log(userId);
    const messages = await prisma.message.findMany({
      where: {
        uid: userId as string,
      },
    });

    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const message = await prisma.message.create({
      data: {
        uid: userId as string,
        content,
        datetime: new Date(),
        is_gpt_response: isGptResponse,
      },
    });

    res.status(200).json(message);
  } else {
    res.status(501).send('HTTP request not supported');
  }
}
