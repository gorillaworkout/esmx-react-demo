/**
 * @file 示例组件
 * @description 展示一个带有自动更新时间的页面标题，用于演示 Esmx 框架的基本功能
 */

import { useState, useEffect } from 'react';

export default function App() {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>
        <a href="https://esmx.dev" target="_blank" rel="noopener noreferrer">
          Esmx - React
        </a>
      </h1>
      <time dateTime={time}>{time}</time>
    </div>
  );
}