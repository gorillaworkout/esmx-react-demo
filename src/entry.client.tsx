/**
 * @file 客户端入口文件
 * @description 负责客户端交互逻辑和动态更新
 */

import { hydrateRoot } from 'react-dom/client';
import { createApp } from './create-app';

// 创建应用实例
const { app } = createApp();

// 挂载应用实例 (使用 hydrateRoot untuk SSR)
const container = document.getElementById('app')!;
hydrateRoot(container, app);