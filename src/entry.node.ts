/**
 * @file Node.js 服务器入口文件
 * @description 负责开发环境配置和服务器启动，提供 SSR 运行时环境
 */

import http from 'node:http';
import type { EsmxOptions } from '@esmx/core';

export default {
  /**
   * 配置开发环境的应用创建器
   * @description 创建并配置 Rspack 应用实例，用于开发环境的构建和热更新
   */
  async devApp(esmx) {
    return import('@esmx/rspack').then(async (m) => {
      // Dynamic import untuk React Refresh Plugin (hanya di client + dev)
      let ReactRefreshPlugin: any = null;
      
      return m.createRspackHtmlApp(esmx, {
        async chain({ chain, buildTarget, esmx }) {
          // Tambahkan .tsx ke extensions
          chain.resolve.extensions.add('.tsx');

          // Konfigurasi untuk React JSX/TSX
          chain.module
            .rule('tsx')
            .test(/\.tsx?$/)
            .use('swc-loader')
            .loader('builtin:swc-loader')
            .options({
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true
                },
                transform: {
                  react: {
                    runtime: 'automatic', // React 17+ automatic JSX
                    development: buildTarget === 'client' && !esmx.isProd,
                    refresh: buildTarget === 'client' && !esmx.isProd
                  }
                }
              }
            })
            .end()
            .type('javascript/auto');

          // Plugin React Refresh untuk HMR (Hot Module Replacement)
          if (buildTarget === 'client' && !esmx.isProd) {
            if (!ReactRefreshPlugin) {
              const pluginModule = await import('@rspack/plugin-react-refresh');
              ReactRefreshPlugin = pluginModule.default || pluginModule;
            }
            chain.plugin('react-refresh').use(ReactRefreshPlugin);
          }
        }
      });
    });
  },

  /**
   * 配置并启动 HTTP 服务器
   * @description 创建 HTTP 服务器实例，集成 Esmx 中间件，处理 SSR 请求
   */
  async server(esmx) {
    const server = http.createServer((req, res) => {
      // 使用 Esmx 中间件处理请求
      esmx.middleware(req, res, async () => {
        // 执行服务端渲染
        const rc = await esmx.render({
          params: { url: req.url }
        });
        res.end(rc.html);
      });
    });

    server.listen(3000, () => {
      console.log('服务启动: http://localhost:3000');
    });
  }
} satisfies EsmxOptions;