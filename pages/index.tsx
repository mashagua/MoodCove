import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Bottle } from '../types';

export default function Home() {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('happy');
  const [bottles, setBottles] = useState<Bottle[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBottle: Bottle = {
      id: Date.now().toString(),
      content,
      mood,
      createdAt: new Date()
    };

    setBottles([...bottles, newBottle]);
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
          {bottles.map((bottle) => (
            <div key={bottle.id} className={styles.bottle}>
              <div className={styles.mood}>{bottle.mood}</div>
              <div className={styles.content}>{bottle.content}</div>
              <div className={styles.date}>
                {bottle.createdAt.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 