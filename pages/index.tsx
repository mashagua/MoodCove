import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import type { Job } from '../types';

interface AIResponse {
  response: string;
  songs: Array<{
    name: string;
    artist: string;
  }>;
}

export default function Home() {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('sad');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, mood }),
      });
      
      const data = await response.json();
      setAiResponse(data.response);
      
      const newJob: Job = {
        id: Date.now().toString(),
        content,
        mood,
        aiResponse: data.response,
        createdAt: new Date()
      };

      setJobs([...jobs, newJob]);
      setContent('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>心情瓶子</title>
        <meta name="description" content="分享你的心情" />
      </Head>

      <main>
        <h1 className={styles.title}>心情瓶子</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <select 
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className={styles.select}
          >
            <option value="sad">难过</option>
            <option value="angry">生气</option>
            <option value="excited">兴奋</option>
          </select>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的心情..."
            className={styles.textarea}
          />

          <button type="submit" className={styles.button}>
            扔出瓶子
          </button>
        </form>

        {isLoading && <div className={styles.loading}>AI 正在思考中...</div>}
        {aiResponse && (
          <div className={styles.aiResponse}>
            <h3>AI 心理咨询师的回应：</h3>
            <p>{aiResponse}</p>
          </div>
        )}

        <div className={styles.bottles}>
          {jobs.map((job) => (
            <div key={job.id} className={styles.bottle}>
              <div className={styles.mood}>{job.mood}</div>
              <div className={styles.content}>{job.content}</div>
              <div className={styles.date}>
                {job.createdAt.toLocaleDateString()}
              </div>
              <div className={styles.aiResponse}>{job.aiResponse}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 