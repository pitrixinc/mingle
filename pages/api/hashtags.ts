import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { tag } = req.query;
    const data = await client.fetch(`*[hashtags match '${tag}']`);
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    const data = await client.create({
      _type: 'hashtag',
      name,
    });
    res.status(200).json(data);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const data = await client.delete(id as string);
    res.status(200).json(data);
  }
}
