import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import type { Job } from '../types';

export default function Home() {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('happy');
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob: Job = {
      id: Date.now().toString(),
      content,
      mood,
      createdAt: new Date()
    };

    setJobs([...jobs, newJob]);
    setContent('');
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
            <option value="happy">开心</option>
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

        <div className={styles.bottles}>
          {jobs.map((job) => (
            <div key={job.id} className={styles.bottle}>
              <div className={styles.mood}>{job.mood}</div>
              <div className={styles.content}>{job.content}</div>
              <div className={styles.date}>
                {job.createdAt.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 