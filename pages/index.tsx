import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import type { Job } from '../types';

interface AIResponse {
  response: string;
  songs: Array<{
    name: string;
    artist: string;
    url?: string;
  }>;
}

export default function Home() {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('sad');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isMoodHidden, setIsMoodHidden] = useState(false);

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
      
      if (!response.ok) {
        throw new Error('请求失败');
      }

      const data = await response.json();
      console.log('Response data:', data); // 添加调试日志
      
      setAiResponse(data);
      
      const newJob: Job = {
        id: Date.now().toString(),
        content,
        mood,
        aiResponse: data.response,
        songs: data.songs,
        createdAt: new Date(),
        isPrivate: false,
        isMoodHidden: isMoodHidden
      };

      setJobs(prevJobs => [...prevJobs, newJob]);
      setContent('');
    } catch (error) {
      console.error('Error:', error);
      alert('发送失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleJobVisibility = (jobId: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, isPrivate: !job.isPrivate } : job
      )
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>心情瓶子</title>
        <meta name="description" content="分享你的心情" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>心情瓶子</h1>
        
        <div className={styles.chatSection}>
          <div className={styles.inputArea}>
            <div className={styles.moodControl}>
              <select 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className={styles.select}
              >
                <option value="sad">难过</option>
                <option value="happy">开心</option>
                <option value="angry">生气</option>
                <option value="anxious">焦虑</option>
                <option value="excited">兴奋</option>
              </select>
              
              <label className={styles.hideControl}>
                <input
                  type="checkbox"
                  checked={isMoodHidden}
                  onChange={(e) => setIsMoodHidden(e.target.checked)}
                />
                <span>隐藏心情</span>
              </label>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="写下你的心情..."
                className={styles.textarea}
              />
              <button type="submit" className={styles.button} disabled={isLoading}>
                {isLoading ? '发送中...' : '发送'}
              </button>
            </form>
          </div>

          {aiResponse && aiResponse.songs && (
            <div className={styles.responseArea}>
              <div className={styles.aiMessage}>
                <p>{aiResponse.response}</p>
                <div className={styles.songList}>
                  <h4>
                    <span className={styles.songIcon}>🎵</span>
                    为你推荐的歌曲
                  </h4>
                  <ul>
                    {aiResponse.songs.map((song, index) => (
                      <li key={index}>
                        <span className={styles.songIcon}>♪</span>
                        <div>
                          {song.url ? (
                            <a 
                              href={song.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={styles.songLink}
                            >
                              <span className={styles.songName}>{song.name}</span>
                              <span className={styles.songArtist}> - {song.artist}</span>
                            </a>
                          ) : (
                            <>
                              <span className={styles.songName}>{song.name}</span>
                              <span className={styles.songArtist}> - {song.artist}</span>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.historySection}>
          <button 
            className={styles.toggleHistory}
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? '隐藏历史记录' : '查看历史记录'}
          </button>
          
          {showHistory && (
            <div className={styles.historyList}>
              {jobs.map((job) => (
                <div key={job.id} className={styles.historyItem}>
                  <div className={styles.historyHeader}>
                    <span className={`${styles.historyMood} ${job.isMoodHidden ? styles.historyMoodHidden : ''}`}>
                      {job.isMoodHidden ? '已隐藏' : job.mood}
                    </span>
                    <span className={styles.historyTime}>
                      {new Date(job.createdAt).toLocaleString()}
                    </span>
                    <button 
                      className={styles.toggleVisibility}
                      onClick={() => toggleJobVisibility(job.id)}
                    >
                      {job.isPrivate ? '🔒' : '🔓'}
                    </button>
                  </div>
                  {!job.isPrivate && (
                    <>
                      <div className={styles.historyContent}>{job.content}</div>
                      <div className={styles.historyResponse}>{job.aiResponse}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 