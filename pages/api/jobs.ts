import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // 返回模拟数据
      const mockJobs = [
        { id: 1, title: '职位1', description: '描述1' },
        { id: 2, title: '职位2', description: '描述2' },
      ];
      res.status(200).json(mockJobs);
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  } else {
    res.status(405).json({ message: '方法不允许' });
  }
} 