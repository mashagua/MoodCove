import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const jobs = await db.collection('jobs').find({}).toArray();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  }
} 