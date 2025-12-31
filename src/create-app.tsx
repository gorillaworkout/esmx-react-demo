/**
 * @file 应用实例创建
 * @description 负责创建和配置应用实例
 */

import { createElement, type ComponentType } from 'react';
import App from './app';
import type { AppProps } from './app';

export function createApp(initialPathname?: string) {
  const props: AppProps = { initialPathname };
  // Type assertion needed for React 19 compatibility
  const AppComponent = App as ComponentType<AppProps>;
  const app = createElement(AppComponent, props);
  return {
    app
  };
}