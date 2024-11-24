import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求' });
  }

  try {
    const { content, mood } = req.body;

    const systemPrompt = {
      role: "system",
      content: `你是一位富有同理心的AI心理咨询师。请以JSON格式回复，包含以下字段：
      1. response: 回复内容（以"亲爱的朋友"开头，包含对心情的理解和建议）
      2. songs: 数组，包含3首推荐歌曲，每首歌包含name和artist字段`
    };

    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SILICON_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages: [systemPrompt, {
          role: "user",
          content: `用户现在感到${mood}。\n用户说：${content}`
        }],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    console.log('API Response:', data);

    const aiMessage = JSON.parse(data.choices[0].message.content);
    
    return res.status(200).json(aiMessage);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: '服务暂时不可用，请稍后再试' });
  }
} 