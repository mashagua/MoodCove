import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求' });
  }

  try {
    const { content, mood } = req.body;

    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SILICON_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages: [{
          role: "system",
          content: "你是一位富有同理心的AI心理咨询师，请针对用户的心情给出温暖的回应和建议，并推荐适合当前心情的音乐。"
        }, {
          role: "user",
          content: `用户现在感到${mood}。\n用户说：${content}\n请给出回应和3首适合当前心情的歌曲推荐。`
        }],
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.5,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API 返回格式错误');
    }

    return res.status(200).json({ 
      response: data.choices[0].message.content 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: '服务暂时不可用，请稍后再试'
    });
  }
} 